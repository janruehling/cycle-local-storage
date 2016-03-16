import { p } from '@cycle/dom'
import { Observable } from 'rx'
import styles from './static-component.css'

export default function StaticComponent (sources) {
  const sinks = {
    DOM: Observable.just(
      p({
        className: styles.p
      }, 'Static content.')
    )
  }
  return sinks
}
