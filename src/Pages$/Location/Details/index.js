import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'
import { AppShell, SiteHeader, ComingSoon, TabBar, LocationDetailsCard, Search } from 'Components$'

import { getLocationsId$ } from 'Remote'

import DetailsView from './DetailsView'

import styles from './Details.css'

const _routes = {
  '/': isolate(DetailsView),
  '/relations': isolate(ComingSoon('Relations'))
}

const _tabs = [
  {path: '/', label: 'Details View'},
  {path: '/relations', label: 'Relations'}
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
  const location$ = sources.responses$
    .filter(byMatch('locations'))
    .map(res => res.body)
    .map(data => data.location)
    .startWith({})

  const page$ = nestedComponent(
    sources.router.define(_routes),
    { location$, ...sources }
  )

  const detailsCard = LocationDetailsCard({
    location: location$,
    ...sources
  })

  const tabBar = TabBar({...sources, tabs: Observable.just(_tabs)})

  const header = SiteHeader({...sources})

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

  const children = [header, appShell, tabBar, page$]

  const queue$ = Observable.merge(
    getLocationsId$(sources),
    mergeOrFlatMapLatest('queue$', ...children)
  )

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

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
