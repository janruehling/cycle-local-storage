import { div } from '@cycle/dom'
import classNames from 'classnames'

import { Icon } from 'StyleFn'

import constants from 'constants.css'
import styles from './Avatar.css'

const withImage = (options) => div({
  className: classNames({
    [options.classNameImage]: !!options.classNameImage,
    [styles.image]: true
  }),
  style: {
    backgroundImage: 'url(' + options.image + ')',
    ...options.styleImage
  }
}, [])

const withoutImage = (options) => {
  options.icon = options.icon || 'Male'
  return Icon({
    className: styles.icon,
    icon: options.icon,
    style: {
      fontSize: options.size ? options.size * 0.86 + 'px' : null,
      alignItems: (options.icon === 'Female' || options.icon === 'Male') ? 'flex-end' : null
    }
  })
}

export const Avatar = (options = {}) => {
  options.style = options.style || {}

  return div({
    id: options.id,
    className: classNames({
      [options.className]: !!options.className,
      [styles.container]: true,
      avatarHoverTarget: true
    }),
    style: {
      height: options.size ? options.size + 'px' : '32px',
      width: options.size ? options.size + 'px' : '32px',
      ...options.style
    }
  }, [
    (options.isEditable && options.isHover) ? div({
      className: styles.hoverContainer + ' hoverContainer'
    }, [
      div({
        className: 'removeButton',
        style: {
          background: constants.color2,
          borderRadius: '3px',
          cursor: 'pointer',
          padding: '3px',
          marginRight: '5px'
        }
      }, [
        Icon({
          icon: 'Remove',
          style: {
            color: '#fff',
            fontSize: '12px'
          }
        })
      ]),
      div({
        className: 'addButton',
        style: {
          background: constants.color4,
          borderRadius: '3px',
          cursor: 'pointer',
          padding: '3px'
        }
      }, [
        Icon({
          icon: 'Plus',
          style: {
            color: '#fff',
            fontSize: '12px'
          }
        })
      ])
    ]) : div(),
    options.image
      ? withImage(options)
      : withoutImage(options)
  ])
}
