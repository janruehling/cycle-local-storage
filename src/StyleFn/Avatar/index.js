import { div, img } from '@cycle/dom'
import classNames from 'classnames'

import { Icon } from 'StyleFn'

import styles from './Avatar.css'

const withImage = (options) => div({
  className: styles.container
}, [
    div({
      className: classNames({
        [options.classNameImage]: true,
        [styles.image]: true
      }),
      style: {
        backgroundImage: 'url(' + options.image + ')',
        ...options.style
      }
    }, [])
  ])

const withoutImage = (options) => {
  return div({
    className: classNames({
      [options.className]: true,
      [styles.container]: true
    }),
    style: options.style
  }, [
    Icon({
      icon: options.icon || 'Male'
    })
  ])
}

export const Avatar = (options = {}) => {
  options.gender = options.gender || 'Male'
  options.style = options.style || {}

  return options.image
    ? withImage(options)
    : withoutImage(options)
}
