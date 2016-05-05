import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwSelect } from 'StyleFn'

const SelectFactory = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('SelectFactory needs an id to work properly')
  }
  const _render = ({
    value
  }) => zwSelect({
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

export default SelectFactory
export { SelectFactory }
