import { div } from '@cycle/dom'
import classNames from 'classnames'

import { Icon } from 'StyleFn'

import styles from './Avatar.css'

const withImage = (options) => div({
  className: classNames({
    [options.classNameImage]: true,
    [styles.image]: true
  }),
  style: {
    backgroundImage: 'url(' + options.image + ')',
    ...options.style
  }
}, [])

const withoutImage = (options) => {
  return Icon({
    className: styles.icon,
    icon: options.icon || 'Male',
    style: {
      fontSize: options.size ? options.size * 0.86 + 'px' : null,
      alignItems: (options.icon === 'Female' || options.icon === 'Male') ? 'flex-end' : null
    }
  })
}

export const Avatar = (options = {}) => {
  options.style = options.style || {}

  return div({
    className: classNames({
      [options.className]: true,
      [styles.container]: true
    }),
    style: {
      paddingBottom: options.size ? options.size + 'px' : null,
      width: options.size ? options.size + 'px' : null,
      ...options.style
    }
  }, [
    options.image
      ? withImage(options)
      : withoutImage(options)
  ])
}
