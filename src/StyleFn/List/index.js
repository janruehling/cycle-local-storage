import { div, img, span, a } from '@cycle/dom'

import { Avatar, Heading } from 'StyleFn'

import styles from './List.css'

export const List = (options = {}) => {
  return div({
    className: styles.container
  }, [
    options.title && Heading({
      icon: options.icon,
      text: options.title
    }),
    (options.items && options.items.length)
      ? options.items.map(item => div({
        className: styles.item
      }, [
        item.image && img({
          src: item.image
        }),
        item.avatar && Avatar({
          image: item.avatar.image,
          icon: item.avatar.icon,
          size: '30px'
        }),
        item.text && (item.link
          ? a({
            href: item.link,
            className: styles.itemLink
          }, item.text)
          : span({
            className: styles.itemText
          }, item.text)
        )
      ])) : null
  ])
}
