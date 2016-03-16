import { Observable } from 'rx'
import { div } from '@cycle/dom'
import { map, addIndex } from 'ramda'
import classNames from 'classnames'

const mapIndexed = addIndex(map)

import styles from './Calendar.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export default function view (sources) {
  const vtree$ = Observable.just(
    div({
      className: styles.container
    }, [
      div({
        className: styles.header
      }, '2016'),
      div({
        className: styles.content
      }, [
        mapIndexed((month, index) => {
          return div({
            className: classNames({
              [styles.item]: true,
              [styles.isActive]: index === 1
            })
          }, month)
        })(months)
      ])
    ])
  )

  const sinks = {
    DOM: vtree$
  }

  return sinks
}
