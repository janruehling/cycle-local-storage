import { Observable } from 'rx'
import { DesktopFrame } from 'StyleFn'
import { mergeOrFlatMapLatest } from 'zwUtility'

export const AppShell = sources => {

  const children = []

  const auth$ = mergeOrFlatMapLatest('auth$', ...children)
  const route$ = mergeOrFlatMapLatest('route$', ...children)

  const layoutParams = {
    header: sources.headerDOM,
    page: sources.pageDOM
  }

  const DOM = Observable.just({}).map(just => DesktopFrame(layoutParams))

  return {
    DOM,
    auth$,
    route$,
  }
}
