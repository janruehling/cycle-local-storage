import { Observable } from 'rx'
const { just } = Observable

import isolate from '@cycle/isolate'

import { nestedComponent, mergeOrFlatMapLatest } from 'util'

import { ComingSoon, TabBar } from 'Components$'

const PractitionerDetails = ComingSoon('Practitioner Details')
const PractitionerRelations = ComingSoon('Practitioner Relations')

const _routes = {
  '/': isolate(PractitionerDetails),
  '/relations': isolate(PractitionerRelations)
}

const _tabs = [
  {path: '/', label: 'Details'},
  {path: '/relations', label: 'Relations'}
]

export default sources => {
  const page$ = nestedComponent(
    sources.router.define(_routes), sources
  )

  const tabBar = TabBar({...sources, tabs: Observable.just(_tabs)})

  const children = [page$, tabBar]

  const DOM = page$.flatMapLatest(page => page.DOM)

  const tabBarDOM = tabBar.DOM

  const pageTitle = just('At a Glance')

  const auth$ = mergeOrFlatMapLatest('auth$', ...children)

  const queue$ = mergeOrFlatMapLatest('queue$', ...children)

  const route$ = mergeOrFlatMapLatest('route$', ...children)

  return {
    DOM,
    tabBarDOM,
    pageTitle,
    auth$,
    queue$,
    route$,
  }
}
