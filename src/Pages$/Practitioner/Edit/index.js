import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, byMatch, getName } from 'zwUtility'
import { AppShell, SiteHeader$, TabBar, Search, ToolBar } from 'Components$'
import { SuccessMessage, ErrorMessage, Button } from 'StyleFn'

import { getPractitionersId$ } from 'Remote'

import EditView from './EditView'

import constants from 'constants.css'
import styles from './Edit.css'

const _routes = {
  '/': isolate(EditView)
}

const _tabs = [
  {path: '/', label: 'Details View'},
  {path: '/relations', label: 'Relations'}
]

const _render = ({
  page,
  path
}) => div({
  className: styles.container
}, [
  page
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

  const tabBar = TabBar({...sources, tabs: Observable.just(_tabs)})

  const search = Search({...sources})

  const toolBar = ToolBar({
    ...sources,
    tools$: Observable.just({
      left: [
        div({
          style: {
            fontSize: '24px',
            fontWeight: 'bold'
          }
        }, [
          practitioner$.map(practitioner => div(getName(practitioner)))
        ])
      ],
      right: [
        Button({
          background: constants.color1_3,
          id: 'cancel',
          skin: 'narrow',
          text: 'Cancel',
          style: {
            marginRight: '10px'
          }
        }),
        Button({
          background: constants.color2,
          id: 'save',
          skin: 'narrow',
          text: 'Save & Close'
        })
      ]
    })
  })

  const cancelClick$ = sources.DOM.select('#cancel')
    .events('click')
    .withLatestFrom(practitioner$)
    .map(([ev, practitioner]) => ({
      pathname: '/practitioner/' + practitioner.id
    }))

  const saveClick$ = sources.DOM.select('#save')
    .events('click')
    .map(true)

  const editRequest$ = mergeOrFlatMapLatest('formData$', page$)
    .sample(saveClick$)
    .combineLatest(sources.config$, sources.practitionerId$,
      (formData, config, id) => ({config, formData, id})
    )
    .map(({config, formData, id}) => {
      return {
        url: config.api + '/practitioners/' + id,
        method: 'PUT',
        send: formData
      }
    })

  const editResponse$ = sources.responses$
    .filter(res$ => res$.request.method === 'PUT')

  const message$ = editResponse$
    .flatMapLatest(response => {
      return Observable
        .timer(0, 1000)
        .take(5)
        .flatMap(count => {
          if (count < 4) {
            return response.error
              ? Observable.just(ErrorMessage(response.message))
              : Observable.just(SuccessMessage('All edits were saved successfully'))
          } else {
            return Observable.just(null)
          }
        }
      )
    })
    .startWith(null)

  const successRedirect$ = editResponse$
    .filter(response => !response.error)
    .delay(5000)
    .withLatestFrom(practitioner$)
    .map(([response, practitioner]) => ({
      pathname: '/practitioner/' + practitioner.id
    }))

  const viewState = {
    page: page$.pluck('DOM'),
    path: sources.router.observable
  }

  const _pageDOM = combineLatestObj(viewState)
    .map(_render)

  const header = SiteHeader$({
    ...sources, message$
  })

  const appShell = AppShell({
    headerDOM: header.DOM,
    searchDOM: search.DOM,
    toolBarDOM: toolBar.DOM,
    pageDOM: _pageDOM,
    ...sources
  })

  const children = [header, search, appShell, tabBar, page$]

  const HTTP = Observable.merge(
    getPractitionersId$(sources),
    editRequest$
    // mergeOrFlatMapLatest('HTTP', ...children)
  )

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/')

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    cancelClick$,
    successRedirect$,
    redirectOnLogout$
  )

  return {
    message$,
    DOM: appShell.DOM,
    HTTP,
    route$
  }
}
