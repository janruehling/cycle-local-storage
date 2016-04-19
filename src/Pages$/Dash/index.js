import R from 'ramda'
import { Observable } from 'rx'
import isolate from '@cycle/isolate'

import { AppShell, SiteHeader, AccountInfo, Search } from 'Components$'
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
      stats$,
      organization$,
      ...sources
    }
  )

  const accountInfo = AccountInfo({...sources, organization$})

  const header = SiteHeader({...sources})

  const search = Search({...sources})

  const appShell = AppShell({
    noScroll: search.value$,
    headerDOM: header.DOM,
    accountInfoDOM: accountInfo.DOM,
    searchDOM: search.DOM,
    pageDOM: page$.pluck('DOM'),
    ...sources
  })

  const children = [header, search, appShell, page$]

  const queue$ = Observable.merge(
    getInsuranceId$({
      ...sources,
      insuranceId$: Observable.just('1')
    }),
    getInsuranceIdStats$({
      ...sources,
      insuranceId$: Observable.just('1')
    }),
    mergeOrFlatMapLatest('queue$', ...children)
  )

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    sources.redirectLogout$
  )

  return {
    ...sources,
    DOM: appShell.DOM,
    queue$,
    route$
  }
}
