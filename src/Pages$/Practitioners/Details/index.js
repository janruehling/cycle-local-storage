import { Observable } from 'rx'
import isolate from '@cycle/isolate'

import { TabBar, ComingSoon } from 'Components$'

import { nestedComponent, mergeOrFlatMapLatest } from 'zwUtility'

import Landing from './Landing'

const _routes = {
  '/': Landing
}

export default sources => {
  const practitionerId$ = sources.practitionerId$
  
  const page$ = nestedComponent(
    sources.router.define(_routes), sources
  )

  const children = [page$]

  const DOM = page$.flatMapLatest(page => page.DOM)

  const queue$ = mergeOrFlatMapLatest('queue$', ...children)

  const route$ = mergeOrFlatMapLatest('route$', ...children)

  return {
    DOM,
    queue$,
  route$}
}
