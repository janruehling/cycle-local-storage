import { Observable } from 'rx'
import isolate from '@cycle/isolate'

import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'
import { AppShell, SiteHeader, ComingSoon, Search } from 'Components$'

import { getLocations$ } from 'Remote'

import GridView from './GridView'

const _routes = {
  '/': isolate(GridView),
  '/list': isolate(ComingSoon('List View'))
}

export default sources => {
  const locations$ = sources.responses$
    .filter(byMatch('locations'))
    .map(res => res.body)
    .map(data => data.locations)
    .startWith([])

  const page$ = nestedComponent(
    sources.router.define(_routes), {
      locations$, ...sources
    }
  )

  const header = SiteHeader({...sources})

  const search = Search({...sources})

  const appShell = AppShell({
    headerDOM: header.DOM,
    searchDOM: search.DOM,
    pageDOM: page$.pluck('DOM'),
    ...sources
  })

  const children = [appShell, search, page$, header]

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const queue$ = Observable.merge(
    getLocations$(sources),
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
