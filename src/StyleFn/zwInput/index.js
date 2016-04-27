import { div, input } from '@cycle/dom'
import classNames from 'classnames'

import styles from './zwInput.css'

export const zwInput = (attributes = {}) =>
  div({
    className: attributes.skin ? styles[attributes.skin] : styles.default
  }, [
    attributes.label && div({
      className: styles.label
    }, attributes.label),
    input({
      ...attributes,
      className: classNames({
        [styles.input]: true,
        [attributes.className]: !!attributes.className
      })
    })
  ])
