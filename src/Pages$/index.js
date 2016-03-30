import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import 'normalize-css'
import {nestedComponent} from 'util'

import { ComingSoon } from 'Components$'
import Login from './Login'
import PractitionerDetails from './PractitionerDetails'
import StyleGuide from './StyleGuide'

const { just, empty, merge } = Observable

const routes = {
  '/': Login,
  '/admin': ComingSoon('Admin'),
  '/dash': ComingSoon('Dash'),
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
//
const AuthedResponseManager = sources => ({
  responses$: sources.HTTP.mergeAll()
})
// const AuthedResponseManager = sources => ({
//   responses$: sources.auth$
//     .flatMapLatest(auth => auth ? sources.HTTP : empty())
//     .share()
// })
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

  const {responses$} = AuthedResponseManager(sources)

  const page$ = nestedComponent(sources.router.define(routes), {
    ...sources,
    ...user,
    ...redirects,
    responses$
  })

  const DOM = page$.pluckFlat('DOM')

  const HTTP = page$.pluckFlat('HTTP')

  const storage = page$.pluckFlat('storage')

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
