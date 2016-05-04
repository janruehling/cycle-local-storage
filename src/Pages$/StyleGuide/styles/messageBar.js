import { div, a, span } from '@cycle/dom'
import { ErrorMessage, InfoMessage, WarningMessage, SuccessMessage, Message } from 'StyleFn'

import constants from 'constants.css'

const children = [{
  name: '',
  fn: InfoMessage(
    div([
      span('You must login to continue')
    ])
  ),
  style: {
    width: '100%'
  }
}, {
  name: '',
  fn: WarningMessage('This is a warning message - less serious than an error'),
  style: {
    width: '100%'
  }
}, {
  name: '',
  fn: ErrorMessage(
    div([
      span('The data you\'ve entered is incorrect. Have you '),
      a({
        href: '#'
      }, 'forgotten your username or password?')
    ])
  ),
  style: {
    width: '100%'
  }
}, {
  name: '',
  fn: SuccessMessage(
    div([
      span({
        style: {
          fontWeight: 'bold'
        }
      }, 'Success! '),
      span('A confirmation email will be sent to you shortly')
    ])
  ),
  style: {
    width: '100%'
  }
}, {
  name: '',
  fn: Message({
    icon: 'Feedback',
    text: div([
      span({
        style: {
          fontWeight: 'bold'
        }
      }, 'Custom! '),
      span('A custom message to show how this works')
    ]),
    style: {
      background: constants.color3,
      color: '#fff'
    }
  }),
  style: {
    width: '100%'
  }
}]

const messageBar = {
  name: 'Message Bar states',
  children: children,
  style: {
    width: '100%'
  }
}

export default messageBar
