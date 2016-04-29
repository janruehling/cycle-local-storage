import { Observable } from 'rx'
import { div, span } from '@cycle/dom'
import constants from 'constants.css'

export const InfoMessage = message => Observable.just({
  text: div([
    span(message)
  ]),
  icon: 'Info',
  type: 'info',
  styles: {
    background: constants.additional16,
    color: constants.primary1
  }
})

export const ErrorMessage = message => Observable.just({
  text: div([
    span(message)
  ]),
  icon: 'Warn',
  type: 'warn',
  styles: {
    background: constants.additional17,
    color: '#fff'
  }
})
