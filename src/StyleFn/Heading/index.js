import { div } from '@cycle/dom'
import classNames from 'classnames'

import { Icon } from 'StyleFn'

import constants from 'constants.css'
import styles from './Heading.css'

export const Heading = (options = {}) =>
  div({
    className: classNames({
      [options.className]: !!options.className,
      [styles.container]: true
    }),
    style: {
      ...options.style
    }
  }, [
    options.icon && Icon({
      icon: options.icon,
      className: classNames({
        [options.classNameIcon]: !!options.classNameIcon,
        [styles.icon]: true
      }),
      style: {
        ...options.styleIcon
      }
    }),
    options.text && div({
      className: classNames({
        [options.classNameText]: !!options.classNameText,
        [styles.text]: true
      }),
      style: {
        ...options.styleText
      }
    }, options.text)
  ])
