import { div } from '@cycle/dom'
import classNames from 'classnames'

import styles from './GridItem.css'

import { Avatar } from 'StyleFn'

export const GridItem = (options = {}) => div({
  className: classNames({
    [styles.container]: true,
    [options.className]: !!options.className
  }),
  style: {
    width: options.size ? options.size + 'px' : '130px',
    ...options.style
  },
  attributes: options.attributes
}, [
  Avatar({
    className: styles.image,
    image: options.image,
    icon: options.icon,
    size: options.size
  }),
  div({
    className: styles.banner
  }, [
    div(options.text)
  ])
])
