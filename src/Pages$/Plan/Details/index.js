import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'
import { AppShell, SiteHeader$, TabBar, PlanDetailsCard, Search } from 'Components$'

import { getPlansId$ } from 'Remote'

import DetailsView from './DetailsView'

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
    .filter(byMatch('plans'))
    .map(res => res.body)
    .map(data => data.plan)
    .startWith({})

  const page$ = nestedComponent(
    sources.router.define(_routes),
    { plan$, ...sources }
  )

  const detailsCard = PlanDetailsCard({
    ...sources,
    plan: plan$
  })

  const tabBar = TabBar({...sources, tabs: Observable.just(_tabs)})

  const header = SiteHeader$({...sources})

  const search = Search({...sources})

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
    pageDOM: _pageDOM,
    ...sources
  })

  const children = [header, search, appShell, tabBar, page$]

  const HTTP = Observable.merge(
    getPlansId$(sources)
    // mergeOrFlatMapLatest('HTTP', ...children)
  )

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    HTTP,
    route$
  }
}
