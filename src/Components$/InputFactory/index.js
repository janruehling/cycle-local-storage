import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import classNames from 'classnames'
import { input } from '@cycle/dom'

import styles from './InputFactory.css'

const InputFactory = (attributes) => sources => {
  if (!attributes.id) {
    throw new Error('InputFactory needs an id to work properly')
  }
  const _render = ({value}) =>
    input({
      ...attributes,
      id: attributes.id,
      className: classNames({
        [styles.input]: true,
        [attributes.className]: !!attributes.className
      }),
      value
    })

  const input$ = sources.DOM
    .select('#' + attributes.id)
    .events('input')

  const value$ = (sources.value$ || Observable.just(null))
    .merge(input$.pluck('target', 'value'))

  const DOM = combineLatestObj({value$}).map(_render)

  return {
    DOM,
    value$
  }
}

export default InputFactory
export { InputFactory }
