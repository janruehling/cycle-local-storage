import Rx from 'rx'
Rx.config.longStackSupport = true

import { Observable, ReplaySubject } from 'rx'
import R from 'ramda'
import isolate from '@cycle/isolate'
import { nestedComponent } from 'zwUtility'

import { ComingSoon } from 'Components$'
import Account from './Me/Account'
import Feedback from './Me/Feedback'
import Login from './Login'
import Register from './Register'
import UserWelcome from './UserWelcome'
import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword'
import Dash from './Dash'
import GroupList from './Group/List'
import GroupDetails from './Group/Details'
import GroupAdd from './Group/Add'
import GroupEdit from './Group/Edit'
import LocationList from './Location/List'
import LocationDetails from './Location/Details'
import LocationAdd from './Location/Add'
import LocationEdit from './Location/Edit'
import PlanList from './Plan/List'
import PlanDetails from './Plan/Details'
import PlanAdd from './Plan/Add'
import PlanEdit from './Plan/Edit'
import PractitionerList from './Practitioner/List'
import PractitionerDetails from './Practitioner/Details'
import PractitionerAdd from './Practitioner/Add'
import PractitionerEdit from './Practitioner/Edit'
import StyleGuide from './StyleGuide'

const routes = {
  '/': isolate(Login),
  '/account': isolate(Account),
  '/feedback': isolate(Feedback),
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
  '/groups/add': isolate(GroupAdd),
  '/group/edit/:id': id => sources =>
      isolate(GroupEdit)({
        ...sources,
        groupId$: Observable.just(id)
      }),
  '/locations': isolate(LocationList),
  '/location/:id': id => sources =>
      isolate(LocationDetails)({
        locationId$: Observable.just(id),
        ...sources
      }),
  '/locations/add': isolate(LocationAdd),
  '/location/edit/:id': id => sources =>
      isolate(LocationEdit)({
        ...sources,
        locationId$: Observable.just(id)
      }),
  '/plans': isolate(PlanList),
  '/plan/:id': id => sources =>
      isolate(PlanDetails)({
        planId$: Observable.just(id),
        ...sources
      }),
  '/plans/add': isolate(PlanAdd),
  '/plan/edit/:id': id => sources =>
      isolate(PlanEdit)({
        ...sources,
        planId$: Observable.just(id)
      }),
  '/practitioners': isolate(PractitionerList),
  '/practitioners/add': isolate(PractitionerAdd),
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
    .filter(auth => !auth)
    .map(() => '/#/login')

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

const AuthedResponseManager = sources => {
  const responses$ = new ReplaySubject(20, 1000)

  sources.HTTP
    .flatMap(response$ => {
      return response$
        .catch(err => {
          const res = err.response
          if (!res.request) {
            const data = res.req.url.split('?')[1]
            const pairs = data.split('&')

            res.request = {
              url: res.req.url
            }

            pairs.map(pair => {
              const d = pair.split('=')
              res.request[d[0]] = d[1]
            })
          }
          return Observable.just(res)
        })
    })
    .subscribe(responses$)

  return {
    responses$
  }
}
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

  const notifications$ = responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getMeNotifications$')
    .map(res => res.body)
    .map(res => res.notifications)
    .startWith([])

  // const unauthedRequests$ = UnauthedResponseManager({...user, ...sources})

  const page$ = nestedComponent(sources.router.define(routes), {
    ...sources,
    ...user,
    ...redirects,
    responses$,
    notifications$
  })

  const DOM = page$.pluckFlat('DOM')

  const HTTP = page$
    .pluckFlat('HTTP')
    // .merge(unauthedRequests$)
    .withLatestFrom(user.auth$)
    .filter(([req, auth]) => {
      return (req && req.skipToken) || auth
    })
    .flatMap(([req, auth]) => {
      if (req.skipToken) {
        return Observable.just(R.pick(['url', 'send', 'method', 'accept', 'type', 'field', 'eager', 'query', 'category', 'headers', 'attach'])(req))
      } else if (!auth || !req || !req.url) {
        return Observable.empty()
      } else {
        return user.auth$
          .map(auth => R.merge(R.pick(['url', 'send', 'method', 'accept', 'type', 'field', 'eager', 'query', 'category', 'headers', 'attach'])(req), {
            headers: R.merge(req.headers, {
              Authorization: auth ? 'Bearer ' + auth.access_token : null
            })
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
