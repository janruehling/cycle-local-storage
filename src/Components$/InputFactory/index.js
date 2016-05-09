import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwInput, zwSearch } from 'StyleFn'

import intent from './intent'

const InputFactory = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('InputFactory needs an id to work properly')
  }

  const actions = intent(sources, attributes)

  const _render = ({
    value,
    results
  }) => attributes.type === 'search'
    ? zwSearch({
      ...attributes,
      value,
      results
    })
    : zwInput({
      ...attributes,
      value
    })

  const input$ = sources.DOM
    .select('#' + attributes.id)
    .events('input')

  const value$ = (sources.value$ || Observable.just(''))
    .merge(input$.pluck('target', 'value'))
    .merge(actions.escClicks$.flatMap(ev => {
      return sources.value$ || Observable.just('')
    }))

  const results$ = (sources.results$ || Observable.just({}))
    .merge(actions.escClicks$.map(ev => {}))

  const DOM = combineLatestObj({value$, results$})
    .map(_render)

  return {
    DOM,
    value$,
    actions
  }
}

export default InputFactory
export { InputFactory }
