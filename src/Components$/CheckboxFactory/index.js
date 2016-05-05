import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwCheckbox } from 'StyleFn'

const CheckboxFactory = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('CheckboxFactory needs an id to work properly')
  }
  const _render = ({
    value
  }) => zwCheckbox({
    ...attributes,
    value
  })

  const input$ = sources.DOM
    .select('#' + attributes.id)
    .events('change')

  const value$ = (sources.value$ || Observable.just(null))
    .merge(input$.pluck('currentTarget', 'checked'))

  const DOM = combineLatestObj({value$})
    .map(_render)

  return {
    DOM,
    value$
  }
}

export default CheckboxFactory
export { CheckboxFactory }
