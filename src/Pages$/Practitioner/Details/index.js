import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'
import { AppShell, SiteHeader, TabBar, PractitionerDetailsCard, Search, ToolBar } from 'Components$'
import { Icon } from 'StyleFn'

import { getPractitionersId$ } from 'Remote'

import DetailsView from './DetailsView'
import Relations from './Relations'
// import EditView from './EditView'

import constants from 'constants.css'
import styles from './Details.css'

const _routes = {
  '/': isolate(DetailsView),
  '/relations': isolate(Relations)
}

const _tabs = [
  {path: '/', label: 'Details View'},
  {path: '/relations', label: 'Relations'}
]

const _render = ({
  detailsCard,
  tabBar,
  page,
  path
}) => div({
  className: styles.container
}, [
  div({
    className: styles.sidebarLeft
  }, [
    detailsCard
  ]),
  div({
    className: styles.main
  }, [
    tabBar,
    page
  ])
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

  const detailsCard = PractitionerDetailsCard({
    practitioner: practitioner$,
    ...sources
  })

  const tabBar = TabBar({...sources, tabs: Observable.just(_tabs)})

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
          id: 'editData',
          style: {
            alignItems: 'center',
            border: '1px solid currentColor',
            color: constants.secondary3,
            cursor: 'pointer',
            display: 'flex',
            fontSize: '12px',
            lineHeight: '18px',
            padding: '0 5px'
          }
        }, '+ Edit Data')
      ]
    })
  })

  const backClick$ = sources.DOM.select('#back')
    .events('click')
    .map(ev => ({
      type: 'go',
      value: -1
    }))

  const editClick$ = sources.DOM.select('#editData')
    .events('click')
    .withLatestFrom(practitioner$)
    .map(([ev, practitioner]) => ({
      pathname: '/practitioner/edit/' + practitioner.id
    }))

  const viewState = {
    detailsCard: detailsCard.DOM,
    tabBar: tabBar.DOM,
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

  const queue$ = Observable.merge(
    getPractitionersId$(sources)
    // mergeOrFlatMapLatest('queue$', ...children)
  )

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    backClick$,
    editClick$,
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    queue$,
    route$
  }
}
