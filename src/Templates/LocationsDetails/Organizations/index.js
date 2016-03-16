import view from './view'

export default function Organizations (model) {
  const view$ = view(model)

  const sinks = {
    DOM: view$.DOM
  }
  return sinks
}
