import { div, span } from '@cycle/dom'
import styles from './KeyValue.css'
import classNames from 'classnames'

export const KeyValue = (options = {}) =>
  div({
    className: classNames({
      [styles.container]: true,
      [options.className]: true
    }),
    style: {
      ...options.style
    }
  }, [
    options.key && span({
      className: styles.key,
      style: {
        ...options.styleKey,
        fontWeight: options.reverse ? 'normal' : 'bold'
      }
    }, options.key + ':'),
    span({
      style: {
        ...options.styleValue,
        fontWeight: options.reverse ? 'bold' : 'normal'
      }
    }, options.value)
  ])
