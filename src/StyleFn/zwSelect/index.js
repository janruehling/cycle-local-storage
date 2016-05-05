import { div, select, option } from '@cycle/dom'
import classNames from 'classnames'

import styles from './zwSelect.css'

export const zwSelect = (attributes = {}) => {
  return div({
    className: attributes.skin ? styles[attributes.skin] : styles.default
  }, [
    attributes.label && div({
      className: styles.label,
      style: {
        ...attributes.styleLabel
      }
    }, attributes.label),
    select({
      id: attributes.id,
      name: attributes.id,
      className: classNames({
        [styles.input]: true,
        [attributes.className]: !!attributes.className
      }),
      style: {
        ...attributes.styleInput
      }
    }, attributes.options && attributes.options.map(opt => option({
      attributes: {
        value: opt.value,
        selected: attributes.value === opt.value ? true : null
      }
    }, opt.name)))
  ])
}
