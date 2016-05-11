import R from 'ramda'
import { div } from '@cycle/dom'
import classNames from 'classnames'

import constants from 'constants.css'
import styles from './Form.css'

const _getContainerBorder = (message = {}) => {
  let border

  switch (message.type) {
    case 'info':
      border = '2px solid ' + constants.color1_5
      break
    case 'warn':
      border = '2px solid ' + constants.color2
      break
    case 'success':
      border = '2px solid ' + constants.color4
      break
    case 'error':
      border = '2px solid ' + constants.color2
      break
    default:
      border = '2px solid transparent'
      break
  }
  return border
}

const FormContainer = (attr = {}, children) => {
  const type = R.pathOr(null, ['message', 'properties', 'type'])(attr)
  return div({
    ...attr,
    className: classNames({
      [styles.form]: true,
      [attr.className]: !!attr.className
    }),
    style: {
      ...attr.style,
      border: _getContainerBorder({
        type: type
      })
    }
  }, children)
}

export { FormContainer }
