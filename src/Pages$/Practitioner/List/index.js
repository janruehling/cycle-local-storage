import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, getUrlFilter$, getCurrentViewType$ } from 'zwUtility'
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
  const currentViewType$ = getCurrentViewType$(sources)

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
      .combineLatest(sources.userProfile$)
      .flatMap(([viewType, profile]) => Observable.just({
        left: [
          div({
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              color: constants.color1
            }
          }, 'All Practitioners')
        ],
        right: [
          div({
            id: 'add',
            style: {
              alignItems: 'center',
              background: constants.color4,
              cursor: 'pointer',
              display: profile.email === 'zipwire_admin@zipwire.com' ? 'flex' : 'none',
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
              icon: 'Grid'
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

  const children = [appShell, search, page$, header]

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const HTTP = Observable.merge(
    getPractitioners$({
      ...sources,
      filter$: getUrlFilter$(sources)
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
