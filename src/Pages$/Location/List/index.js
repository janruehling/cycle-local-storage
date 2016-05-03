import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'
import { AppShell, SiteHeader$, ComingSoon, Search, ToolBar } from 'Components$'
import { Icon } from 'StyleFn'

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

  const header = SiteHeader$({...sources})

  const search = Search({...sources})

  const toolBar = ToolBar({
    ...sources,
    tools$: Observable.just({
      left: [
        div({
          style: {
            cursor: 'pointer',
            display: 'flex'
          },
          id: 'back'
        }, [
          Icon({
            icon: 'Back',
            style: {
              marginRight: '10px'
            }
          }),
          div('Back')
        ])
      ]
    })
  })

  const backClick$ = sources.DOM.select('#back')
    .events('click')
    .map(ev => ({
      type: 'go',
      value: -1
    }))

  const appShell = AppShell({
    headerDOM: header.DOM,
    searchDOM: search.DOM,
    toolBarDOM: toolBar.DOM,
    pageDOM: page$.pluck('DOM'),
    ...sources
  })

  const children = [appShell, search, page$, header]

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const HTTP = Observable.merge(
    getLocations$(sources)
    // mergeOrFlatMapLatest('HTTP', ...children)
  )

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    backClick$,
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    HTTP,
    route$
  }
}
