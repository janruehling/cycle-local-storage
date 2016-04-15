import { Observable } from 'rx'
import isolate from '@cycle/isolate'

import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'
import { AppShell, SiteHeader, ComingSoon } from 'Components$'

import { getPlans$ } from 'Remote'

import GridView from './GridView'

const _routes = {
  '/': isolate(GridView),
  '/list': isolate(ComingSoon('List View'))
}

export default sources => {
  const plans$ = sources.responses$
    .filter(byMatch('plans'))
    .map(res => res.body)
    .map(data => data.plans)
    .startWith([])

  const page$ = nestedComponent(
    sources.router.define(_routes), {
      plans$, ...sources
    }
  )

  const header = SiteHeader({...sources})

  const appShell = AppShell({
    headerDOM: header.DOM,
    pageDOM: page$.pluck('DOM'),
    ...sources
  })

  const children = [appShell, page$, header]

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const queue$ = Observable.merge(
    getPlans$(sources),
    mergeOrFlatMapLatest('queue$', ...children)
  )

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    queue$,
    route$
  }
}
