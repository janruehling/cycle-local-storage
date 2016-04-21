import { Observable } from 'rx'
import { DesktopFrame } from 'StyleFn'
import combineLatestObj from 'rx-combine-latest-obj'

export const AppShell = sources => {
  const layoutParams = {
    noScroll: sources.noScroll || Observable.just(null),
    header: sources.headerDOM || Observable.just(null),
    accountInfo: sources.accountInfoDOM || Observable.just(null),
    toolBar: sources.toolBarDOM || Observable.just(null),
    search: sources.searchDOM || Observable.just(null),
    page: sources.pageDOM || Observable.just(null)
  }

  const DOM = combineLatestObj(layoutParams).map(DesktopFrame)

  return {
    DOM
  }
}
