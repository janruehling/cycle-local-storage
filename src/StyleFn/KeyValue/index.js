import { div, span } from '@cycle/dom'
import styles from './KeyValue.css'
import classNames from 'classnames'

export const KeyValue = (options = {}) =>
  options.value && div({
    className: classNames({
      [styles.container]: true,
      [options.className]: !!options.className
    }),
    style: {
      ...options.style
    }
  }, [
    options.key && span({
      className: classNames({
        [styles.key]: true,
        [options.classNameKey]: !!options.classNameKey
      }),
      style: {
        fontWeight: options.reverse ? 'normal' : 'bold',
        ...options.styleKey
      }
    }, options.key + ':'),
    span({
      className: classNames({
        [styles.value]: true,
        [options.classNameValue]: !!options.classNameValue
      }),
      style: {
        fontWeight: options.reverse ? 'bold' : 'normal',
        ...options.styleValue
      }
    }, options.value)
  ])
