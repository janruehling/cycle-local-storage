import { div } from '@cycle/dom'

import { Icon, KeyValue } from 'StyleFn'

import constants from 'constants.css'
import styles from './QuickFact.css'

export const QuickFact = (options = {}) =>
  div({
    className: styles.container
  }, [
    options.value ? Icon({
      icon: 'Tick',
      className: styles.icon,
      style: {
        backgroundColor: constants.secondary2
      }
    }) : Icon({
      icon: 'Tick',
      className: styles.icon,
      style: {
        backgroundColor: constants.secondary3
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
