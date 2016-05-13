import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, getUrlParams } from 'zwUtility'
import { AppShell, SiteHeader$, Search, ToolBar } from 'Components$'
import { Icon } from 'StyleFn'

import { getPractitioners$ } from 'Remote'

import GridView from './GridView'
import ListView from './ListView'

import constants from 'constants.css'

const _routes = {
  '/': isolate(ListView),
  '/grid': isolate(GridView)
}

export default sources => {
  const currentViewType$ = sources.router.observable
    .map(x => x.pathname)
    .map(x => x.split('/'))
    .map(x => x[x.length - 1])
    .map(x => {
      if (x === 'practitioners') return 'list'
      return x
    })

  const practitioners$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getPractitioners$')
    .map(res => res.body)
    .map(data => data.practitioners)

  const page$ = nestedComponent(
    sources.router.define(_routes), {
      practitioners$, ...sources
    }
  )

  const header = SiteHeader$({...sources})

  const search = Search({...sources})

  const toolBar = ToolBar({
    ...sources,
    tools$: currentViewType$
      .flatMap(viewType => Observable.just({
        left: [
          div('All Practitioners')
        ],
        right: [
          div({
            id: 'add',
            style: {
              alignItems: 'center',
              background: constants.color4,
              cursor: 'pointer',
              display: 'flex',
              height: '18px',
              justifyContent: 'center',
              marginRight: '10px',
              width: '18px'
            }
          }, [
            Icon({
              icon: 'Plus',
              style: {
                color: '#fff',
                fontSize: '10px'
              }
            })
          ]),
          div({
            id: 'list',
            style: {
              color: viewType === 'list' ? 'inherit' : constants.color1_3,
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
              color: viewType === 'grid' ? 'inherit' : constants.color1_3,
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
      }))
  })

  const addClick$ = sources.DOM.select('#add')
    .events('click')
    .map(ev => ({
      pathname: '/practitioners/add'
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

  const filter$ = getUrlParams(sources)
    .filter(params => !!params.filter)
    .map(params => params.filter)
    .map(r => r.split('_'))
    .flatMap(r => Observable.just({
      [r[0]]: {
        id: r[1]
      }
    }))
    .startWith(null)

  const HTTP = Observable.merge(
    getPractitioners$({
      ...sources,
      filter$
    }),
    mergeOrFlatMapLatest('HTTP', ...children)
  )

  const storage = Observable.merge(
    mergeOrFlatMapLatest('storage', ...children)
  )

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    addClick$,
    listClick$,
    gridClick$,
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    HTTP,
    storage,
    route$
  }
}
