import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { div } from '@cycle/dom'

import { nestedComponent, mergeOrFlatMapLatest, getName } from 'zwUtility'
import { AppShell, SiteHeader$, Search, ToolBar } from 'Components$'
import { SuccessMessage, ErrorMessage, Button } from 'StyleFn'
import { filterChangedFields } from 'Helpers'

import { getGroupsId$, putGroupsId$ } from 'Remote'

import EditView from '../Common/AddEditForm'

import constants from 'constants.css'
import styles from './Edit.css'

const _routes = {
  '/': isolate(EditView)
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
  const group$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getGroupsId$')
    .map(res => res.body)
    .map(data => data.group)
    .startWith({})

  const page$ = nestedComponent(
    sources.router.define(_routes),
    { group$, ...sources }
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
          group$.map(group => div(getName(group) + (group.zwmid ? ' (' + group.zwmid + ')' : '')))
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
    .withLatestFrom(sources.groupId$)
    .map(([ev, id]) => ({
      pathname: '/group/' + id + '/'
    }))

  const saveClick$ = sources.DOM.select('#save')
    .events('click')
    .map(true)

  const editRequest$ = mergeOrFlatMapLatest('formData$', page$)
    .combineLatest(group$)
    .sample(saveClick$)
    .map(([formData, group]) => filterChangedFields(formData, group))
    .flatMap(formData => putGroupsId$({
      ...sources,
      formData$: Observable.just(formData)
    }))
    .take(1)

  const editResponse$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'putGroupsId$')

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
    .delay(2000)
    .withLatestFrom(group$)
    .map(([response, group]) => ({
      pathname: '/group/' + group.id + '/'
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

  const groupReq = {
    HTTP: getGroupsId$(sources)
  }

  const editReq = {
    HTTP: editRequest$
  }

  const children = [header, search, appShell, page$, groupReq, editReq]

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
