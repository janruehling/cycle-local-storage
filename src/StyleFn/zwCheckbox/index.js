import { div, input } from '@cycle/dom'
import classNames from 'classnames'

import styles from './zwCheckbox.css'

export const zwCheckbox = (attributes = {}) => {
  const inputAttributes = {}

  if (attributes.value) {
    inputAttributes.checked = true
  }

  return div({
    className: attributes.skin ? styles[attributes.skin] || styles.default : styles.default
  }, [
    attributes.label && div({
      className: styles.label,
      style: {
        ...attributes.styleLabel
      }
    }, attributes.label),
    input({
      id: attributes.id,
      type: 'checkbox',
      name: attributes.id,
      attributes: inputAttributes,
      className: classNames({
        [styles.input]: true
      }),
      style: {
        ...attributes.styleInput
      }
    }),
    attributes.description && div({
      className: styles.description,
      style: {
        ...attributes.styleDescription
      }
    }, attributes.description)
  ])
}
