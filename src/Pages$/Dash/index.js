import { Observable } from 'rx'
import { AppShell, SiteHeader } from 'Components$'
import { nestedComponent, mergeOrFlatMapLatest } from 'zwUtility'

import Landing from './Landing'

const _routes = {
  '/': Landing
}

export default sources => {
  const page$ = nestedComponent(
    sources.router.define(_routes),
    {...sources}
  )

  const header = SiteHeader({...sources})

  const appFrame = AppShell({
    headerDOM: header.DOM,
    pageDOM: page$.pluck('DOM'),
    ...sources
  })

  const children = [appFrame, page$]

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    sources.redirectLogout$
  )

  return {
    ...sources,
    DOM: appFrame.DOM,
    auth$: mergeOrFlatMapLatest('auth$', ...children),
    queue$: mergeOrFlatMapLatest('queue$', ...children),
    route$
  }
}
