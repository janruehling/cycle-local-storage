import { Observable } from 'rx'

export default (actions, sources) => {
  const isUserMenuOpen$ = Observable.merge(
      actions.userMenuMouseOver$.map(ev => true),
      actions.userMenuMouseOut$.map(ev => false)
  )
  .throttle(500)
  .distinctUntilChanged()
  .do(console.log.bind(console))
  .startWith(false)

  return {
    isUserMenuOpen$
  }
}
