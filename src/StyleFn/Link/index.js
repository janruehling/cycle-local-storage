import { a } from '@cycle/dom'

import styles from './Link.css'

export const Link = (options = {}, children) => {
  const out = a({
    className: styles.link,
    style: options.style,
    id: options.id,
    attributes: {
      href: options.href
    }
  }, (children && typeof children.map === 'function')
    ? children.map(child => child)
    : children
)
  return out
}
