import { div, img } from '@cycle/dom'
import classNames from 'classnames'

import { Icon } from 'StyleFn'

import styles from './Avatar.css'

const withImage = (options) => div({
  className: classNames({
    [options.className]: true,
    [styles.avatarImage]: true
  }),
  style: {
    backgroundImage: 'url(' + options.image + ')',
    ...options.style
  }
}, [])

const withoutImage = (options) => {
  const iconName = options.gender === 'Female' ? 'AvatarFemale' : 'AvatarMale'
  return div({
    className: classNames({
      [options.className]: true,
      [styles.avatarContainer]: true
    }),
    style: options.style
  }, [
    Icon({
      icon: iconName
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
