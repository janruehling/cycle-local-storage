import { Observable } from 'rx'
import { run } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import { makeHistoryDriver } from 'cyclic-history'
import { makeRouterDriver } from 'cyclic-router'
import { createHashHistory } from 'history'

import main from './App'

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  router: makeRouterDriver(makeHistoryDriver(createHashHistory())),
  config$: () => Observable.just({
    api: '//localhost:3000/'
  })
}

run(main, drivers)
