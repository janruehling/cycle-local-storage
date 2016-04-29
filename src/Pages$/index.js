import Rx from 'rx'
Rx.config.longStackSupport = true

import { Observable } from 'rx'
import R from 'ramda'
import isolate from '@cycle/isolate'
import { nestedComponent } from 'zwUtility'

import { ComingSoon } from 'Components$'
import Login from './Login'
import Register from './Register'
import UserWelcome from './UserWelcome'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Dash from './Dash'
import GroupList from './Group/List'
import GroupDetails from './Group/Details'
import LocationList from './Location/List'
import LocationDetails from './Location/Details'
import PlanList from './Plan/List'
import PlanDetails from './Plan/Details'
import PractitionerList from './Practitioner/List'
import PractitionerDetails from './Practitioner/Details'
import PractitionerEdit from './Practitioner/Edit'
import StyleGuide from './StyleGuide'

const routes = {
  '/': isolate(Login),
  '/register': isolate(Register),
  '/forgotPassword': isolate(ForgotPassword),
  '/resetPassword/:code': code => sources =>
      isolate(ResetPassword)({
        resetCode$: Observable.just(code),
        ...sources
      }),
  '/confirmed': isolate(UserWelcome),
  '/admin': isolate(ComingSoon('Admin')),
  '/dash': isolate(Dash),
  '/styleGuide': isolate(StyleGuide),
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
  '/plans': isolate(PlanList),
  '/plan/:id': id => sources =>
      isolate(PlanDetails)({
        planId$: Observable.just(id),
        ...sources
      }),
  '/practitioners': isolate(PractitionerList),
  '/practitioner/:id': id => sources =>
      isolate(PractitionerDetails)({
        practitionerId$: Observable.just(id),
        ...sources
      }),
  '/practitioner/edit/:id': id => sources =>
      isolate(PractitionerEdit)({
        ...sources,
        practitionerId$: Observable.just(id)
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
    .map(JSON.parse)

  const userProfile$ = storage.get('profile')
    .map(JSON.parse)

  return {
    auth$,
    userProfile$
  }
}

const AuthedResponseManager = sources => ({
  responses$: sources.HTTP
    .flatMap(response$ => {
      return response$
        .catch(err => Observable.just(err.response))
    })
})

// const UnauthedResponseManager = ({auth$, config$, HTTP}) => {
//   return HTTP
//     .catch(err => Observable.just(err))
//     .withLatestFrom(config$)
//     .flatMap(([auth, config]) => {
//       return Observable.just({
//         url: config.api + '/refresh',
//         method: 'POST',
//         send: {
//           refresh_token: auth.refresh_token
//         }
//       })
//     })
//     .switch()
// }

const refreshToken = ({HTTP, config$}) => {
  const response$ = config$
    .flatMap(config => HTTP
      .filter(req$ => req$.request.url === config.api + '/refresh')
      .mergeAll()
      .map(res => res.body)
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

export default sources => {
  const user = UserManager(sources)

  const redirects = AuthRedirectManager({...user, ...sources})

  const { responses$ } = AuthedResponseManager(sources)

  // const unauthedRequests$ = UnauthedResponseManager({...user, ...sources})

  const page$ = nestedComponent(sources.router.define(routes), {
    ...sources,
    ...user,
    ...redirects,
    responses$
  })

  const DOM = page$.pluckFlat('DOM')

  const HTTP = page$
    .pluckFlat('HTTP')
    // .merge(unauthedRequests$)
    .distinctUntilChanged()
    .withLatestFrom(user.auth$)
    .filter(([req, auth]) => {
      return (req && req.skipToken) || auth
    })
    .flatMapLatest(([req, auth]) => {
      if (req.skipToken) {
        return Observable.just(R.pick(['url', 'send', 'method'])(req))
      } else if (!auth || !req || !req.url) {
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
    DOM,
    HTTP,
    storage,
    router
  }
}

export { AuthRedirectManager, UserManager }
