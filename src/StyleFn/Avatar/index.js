import { div, img } from '@cycle/dom'
import { Icon } from 'StyleFn'

import styles from './Avatar.css'

const withImage = (options) => div({
  className: styles.avatarImage,
  style: {
    backgroundImage: 'url(' + options.image + ')',
    ...options.style
  }
}, [])

const withoutImage = (options) => {
  const iconName = options.gender === 'female' ? 'AvatarFemale' : 'AvatarMale'
  const avatar = Icon({
    icon: iconName,
    style: options.style
  })
  return div({
    className: styles.avatarContainer
  }, [
    avatar
  ])
}

export const Avatar = (options) => {
  options = options || {}
  options.gender = options.gender || 'male'
  options.style = options.style || {}

  return options.image
    ? withImage(options)
    : withoutImage(options)
}
