import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest } from 'zwUtility'
import { AppShell, SiteHeader$, TabBar, PlanDetailsCard, Search, ToolBar } from 'Components$'
import { Icon, Button } from 'StyleFn'

import { getPlansId$, getPlansPractitioners$, getPlansLocations$,
  getPlansGroups$, getPlansActivities$ } from 'Remote'

import DetailsView from './DetailsView'

import constants from 'constants.css'
import styles from './Details.css'

const _routes = {
  '/': isolate(DetailsView)
}

const _tabs = [
  {path: '/', label: 'Details View'}
]

const _render = ({
  detailsCard,
  tabBar,
  page
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
  const plan$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getPlansId$')
    .map(res => res.body)
    .map(data => data.plan)
    .startWith({})

  const practitioners$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getPractitioners$')
    .map(res => res.body)
    .map(data => data.practitioners)
    .startWith([])

  const locations$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getLocations$')
    .map(res => res.body)
    .map(data => data.locations)
    .startWith([])

  const groups$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getGroups$')
    .map(res => res.body)
    .map(data => data.groups)
    .startWith([])

  const activities$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getPlansActivities$')
    .map(res => res.body)
    .map(data => data.activities)
    .startWith([])

  const page$ = nestedComponent(
    sources.router.define(_routes),
    { plan$, practitioners$, locations$, groups$, activities$, ...sources }
  )

  const detailsCard = PlanDetailsCard({
    ...sources,
    plan: plan$
  })

  const tabBar = TabBar({...sources, tabs: Observable.just(_tabs)})

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
      ],
      right: [
        Button({
          background: constants.color2,
          id: 'editData',
          skin: 'narrow',
          text: 'Edit Data'
        })
      ]
    })
  })

  const backClick$ = sources.DOM.select('#back')
    .events('click')
    .map(ev => 'plans/')
    // .map(ev => ({
    //   type: 'go',
    //   value: -1
    // }))

  const editClick$ = sources.DOM.select('#editData')
    .events('click')
    .withLatestFrom(sources.planId$)
    .map(([ev, id]) => ({
      pathname: '/plan/edit/' + id
    }))
    .take(1)

  const viewState = {
    detailsCard: detailsCard.DOM,
    tabBar: tabBar.DOM,
    page: page$.pluck('DOM')
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
    getPlansId$(sources),
    getPlansPractitioners$(sources),
    getPlansLocations$(sources),
    getPlansGroups$(sources),
    getPlansActivities$(sources),
    mergeOrFlatMapLatest('HTTP', ...children)
  )

  const storage = Observable.merge(
    mergeOrFlatMapLatest('storage', ...children)
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
    HTTP,
    storage,
    route$
  }
}
