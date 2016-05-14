import { Observable } from 'rx'

export default (actions, sources) => {
  const isUserMenuOpen$ = Observable.merge(
      actions.userMenuMouseOver$.throttle(10).map(ev => true),
      actions.userMenuMouseOut$.throttle(10).map(ev => false)
  )
  .startWith(false)

  const isNotificationMenuOpen$ = Observable.merge(
      actions.notificationMenuMouseOver$.throttle(10).map(ev => true),
      actions.notificationMenuMouseOut$.throttle(10).map(ev => false)
  )
  .startWith(false)

  const signOutRequest$ = actions.signOutClick$
    .flatMap(ev => Observable.just({
      auth: null,
      profile: null
    }))

  const accountSettingsRequest$ = actions.accountSettingsClick$
    .flatMap(ev => Observable.just('/account'))

  const feedbackRequest$ = actions.feedbackClick$
    .flatMap(ev => Observable.just('/feedback'))

  return {
    isUserMenuOpen$,
    isNotificationMenuOpen$,
    signOutRequest$,
    accountSettingsRequest$,
    feedbackRequest$
  }
}
