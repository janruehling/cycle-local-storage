import { Observable } from 'rx'

export default (actions, sources) => {
  const isUserMenuOpen$ = Observable.merge(
      actions.userMenuMouseOver$.map(ev => true),
      actions.userMenuMouseOut$.map(ev => false)
  )
  .startWith(false)
  .scan((x, y) => y)

  return {
    isUserMenuOpen$
  }
}
