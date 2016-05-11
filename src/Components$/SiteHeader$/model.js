import { Observable } from 'rx'

export default (actions, sources) => {
  const isUserMenuOpen$ = Observable.merge(
      actions.userMenuMouseOver$.map(ev => true),
      actions.userMenuMouseOut$.map(ev => false)
  )
  .startWith(false)
  .scan((x, y) => y)

  const signOutRequest$ = actions.signOutClick$
    .flatMap(ev => Observable.just({
      auth: null,
      profile: null
    }))

  const accountSettingsRequest$ = actions.accountSettingsClick$
    .flatMap(ev => Observable.just('/account'))

  return {
    isUserMenuOpen$,
    signOutRequest$,
    accountSettingsRequest$
  }
}
