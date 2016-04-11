import { Observable } from 'rx'
const { just } = Observable

import { div } from '@cycle/dom'

import { AppShell, SiteHeader } from 'Components$'
// import Title from 'components/Title'
// import Header from 'components/Header'
// import ProjectNav from 'components/ProjectNav'

import { ComingSoon } from 'Components$'
import { nestedComponent, mergeOrFlatMapLatest } from 'zwUtility'

import List from './List'
import Details from './Details'

const _routes = {
  '/': List,
  '/details/:id': id => sources =>
    Details({practitionerId$: just(id), ...sources})
}

export default sources => {
  const page$ = nestedComponent(
    sources.router.define(_routes),
    {...sources}
  )

  const header = SiteHeader({...sources})

  const appFrame = AppShell({
    headerDOM: header.DOM,
    pageDOM: page$.pluck('DOM'),
    ...sources
  })

  const children = [appFrame, page$]

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    sources.redirectLogout$
  )

  return {
    DOM: appFrame.DOM,
    auth$: mergeOrFlatMapLatest('auth$', ...children),
    queue$: mergeOrFlatMapLatest('queue$', ...children),
    route$
  }
}
