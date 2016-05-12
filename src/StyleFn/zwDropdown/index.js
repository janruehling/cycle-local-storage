import { div, select, option } from '@cycle/dom'
import classNames from 'classnames'

import styles from './zwDropdown.css'

export const zwDropdown = (attributes = {}) => {
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
    }, attributes.options && attributes.options.map(opt => {
      const attr = {
        value: opt.value
      }

      if (attributes.value === opt.value) attr.selected = true

      return option({
        attributes: attr
      }, opt.name)
    }))
  ])
}
