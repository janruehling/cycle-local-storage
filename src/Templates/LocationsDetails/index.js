import model from './model'
import view from './view'

export default function PractitionerDetails (sources) {
  let model$ = model(sources)
  let view$ = view(sources, model$)

  const request$ = view$.HTTP.merge(model$.HTTP)

  const sinks = {
    DOM: view$.DOM,
    HTTP: request$
  }

  return sinks
}
