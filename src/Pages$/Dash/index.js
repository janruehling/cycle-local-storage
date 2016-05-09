import R from 'ramda'
import { Observable } from 'rx'
import isolate from '@cycle/isolate'

import { AppShell, SiteHeader$, AccountInfo, Search } from 'Components$'
import { nestedComponent, mergeOrFlatMapLatest, byMatch } from 'zwUtility'

import { getInsuranceId$, getInsuranceIdStats$ } from 'Remote'

import Landing from './Landing'

const _routes = {
  '/': isolate(Landing)
}

export default sources => {
  const stats$ = sources.responses$
    .filter(byMatch('insurance_companies/1/stats'))
    .map(res => res.body)
    .filter(data => !!data)
    .map(data => data.stats)
    .startWith({})

  const organization$ = sources.responses$
    .filter(res$ => {
      const url = R.pathOr('', ['request', 'url'])(res$)
      return R.contains('insurance_companies/1')(url) &&
        !R.contains('stats')(url)
    })
    .map(res => res.body)
    .map(data => data.insurance_company)
    .startWith({})

  const page$ = nestedComponent(
    sources.router.define(_routes),
    {
      ...sources,
      stats$,
      organization$
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

  const details = {
    HTTP: getInsuranceId$({
      ...sources,
      insuranceId$: Observable.just('1')
    })
  }

  const stats = {
    HTTP: getInsuranceIdStats$({
      ...sources,
      insuranceId$: Observable.just('1')
    })
  }

  const children = [header, search, appShell, page$, details, stats]

  const HTTP = Observable.merge(
    mergeOrFlatMapLatest('HTTP', ...children)
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
