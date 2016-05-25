import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import intent from './intent'
import model from './model'

import { getMeNotifications$ } from 'Remote'
import { SiteHeader } from 'StyleFn'

const { just } = Observable

const _render = ({
  profile,
  isLoggedIn,
  isUserMenuOpen,
  isNotificationMenuOpen,
  notifications,
  message
}) => div([
  SiteHeader({
    profile,
    isLoggedIn,
    isUserMenuOpen,
    isNotificationMenuOpen,
    notifications,
    message,
    style: {
      position: 'absolute',
      top: 0,
      width: '100%'
    }
  })
])

export const SiteHeader$ = sources => {
  const actions = intent(sources)
  const state = model(actions, sources)

  const notifications$ = just([])

  // const notifications$ = sources.responses$
  //   .filter(res$ => res$ && res$.request)
  //   .filter(res$ => res$.request.category === 'getMeNotifications$')
  //   .map(res => res.body)
  //   .map(res => res.notifications)
  //   .startWith([])

  const route$ = Observable.merge(
    state.accountSettingsRequest$,
    state.feedbackRequest$
  )

  const viewState = {
    profile: sources.userProfile$ || just({}),
    isLoggedIn: sources.isLoggedIn$ || just(true),
    isUserMenuOpen: state.isUserMenuOpen$ || just(false),
    isNotificationMenuOpen: state.isNotificationMenuOpen$ || just(false),
    notifications$: notifications$ || just([]),
    message: sources.message$ || just(null)
  }

  const DOM = combineLatestObj(viewState).map(_render)

  // const HTTP = Observable
  //   .timer(0, 30000)
  //   .flatMap(count => getMeNotifications$(sources))

  return {
    DOM,
    // HTTP,
    route$,
    storage: state.signOutRequest$
  }
}
