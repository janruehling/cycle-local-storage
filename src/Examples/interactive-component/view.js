import { div, button, span } from '@cycle/dom'
import styles from './interactive-component.css'

export default function view (state$) {
  return state$.map(value => div({
    className: styles.container
  }, [
    button({
      className: 'decrement'
    }, 'Decrement'),
    span(' Current value ' + value + ' '),
    button({
      className: 'increment'
    }, 'Increment')
  ])
  )
}
