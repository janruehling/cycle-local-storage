import { Observable } from 'rx'
import R from 'ramda'
import isolate from '@cycle/isolate'
import { nestedComponent } from 'zwUtility'

import { ComingSoon } from 'Components$'
import Login from './Login'
import Dash from './Dash'
import GroupList from './Group/List'
import GroupDetails from './Group/Details'
import LocationList from './Location/List'
import LocationDetails from './Location/Details'
import PractitionerList from './Practitioner/List'
import PractitionerDetails from './Practitioner/Details'
import StyleGuide from './StyleGuide'

const routes = {
  '/': isolate(Login),
  '/admin': isolate(ComingSoon('Admin')),
  '/dash': isolate(Dash),
  '/styleGuide': StyleGuide,
  '/groups': isolate(GroupList),
  '/group/:id': id => sources =>
      isolate(GroupDetails)({
        groupId$: Observable.just(id),
        ...sources
      }),
  '/locations': isolate(LocationList),
  '/location/:id': id => sources =>
      isolate(LocationDetails)({
        locationId$: Observable.just(id),
        ...sources
      }),
  '/plans': isolate(ComingSoon('Plans')),
  '/practitioners': isolate(PractitionerList),
  '/practitioner/:id': id => sources =>
      isolate(PractitionerDetails)({
        practitionerId$: Observable.just(id),
        ...sources
      })
}

const AuthRedirectManager = sources => {
  const redirectLogin$ = sources.userProfile$
    .filter(profile => !!profile)
    .map(profile => profile.isAdmin ? '/admin' : '/dash')

  const redirectLogout$ = sources.auth$
    .filter(auth => !auth || !auth.access_token)
    .map(() => '/')

  return {
    redirectLogin$,
    redirectLogout$
  }
}

const UserManager = sources => {
  const { storage } = sources

  const auth$ = storage.get('auth')
    .distinctUntilChanged()
    .map(JSON.parse)

  const userProfile$ = storage.get('profile')
    .distinctUntilChanged()
    .map(JSON.parse)

  return {
    auth$,
    userProfile$
  }
}

const AuthedResponseManager = sources => ({
  responses$: sources.HTTP
    .mergeAll()
    .catch(err => Observable.just(err))
    .filter(res => res.status !== 401)
})

const UnauthedResponseManager = ({auth$, config$, HTTP}) => {
  return HTTP
    .mergeAll()
    .catch(err => Observable.just(err))
    .filter(errData => errData.status === 401)
    .flatMap(errData => {
      return auth$
        .zip(config$)
        .flatMap(([auth, config]) => {
          if (!auth || !auth.refresh_token) {
            return Observable.throw()
          }

          return Observable.just({
            url: config.api + 'refresh',
            method: 'POST',
            send: {
              refresh_token: auth.refresh_token
            }
          })
        })
    })
}

const refreshToken = ({HTTP, config$}) => {
  const response$ = config$
    .flatMap(config => HTTP
      .filter(req$ => req$.request.url === config.api + 'refresh')
      .mergeAll()
      .map(res => res.body)
      .catch(err => Observable.just(err))
    )

  const storage = response$
    .flatMap(data => {
      const auth = R.pathOr({}, ['auth'])(data)
      return Observable.just({
        auth: JSON.stringify(auth)
      })
    })

  return {
    response$,
    storage
  }
}
//
// const AuthedActionManager = sources => ({
//   HTTP: sources.queue$
//     .withLatestFrom(sources.auth$, sources.config$)
//     .map(([action, auth, config]) => Observable.just({
//       url: config.api + action.url,
//       method: action.method || 'GET',
//       headers: {
//         Authorization: 'Bearer ' + auth.token
//       }
//     }))
// })

export default sources => {
  const user = UserManager(sources)

  const redirects = AuthRedirectManager({...user, ...sources})

  const { responses$ } = AuthedResponseManager(sources)

  const unauthedRequests$ = UnauthedResponseManager({...user, ...sources})

  const queue$ = Observable.empty()

  const page$ = nestedComponent(sources.router.define(routes), {
    ...sources,
    ...user,
    ...redirects,
    queue$,
    responses$
  })

  const DOM = page$.pluckFlat('DOM')

  const HTTP = page$
    .pluckFlat('queue$')
    .merge(unauthedRequests$)
    .distinctUntilChanged()
    .flatMap(req => {
      if (req.skipToken) {
        return Observable.just(R.pick(['url', 'send', 'method'])(req))
      } else if (!req || !req.url) {
        return Observable.empty()
      } else {
        return user.auth$
          .map(auth => R.merge(R.pick(['url', 'send', 'method'])(req), {
            headers: {
              Authorization: auth ? 'Bearer ' + auth.access_token : null
            }
          }))
      }
    })

  const handleRefresh$ = refreshToken(sources)

  const storage = page$.pluckFlat('storage')
    .merge(handleRefresh$.storage)

  const router = Observable.merge(
    page$.pluckFlat('route$')
    // redirects.redirectLogout$
  )

  return {
    ...sources,
    DOM,
    HTTP,
    storage,
    router
  }
}

export { AuthRedirectManager, UserManager }
