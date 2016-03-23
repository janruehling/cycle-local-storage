import {div} from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import styles from './PractitionersDetails.css'

import SiteHeader from 'Common/SiteHeader'
import Search from 'Common/Search'
import PractitionersCard from './PractitionersCard'
import Locations from './Locations'
import Organizations from './Organizations'
import Plans from './Plans'
import Activity from './Activity'
import Biography from './Biography'

export default function PractitionerDetails (sources, model) {
  const componentVtree$ = combineLatestObj({
    siteHeader$: SiteHeader(sources).DOM,
    search$: Search(sources).DOM,
    practitionersCard$: PractitionersCard(model).DOM,
    locations$: Locations(model).DOM,
    organizations$: Organizations(model).DOM,
    plans$: Plans(model).DOM,
    activity$: Activity(model).DOM,
    biography$: Biography(model).DOM
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
        vtrees.practitionersCard
      ]),
      div({
        className: styles.mainContent
      }, [
        div({
          className: styles.mainFirstColumn
        }, [
          vtrees.locations,
          vtrees.organizations,
          vtrees.plans
        ]),
        div({
          className: styles.mainSecondColumn
        }, [
          vtrees.activity
        ]),
        div({
          className: styles.mainThirdColumn
        }, [
          vtrees.biography
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
