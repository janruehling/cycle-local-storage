import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import 'normalize-css'
import {nestedComponent} from 'util'
import R from 'ramda'
import combineLatestObj from 'rx-combine-latest-obj'

import { ComingSoon } from 'Components$'
import Login from './Login'
import Dash from './Dash'
import PractitionerDetails from './PractitionerDetails'
import StyleGuide from './StyleGuide'

const { just, empty, merge } = Observable

const routes = {
  '/': Login,
  '/admin': ComingSoon('Admin'),
  '/dash': Dash,
  '/styleGuide': StyleGuide,
  '/practitioners/:id': id => sources =>
    PractitionerDetails({practitionerId$: just(id), ...sources})
}

const AuthRedirectManager = sources => {
  const redirectLogin$ = sources.userProfile$
    .filter(profile => !!profile)
    .map(profile => profile.isAdmin ? '/admin' : '/dash')

  const redirectLogout$ = sources.auth$
    .filter(auth => !auth)
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
    .catch(err => just(err))
    .filter(res => res.status !== 401)
})

const UnauthedResponseManager = ({auth$, config$, HTTP}) => {
  return HTTP
    .mergeAll()
    .catch(err => just(err))
    .filter(err => err.status === 401)
    .flatMap(err => {
      return auth$
        .zip(config$)
        .flatMap(([auth, config]) => {
          return just({
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
      .catch(err => just(err))
    )

  const storage = response$
    .flatMap(data => {
      const auth = R.pathOr(null, ['auth'])(data)
      return just({
        auth: auth ? JSON.stringify(auth) : null
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
//     .map(([action, auth, config]) => just({
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

  const queue$ = empty()

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
    .flatMap(req => {
      if (req.skipToken) {
        return just(R.pick(['url', 'send', 'method'])(req))
      } else if (!req || !req.url) {
        return empty()
      } else {
        return user.auth$
          .map(auth => R.merge(R.pick(['url', 'send', 'method'])(req), {
          headers: {
            Authorization: 'Bearer ' + auth.access_token
          }
        }))
      }
    })

  const handleRefresh$ = refreshToken(sources)

  const storage = page$.pluckFlat('storage').merge(handleRefresh$.storage)

  // const auth$ = page$.pluckFlat('auth$')
  //
  // const { HTTP } = AuthedActionManager({
  //   ...sources,
  //   queue$: page$.pluckFlat('queue$') // must be 2d arg to override sources
  // })

  const router = merge(
    page$.pluckFlat('route$'),
    redirects.redirectLogout$
  )

  return {
    DOM,
    HTTP,
    storage,
    router
  }
}

export { AuthRedirectManager, UserManager }
