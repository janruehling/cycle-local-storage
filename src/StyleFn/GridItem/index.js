import { div, a } from '@cycle/dom'
import classNames from 'classnames'

import { truncateString } from 'zwUtility'

import styles from './GridItem.css'

import { Avatar } from 'StyleFn'

export const GridItem = (options = {}) => {
  const mainAttributes = {
    className: classNames({
      [styles.container]: true,
      [options.className]: !!options.className
    }),
    style: {
      width: options.size ? options.size + 'px' : '130px',
      ...options.style
    },
    attributes: options.attributes
  }

  if (options.href) mainAttributes.href = options.href
  if (options.target) mainAttributes.target = options.target

  return a(mainAttributes, [
    Avatar({
      className: styles.image,
      image: options.image,
      icon: options.icon,
      size: options.size
    }),
    div({
      className: styles.banner,
      attributes: {
        title: options.text
      }
    }, [
      div(truncateString(options.text, 25))
    ])
  ])
}
