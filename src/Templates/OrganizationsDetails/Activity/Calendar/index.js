import view from './view'

export default function Calendar (sources) {
  const view$ = view(sources)

  const sinks = {
    DOM: view$.DOM
  }

  return sinks
}
