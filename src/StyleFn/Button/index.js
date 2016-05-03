import { div, button, img } from '@cycle/dom'
import { Icon } from 'StyleFn'

import spinner from 'assets/img/Zipwire-spin.svg'
import styles from './Button.css'

const _getClassName = (attributes = {}) => {
  let state, skin

  switch (attributes.state) {
    case 'hover':
      state = styles.isHover
      break
    case 'active':
      state = styles.isActive
      break
    case 'busy':
      state = styles.isBusy
      break
    default:
      state = ''
      break
  }

  switch (attributes.skin) {
    case 'narrow':
      skin = styles.narrow
      break
    default:
      skin = styles.default
      break
  }

  return styles.container + ' ' + skin + ' ' + state
}

export const Button = (attributes = {}) => {
  const isBusy = attributes.state === 'busy'

  const out = button({
    className: _getClassName(attributes),
    style: {
      backgroundColor: attributes.background || 'gray',
      ...attributes.style
    },
    id: attributes.id
  }, [
    isBusy ? div({
      className: styles.spinnerContainer
    }, [
      img({
        className: styles.spinner,
        src: spinner
      })
    ]) : null,
    attributes.icon ? Icon({
      icon: attributes.icon,
      style: {
        marginRight: attributes.text ? '5px' : null
      }
    }) : null,
    div(attributes.text)
  ])

  return out
}
