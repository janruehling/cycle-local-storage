import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwSelect } from 'StyleFn'

const SelectFactory = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('SelectFactory needs an id to work properly')
  }
  const _render = ({
    options,
    value
  }) => zwSelect({
    ...attributes,
    options,
    value
  })

  const input$ = sources.DOM
    .select('#' + attributes.id)
    .events('input')

  const value$ = (sources.value$ || Observable.just(null))
    .merge(input$.pluck('target', 'value'))

  const DOM = combineLatestObj({
    value$,
    options: sources.options$ || Observable.just(attributes.options)
  })
  .map(_render)

  return {
    DOM,
    value$
  }
}

export default SelectFactory
export { SelectFactory }
