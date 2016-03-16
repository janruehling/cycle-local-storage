import {div} from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import styles from './InsurerDashboard.css'

import SiteHeader from 'Common/SiteHeader'
import PageHeader from 'Common/PageHeader'
import Search from 'Common/Search'
import DataQuality from './DataQuality'

export default function InsurerDashboard (sources, intent) {
  const componentVtree$ = combineLatestObj({
    siteHeader$: SiteHeader(sources).DOM,
    pageHeader$: PageHeader(sources).DOM,
    search$: Search(sources).DOM,
    dataQuality$: DataQuality(sources).DOM
  })

  const vtree$ = componentVtree$.map(vtrees => div([
    vtrees.siteHeader,
    vtrees.pageHeader,
    vtrees.search,
    div({
      className: styles.container
    }, [
      div({
        className: styles.leftSidebar
      }, [
        vtrees.dataQuality
      ])
    ])
  ]))

  const request$ = SiteHeader(sources).HTTP.merge(PageHeader(sources).HTTP)

  const sinks = {
    DOM: vtree$,
    HTTP: request$
  }
  return sinks
}
