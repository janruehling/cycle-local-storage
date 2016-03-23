import {Observable} from 'rx'

import intent from './intent'
import model from './model'
import view from './view'

export default function Login (sources) {
  const action$ = intent(sources)
  const model$ = model(action$, sources)
  const view$ = view(model$)

  const sinks = {
    DOM: view$.DOM,
    HTTP: model$.HTTP
  }
  return sinks
}
