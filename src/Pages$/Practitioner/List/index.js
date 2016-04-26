import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'
import { AppShell, SiteHeader, Search, ToolBar } from 'Components$'
import { Icon } from 'StyleFn'

import { getPractitioners$ } from 'Remote'

import GridView from './GridView'
import ListView from './ListView'

const _routes = {
  '/': isolate(ListView),
  '/grid': isolate(GridView)
}

export default sources => {
  const practitioners$ = sources.responses$
    .filter(byMatch('practitioners'))
    .map(res => res.body)
    .map(data => data.practitioners)

  const page$ = nestedComponent(
    sources.router.define(_routes), {
      practitioners$, ...sources
    }
  )

  const header = SiteHeader({...sources})

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
      ],
      right: [
        div({
          id: 'list',
          style: {
            color: 'inherit',
            cursor: 'pointer'
          }
        }, [
          Icon({
            icon: 'List',
            style: {
              marginRight: '10px'
            }
          })
        ]),
        div({
          id: 'grid',
          style: {
            color: 'inherit',
            cursor: 'pointer'
          }
        }, [
          Icon({
            icon: 'Grid',
            style: {
              marginRight: '10px'
            }
          })
        ])
      ]
    })
  })

  const backClicks$ = sources.DOM.select('#back')
    .events('click')
    .map(ev => ({
      type: 'go',
      value: -1
    }))

  const listClick$ = sources.DOM.select('#list')
    .events('click')
    .map(ev => ({
      pathname: '/practitioners'
    }))

  const gridClick$ = sources.DOM.select('#grid')
    .events('click')
    .map(ev => ({
      pathname: '/practitioners/grid'
    }))

  const appShell = AppShell({
    headerDOM: header.DOM,
    searchDOM: search.DOM,
    toolBarDOM: toolBar.DOM,
    pageDOM: page$.pluck('DOM'),
    ...sources
  })

  const children = [appShell, search, toolBar, page$, header]

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const queue$ = Observable.merge(
    getPractitioners$(sources)
    // mergeOrFlatMapLatest('queue$', ...children)
  )

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    backClicks$,
    listClick$,
    gridClick$,
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    queue$,
    route$
  }
}
