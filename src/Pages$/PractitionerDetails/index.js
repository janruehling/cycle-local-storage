import { Observable } from 'rx'
const { just } = Observable

import { div } from '@cycle/dom'

import { AppShell, SiteHeader } from 'Components$'
// import Title from 'components/Title'
// import Header from 'components/Header'
// import ProjectNav from 'components/ProjectNav'

import { nestedComponent, mergeOrFlatMapLatest } from 'util'

import Details from './Details'

const _routes = {
  '/': Details
}

export default sources => {
  const practitionerId$ = sources.practitionerId$

  const page$ = nestedComponent(
    sources.router.define(_routes),
    {...sources}
  )

  const tabsDOM = page$.flatMapLatest(page => page.tabBarDOM)

  const header = SiteHeader({tabsDOM: tabsDOM, ...sources})

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
