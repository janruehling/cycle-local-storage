import { Observable } from 'rx'
import { div, nav } from '@cycle/dom'
import './app.css'

import DevBar from '../Common/DevBar'
import InsurerDashboard from '../Templates/InsurerDashboard'
import Login from '../Templates/Login'
import PractitionersDetails from '../Templates/PractitionersDetails'
import OrganizationsDetails from '../Templates/OrganizationsDetails'
import LocationsDetails from '../Templates/LocationsDetails'

const routes = {
  '/': InsurerDashboard,
  '/login': Login,
  '/practitioners/:id': id => sources => PractitionersDetails({props$: Observable.of({id}), ...sources}),
  '/organizations/:id': id => sources => OrganizationsDetails({props$: Observable.of({id}), ...sources}),
  '/locations/:id': id => sources => LocationsDetails({props$: Observable.of({id}), ...sources})
}

function view (devbar, children) {
  return div([
    nav([devbar]),
    div([children])
  ])
}

export default function App (sources) {
  const {router} = sources
  const {path$, value$} = router.define(routes)
  const devbar = DevBar(sources, path$)

  const childrenDOM$ = path$.zip(value$,
    (path, value) => value({...sources, router: router.path(path)}).DOM
  )

  const request$ = value$.flatMap(value => value(sources).HTTP)

  const sinks = {
    DOM: devbar.DOM.combineLatest(childrenDOM$, view),
    HTTP: request$
  }

  return sinks
}
