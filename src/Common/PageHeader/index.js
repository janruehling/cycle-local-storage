import model from './model'
import view from './view'

let main = function (sources) {
  let model$ = model(sources)
  let view$ = view(model$)

  return {
    DOM: view$.DOM,
    HTTP: model$.HTTP,
    profile$: model$.profile$
  }
}

export default main
