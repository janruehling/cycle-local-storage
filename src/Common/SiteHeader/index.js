import model from './model'
import view from './view'

export default function SiteHeader (sources) {
  let model$ = model(sources)
  let view$ = view(model$, sources)

  const sinks = {
    DOM: view$.DOM,
    HTTP: model$.HTTP,
    profile$: model$.profile$
  }

  return sinks
}
