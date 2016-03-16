import view from './view'

export default function InsurerDashboard (sources) {
  let view$ = view(sources)

  const sinks = {
    DOM: view$.DOM,
    HTTP: view$.HTTP
  }

  return sinks
}
