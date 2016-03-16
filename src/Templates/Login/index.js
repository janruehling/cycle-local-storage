import {Observable} from 'rx'

import view from './view'

export default function Login (sources) {
  const view$ = view(sources)

  const sinks = {
    DOM: view$.DOM,
    HTTP: Observable.empty()
  }
  return sinks
}
