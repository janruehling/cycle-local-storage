import { div } from '@cycle/dom'
import styles from './GridItem.css'

import { Avatar } from 'StyleFn'

export const GridItem = (options = {}) => div({
  className: styles.container
}, [
  Avatar({
    image: options.image,
    gender: options.gender,
    style: {
      fontSize: '113px'
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
