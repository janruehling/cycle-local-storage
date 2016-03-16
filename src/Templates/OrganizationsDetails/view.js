import {div} from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import styles from './OrganizationsDetails.css'

import SiteHeader from 'Common/SiteHeader'
import Search from 'Common/Search'
import OrganizationsCard from './OrganizationsCard'
import Locations from './Locations'
import Practitioners from './Practitioners'
import Plans from './Plans'
import Activity from './Activity'
import Profile from './Profile'

export default function PractitionerDetails (sources, model) {
  const componentVtree$ = combineLatestObj({
    siteHeader$: SiteHeader(sources).DOM,
    search$: Search(sources).DOM,
    organizationsCard$: OrganizationsCard(model).DOM,
    locations$: Locations(model).DOM,
    practitioners$: Practitioners(model).DOM,
    plans$: Plans(model).DOM,
    activity$: Activity(model).DOM,
    profile$: Profile(model).DOM
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
        vtrees.organizationsCard
      ]),
      div({
        className: styles.mainContent
      }, [
        div({
          className: styles.mainFirstColumn
        }, [
          vtrees.locations,
          vtrees.practitioners,
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
          vtrees.profile
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
