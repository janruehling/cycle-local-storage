import { div } from '@cycle/dom'
import classNames from 'classnames'

import constants from 'constants.css'
import styles from './TableRow.css'

import { Avatar } from 'StyleFn'

export const TableRow = (options = {}) => div([
  div({
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
        borderRadius: '4px',
        background: constants.color1_6,
        display: 'flex',
        width: '34px'
      }
    }, [
      Avatar({
        image: options.image,
        icon: options.icon,
        size: 24
      })
      // div({
      //   style: {
      //     fontWeight: 'bold',
      //     marginLeft: '10px',
      //     overflow: 'hidden',
      //     textOverflow: 'ellipsis',
      //     whiteSpace: 'nowrap'
      //   },
      //   title: getName(options.entity)
      // }, getName(options.entity))
    ]),
    options.children && options.children.map(child => {
      child.properties ? child.properties.className = classNames({
        [child.properties.className]: !!child.properties.className,
        [styles.column]: true
      }) : child.className = styles.column
      return child
    })
  ]),
  div({
    style: {
      background: constants.color1_6,
      height: '1px',
      width: '100%'
    }
  })
])
