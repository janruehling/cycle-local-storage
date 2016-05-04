import { div } from '@cycle/dom'

import { Icon, KeyValue } from 'StyleFn'

import constants from 'constants.css'
import styles from './QuickFact.css'

export const QuickFact = (options = {}) =>
  div({
    className: styles.container
  }, [
    options.value ? Icon({
      icon: 'TickRound',
      className: styles.icon,
      style: {
        color: constants.color4
      }
    }) : Icon({
      icon: 'CrossRound',
      className: styles.icon,
      style: {
        color: constants.color2
      }
    }),
    KeyValue({
      key: options.key,
      value: options.value ? 'Yes' : 'No',
      styleValue: {
        color: constants.primary3
      }
    })
  ])
