import {div} from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import styles from './LocationsDetails.css'

import SiteHeader from 'Common/SiteHeader'
import Search from 'Common/Search'
import LocationsCard from './LocationsCard'
import Organizations from './Organizations'
import Practitioners from './Practitioners'
import Activity from './Activity'

export default function PractitionerDetails (sources, model) {
  const componentVtree$ = combineLatestObj({
    siteHeader$: SiteHeader(sources).DOM,
    search$: Search(sources).DOM,
    locationsCard$: LocationsCard(model).DOM,
    organizations$: Organizations(model).DOM,
    practitioners$: Practitioners(model).DOM,
    activity$: Activity(model).DOM
  })

  const vtree$ = componentVtree$.map(vtrees => div([
    vtrees.siteHeader,
    vtrees.search,
    div({
      className: styles.container
    }, [
      div({
        className: styles.leftSidebar
      }, [
        vtrees.locationsCard
      ]),
      div({
        className: styles.mainContent
      }, [
        div({
          className: styles.mainFirstColumn
        }, [
          vtrees.organizations,
          vtrees.practitioners
        ]),
        div({
          className: styles.mainSecondColumn
        }, [
          vtrees.activity
        ]),
        div({
          className: styles.mainThirdColumn
        }, [

        ])
      ])
    ])
  ]))

  const request$ = SiteHeader(sources).HTTP

  const sinks = {
    DOM: vtree$,
    HTTP: request$
  }
  return sinks
}
