import view from './view'

export default function Biography (model) {
  const view$ = view(model)

  const sinks = {
    DOM: view$.DOM
  }
  return sinks
}
