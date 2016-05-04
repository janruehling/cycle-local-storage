import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwInput } from 'StyleFn'

const InputFactory = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('InputFactory needs an id to work properly')
  }
  const _render = ({
    value
  }) => zwInput({
    ...attributes,
    value
  })

  const input$ = sources.DOM
    .select('#' + attributes.id)
    .events('input')

  const value$ = (sources.value$ || Observable.just(null))
    .merge(input$.pluck('target', 'value'))

  const DOM = combineLatestObj({value$})
    .map(_render)

  return {
    DOM,
    value$
  }
}

export default InputFactory
export { InputFactory }
