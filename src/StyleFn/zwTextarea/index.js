import { div, textarea } from '@cycle/dom'
import classNames from 'classnames'

import styles from './zwTextarea.css'

export const zwTextarea = (attributes = {}) => {
  return div({
    className: attributes.skin ? (styles[attributes.skin] || styles.default) : styles.default
  }, [
    attributes.label && div({
      className: styles.label,
      style: {
        ...attributes.styleLabel
      }
    }, attributes.label),
    textarea({
      ...attributes,
      className: classNames({
        [styles.input]: true,
        [attributes.className]: !!attributes.className
      }),
      value: attributes.value,
      style: {
        ...attributes.styleInput
      }
    })
  ])
}
