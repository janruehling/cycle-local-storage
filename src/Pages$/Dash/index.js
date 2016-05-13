import { Observable } from 'rx'
import isolate from '@cycle/isolate'

import { AppShell, SiteHeader$, AccountInfo, Search } from 'Components$'
import { nestedComponent, mergeOrFlatMapLatest } from 'zwUtility'

import { getInsuranceId$, getInsuranceIdStats$, getInsuranceIdActivities$ } from 'Remote'

import Landing from './Landing'

const _routes = {
  '/': isolate(Landing)
}

export default sources => {
  const stats$ = sources.responses$
    .filter(res$ => res$.request.category === 'getInsuranceIdStats$')
    .map(res => res.body)
    .map(data => data.stats)
    .startWith({})

  const organization$ = sources.responses$
    .filter(res$ => res$.request.category === 'getInsuranceId$')
    .map(res => res.body)
    .map(data => data.insurance_company)
    .startWith({})

  const activities$ = sources.responses$
    .filter(res$ => res$.request.category === 'getInsuranceIdActivities$')
    .map(res => res.body)
    .map(data => data.activities)
    .startWith([])

  const page$ = nestedComponent(
    sources.router.define(_routes),
    {
      ...sources,
      stats$,
      organization$,
      activities$
    }
  )

  const accountInfo = AccountInfo({
    ...sources,
    organization$
  })

  const header = SiteHeader$({...sources})

  const search = Search({...sources})

  const appShell = AppShell({
    ...sources,
    noScroll: search.value$,
    headerDOM: header.DOM,
    accountInfoDOM: accountInfo.DOM,
    searchDOM: search.DOM,
    pageDOM: page$.pluck('DOM')
  })

  const children = [header, search, appShell, page$]

  const HTTP = Observable.merge(
    mergeOrFlatMapLatest('HTTP', ...children),
    getInsuranceIdStats$({
      ...sources,
      insuranceId$: Observable.just('3')
    }),
    getInsuranceId$({
      ...sources,
      insuranceId$: Observable.just('3')
    }),
    getInsuranceIdActivities$({
      ...sources,
      insuranceId$: Observable.just('3')
    })
  )

  const storage = Observable.merge(
    mergeOrFlatMapLatest('storage', ...children)
  )

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/#/login')

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    redirectOnLogout$
  )

  return {
    DOM: appShell.DOM,
    HTTP,
    storage,
    route$
  }
}
