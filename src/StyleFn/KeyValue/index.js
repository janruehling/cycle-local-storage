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
      className: classNames({
        [styles.key]: true,
        [options.classNameKey]: true
      }),
      style: {
        ...options.styleKey,
        fontWeight: options.reverse ? 'normal' : 'bold'
      }
    }, options.key + ':'),
    span({
      className: classNames({
        [styles.value]: true,
        [options.classNameValue]: true
      }),
      style: {
        ...options.styleValue,
        fontWeight: options.reverse ? 'bold' : 'normal'
      }
    }, options.value)
  ])
