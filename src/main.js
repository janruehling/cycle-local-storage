import {Observable} from 'rx'
const {just} = Observable
import {run} from '@cycle/core'

// drivers
import {makeDOMDriver} from '@cycle/dom'
import { makeHTTPDriver } from '@cycle/http'
import localStorageDriver from 'cycle-local-storage';
import {makeRouterDriver, supportsHistory} from 'cyclic-router'
import {createHistory, createHashHistory} from 'history'

// app root function
import main from './Pages$'

const history = createHashHistory()

const {sources, sinks} = run(main, {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver({
    eager: true
  }),
  storage: localStorageDriver,
  router: makeRouterDriver(history),
  config$: () => just({
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
