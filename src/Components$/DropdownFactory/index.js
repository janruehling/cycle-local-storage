import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwDropdown } from 'StyleFn'

const DropdownFactory = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('DropdownFactory needs an id to work properly')
  }
  const _render = ({
    value
  }) => zwDropdown({
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
