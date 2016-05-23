import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest } from 'zwUtility'
import { AppShell, SiteHeader$, TabBar, PractitionerDetailsCard,
  Search, ToolBar } from 'Components$'
import { Icon, Button } from 'StyleFn'
import { getPractitionersId$, getPractitionersPlans$,
  getPractitionersOrganizations$, getPractitionersLocations$,
  getPractitionersIdActivities$} from 'Remote'

import DetailsView from './DetailsView'
import Relations from './Relations'

import constants from 'constants.css'
import styles from './Details.css'

const _routes = {
  '/': isolate(DetailsView),
  '/relations': isolate(Relations)
}

const _tabs = [
  {path: '/', label: 'Details View'},
  {path: '/relations', label: 'Relationships'}
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
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getPractitionersId$')
    .map(res => res.body)
    .map(data => data.practitioner)
    .startWith({})

  const plans$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getPractitionersPlans$')
    .map(res => res.body)
    .map(data => data.plans)
    .startWith([])

  const organizations$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getPractitionersOrganizations$')
    .map(res => res.body)
    .map(data => data.groups)
    .startWith([])

  const locations$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getPractitionersLocations$')
    .map(res => res.body)
    .map(data => data.locations)
    .startWith([])

  const activities$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getPractitionersIdActivities$')
    .map(res => res.body)
    .map(data => data.activities)
    .startWith([])

  const page$ = nestedComponent(
    sources.router.define(_routes),
    { ...sources, practitioner$, plans$, organizations$, locations$, activities$ }
  )

  const detailsCard = PractitionerDetailsCard({
    ...sources,
    practitioner$
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
    .map(ev => 'practitioners/')
    // .map(ev => ({
    //   type: 'go',
    //   value: -1
    // }))

  const editClick$ = sources.DOM.select('#editData')
    .events('click')
    .withLatestFrom(sources.practitionerId$)
    .map(([ev, id]) => ({
      pathname: '/practitioner/edit/' + id
    }))
    .take(1)

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

  const children = [header, search, appShell, tabBar, detailsCard,
    page$]

  const HTTP = Observable
    .merge(
      mergeOrFlatMapLatest('HTTP', ...children),
      getPractitionersLocations$(sources),
      getPractitionersOrganizations$(sources),
      getPractitionersPlans$(sources),
      getPractitionersId$(sources),
      getPractitionersIdActivities$(sources)
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
    storage,
    HTTP,
    route$
  }
}
