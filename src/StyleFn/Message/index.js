import { div } from '@cycle/dom'
import { Icon } from 'StyleFn'

import constants from 'constants.css'
import styles from './Message.css'

const Message = ({
  text,
  icon,
  style,
  iconStyle,
  textStyle,
  type
}) => text
  ? div({
    type: type,
    className: styles.messageContainer,
    style: {
      ...style
    }
  }, [
    icon ? Icon({
      icon: icon,
      style: {
        marginRight: '5px',
        fontSize: '17px',
        color: 'inherit',
        ...iconStyle
      }
    }) : null,
    div({
      className: styles.messageText,
      styles: {
        ...textStyle
      }
    }, text)
  ])
  : null

const InfoMessage = message => Message({
  text: message,
  icon: 'Info',
  type: 'info',
  style: {
    background: constants.color1_5,
    color: constants.color1
  }
})

const WarningMessage = message => Message({
  text: message,
  icon: 'Warn',
  type: 'warn',
  style: {
    background: constants.color1_5,
    color: constants.color2
  }
})

const SuccessMessage = message => Message({
  text: message,
  icon: 'Tick',
  type: 'success',
  style: {
    background: constants.color4,
    color: '#fff'
  }
})

const ErrorMessage = message => Message({
  text: message,
  icon: 'Warn',
  type: 'error',
  style: {
    background: constants.color2,
    color: '#fff'
  }
})

export { InfoMessage, WarningMessage, SuccessMessage, ErrorMessage, Message }
