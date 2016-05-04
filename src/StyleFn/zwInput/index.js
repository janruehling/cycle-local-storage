import { div, input } from '@cycle/dom'
import classNames from 'classnames'

import styles from './zwInput.css'

export const zwInput = (attributes = {}) => {
  return div({
    className: attributes.skin ? styles[attributes.skin] : styles.default
  }, [
    attributes.label && div({
      className: styles.label,
      style: {
        ...attributes.styleLabel
      }
    }, attributes.label),
    input({
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
