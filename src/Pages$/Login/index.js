import view from './view'

export default function Login (sources) {
  const view$ = view(sources)

  const sinks = {
    DOM: view$.DOM,
    HTTP: view$.HTTP,
    storage: view$.storage,
    route$: view$.route$
  }
  return sinks
}
