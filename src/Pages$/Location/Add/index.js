import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest } from 'zwUtility'
import { AppShell, SiteHeader$, Search, ToolBar } from 'Components$'
import { SuccessMessage, ErrorMessage, Button } from 'StyleFn'

import { postLocations$ } from 'Remote'

import AddView from '../Common/AddEditForm'

import constants from 'constants.css'
import styles from './Add.css'

const _routes = {
  '/': isolate(AddView)
}

const _render = ({
  page,
  path
}) => div({
  className: styles.container
}, [
  page
])

export default sources => {
  const page$ = nestedComponent(
    sources.router.define(_routes),
    { ...sources }
  )

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
          div('Create a Location')
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
    .map(ev => ({
      pathname: '/locations'
    }))

  const saveClick$ = sources.DOM.select('#save')
    .events('click')
    .map(true)

  const saveRequest$ = mergeOrFlatMapLatest('formData$', page$)
    .sample(saveClick$)
    .flatMap(data => postLocations$({
      ...sources,
      data$: Observable.just(data)
    }))

  const response$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'postLocations$')
    .map(res => res.body)

  const message$ = response$
    .flatMapLatest(response => {
      return Observable
        .timer(0, 1000)
        .take(5)
        .flatMap(count => {
          if (count < 4) {
            return response.error
              ? Observable.just(ErrorMessage(response.message))
              : Observable.just(SuccessMessage('The entity was created successfully'))
          } else {
            return Observable.just(null)
          }
        }
      )
    })
    .startWith(null)

  const successRedirect$ = response$
    .filter(response => !response.error)
    .delay(2000)
    .map(response => ({
      pathname: '/locations'
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

  const createReq = {
    HTTP: saveRequest$
  }

  const children = [header, search, appShell, page$, createReq]

  const HTTP = Observable.merge(
    mergeOrFlatMapLatest('HTTP', ...children)
  )

  const storage = Observable.merge(
    mergeOrFlatMapLatest('storage', ...children)
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
    storage,
    HTTP,
    route$
  }
}
