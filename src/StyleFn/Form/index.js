import { div } from '@cycle/dom'
import classNames from 'classnames'

import constants from 'constants.css'
import styles from './Form.css'

const _getContainerBorder = (message = {}) => {
  let border

  if (!message) {
    return '2px solid transparent'
  }

  switch (message.type) {
    case 'info':
      border = '2px solid ' + constants.color1_5
      break
    case 'warn':
      border = '2px solid ' + constants.additional17
      break
    default:
      border = '2px solid transparent'
      break
  }
  return border
}

const FormContainer = (attr = {}, children) => {
  return div({
    ...attr,
    className: classNames({
      [styles.form]: true,
      [attr.className]: !!attr.className
    }),
    style: {
      border: _getContainerBorder(attr.message)
    }
  }, children)
}

export { FormContainer }
