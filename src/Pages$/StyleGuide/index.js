import model from './model'
import view from './view'

export default function StyleGuide (sources) {
  const model$ = model(sources)
  const view$ = view(model$)

  const sinks = {
    DOM: view$.DOM
  }
  return sinks
}
