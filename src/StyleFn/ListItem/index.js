import { div } from '@cycle/dom'
import classNames from 'classnames'

import constants from 'constants.css'
import styles from './ListItem.css'

import { Avatar } from 'StyleFn'
import { getName } from 'zwUtility'

export const ListItem = (options = {}) => div({
  className: classNames({
    [styles.container]: true,
    [options.className]: !!options.className
  }),
  attributes: options.attributes
}, [
  div({
    className: styles.column,
    style: {
      alignItems: 'center',
      borderRadius: '5px',
      background: constants.additional1,
      display: 'flex',
      width: '190px'
    }
  }, [
    Avatar({
      image: options.image,
      icon: options.icon,
      size: 24
    }),
    div({
      style: {
        fontWeight: 'bold',
        marginLeft: '10px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, getName(options.entity))
  ]),
  options.children && options.children.map(child => {
    child.properties ? child.properties.className = classNames({
      [child.properties.className]: !!child.properties.className,
      [styles.column]: true
    }) : child.className = styles.column
    return child
  })
])
