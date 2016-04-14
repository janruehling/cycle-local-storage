import { Observable } from 'rx'
import { DesktopFrame } from 'StyleFn'

export const AppShell = sources => {
  const layoutParams = {
    header: sources.headerDOM,
    accountInfo: sources.accountInfoDOM,
    search: sources.searchDOM,
    page: sources.pageDOM
  }

  const DOM = Observable.just({}).map(just => DesktopFrame(layoutParams))

  return {
    DOM
  }
}
