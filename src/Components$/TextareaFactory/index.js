import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwTextarea } from 'StyleFn'

const TextareaFactory = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('TextareaFactory needs an id to work properly')
  }
  const _render = ({
    value
  }) => zwTextarea({
    ...attributes,
    value
  })

  const input$ = sources.DOM
    .select('#' + attributes.id)
    .events('change')

  const value$ = (sources.value$ || Observable.just(null))
    .merge(input$.pluck('currentTarget', 'value'))

  const DOM = combineLatestObj({value$})
    .map(_render)

  return {
    DOM,
    value$
  }
}

export default TextareaFactory
export { TextareaFactory }
