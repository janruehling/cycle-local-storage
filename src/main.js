import { Observable } from 'rx'
import { run } from '@cycle/core'

import { makeDOMDriver } from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import localStorageDriver from 'cycle-local-storage'
import { makeRouterDriver } from 'cyclic-router'
import { createHashHistory } from 'history'

import main from './Pages$'

const history = createHashHistory()

const {sources, sinks} = run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver({
    eager: true
  }),
  storage: localStorageDriver,
  router: makeRouterDriver(history),
  config$: () => Observable.just({
    api: 'https://apistagingdata.zipwire.com/',
    dev: true
  })
})

if (module.hot) {
  module.hot.accept()

  module.hot.dispose(() => {
    sinks.dispose()
    sources.dispose()
  })
}
