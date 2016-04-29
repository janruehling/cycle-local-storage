import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, byMatch, getName } from 'zwUtility'
import { AppShell, SiteHeader, TabBar, Search, ToolBar } from 'Components$'

import { getPractitionersId$ } from 'Remote'

import EditView from './EditView'

import constants from 'constants.css'
import styles from './Edit.css'

const _routes = {
  '/': isolate(EditView)
}

const _tabs = [
  {path: '/', label: 'Details View'},
  {path: '/relations', label: 'Relations'}
]

const _render = ({
  page,
  path
}) => div({
  className: styles.container
}, [
  page
])

export default sources => {
  const practitioner$ = sources.responses$
    .filter(byMatch('practitioners'))
    .map(res => res.body)
    .map(data => data.practitioner)
    .startWith({})

  const page$ = nestedComponent(
    sources.router.define(_routes),
    { practitioner$, ...sources }
  )

  const tabBar = TabBar({...sources, tabs: Observable.just(_tabs)})

  const header = SiteHeader({...sources})

  const search = Search({...sources})

  const toolBar = ToolBar({
    ...sources,
    tools$: Observable.just({
      left: [
        div({
          style: {
            fontSize: '24px',
            fontWeight: 'bold'
          }
        }, [
          practitioner$.map(practitioner => div(getName(practitioner)))
        ])
      ],
      right: [
        div({
          id: 'cancel',
          style: {
            alignItems: 'center',
            background: constants.primary3,
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            fontSize: '12px',
            lineHeight: '18px',
            marginRight: '5px',
            padding: '0 5px'
          }
        }, 'Cancel'),
        div({
          id: 'save',
          style: {
            alignItems: 'center',
            background: constants.secondary3,
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            fontSize: '12px',
            lineHeight: '18px',
            padding: '0 5px'
          }
        }, 'Save & Close')
      ]
    })
  })

  const saveClick$ = sources.DOM.select('#save')
    .events('click')
    .map(ev => true)

  const cancelClick$ = sources.DOM.select('#cancel')
    .events('click')
    .withLatestFrom(practitioner$)
    .map(([ev, practitioner]) => ({
      pathname: '/practitioner/' + practitioner.id
    }))

  const viewState = {
    page: page$.pluck('DOM'),
    path: sources.router.observable
  }

  const _pageDOM = combineLatestObj(viewState)
    .map(_render)

  const appShell = AppShell({
    headerDOM: header.DOM,
    searchDOM: search.DOM,
    toolBarDOM: toolBar.DOM,
    pageDOM: _pageDOM,
    ...sources
  })

  const children = [header, search, appShell, tabBar, page$]

  const HTTP = Observable.merge(
    getPractitionersId$(sources)
    // mergeOrFlatMapLatest('HTTP', ...children)
  )

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    cancelClick$,
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    HTTP,
    route$
  }
}
