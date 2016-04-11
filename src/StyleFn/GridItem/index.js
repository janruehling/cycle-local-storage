import { div } from '@cycle/dom'
import classNames from 'classnames'

import styles from './GridItem.css'

import { Avatar } from 'StyleFn'

export const GridItem = (options = {}) => div({
  className: classNames({
    [styles.container]: true,
    [options.className]: !!options.className
  }),
  style: options.style,
  attributes: options.attributes
}, [
  Avatar({
    image: options.image,
    gender: options.gender,
    style: {
      fontSize: options.fontSize || '113px',
      width: options.width || '132px'
    },
    className: styles.image
  }),
  div({
    className: styles.banner
  }, [
    div(options.first_name),
    div(options.last_name),
  ])
])
