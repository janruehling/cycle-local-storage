import { Observable } from 'rx'
import { div, img, span } from '@cycle/dom'

import styles from './DataQuality.css'
import up from 'assets/img/icons/back.svg'

let view = function (sources) {
  let view$ = Observable.of(
    div({
      className: styles.container
    }, [
      div({
        className: styles.title
      }, 'Data Quality'),
      div({
        className: styles.percentages
      }, [
        div({
          className: styles.mainPercent
        }, '87%'),
        div({
          className: styles.changePercent
        }, [
          img({
            src: up
          }),
          span('2%')
        ])
      ]),
      div({
        className: styles.pushBottom
      }, [
        span({
          className: styles.increase
        }, '27% increase '),
        span('since joining Zipwire')
      ]),
      div({
        className: styles.average
      }, 'National Average: 52%'),
      div({
        className: styles.historic
      }, 'View historic data scores')
    ])
  )

  return {
    DOM: view$
  }
}

export default view
