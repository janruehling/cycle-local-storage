import { div, img } from '@cycle/dom'
import { Icon } from 'StyleFn'

import styles from './MetricsCallout.css'

const _render = (options) => div({
  className: styles.container
}, [
  options.title
    ? div({
      className: styles.title
    }, options.title)
    : null,
  div({
    className: styles.metricContainer
  }, [
    div({
      className: styles.metric
    }, options.metric),
    div({
      className: styles.metricChange
    }, [
      Icon({
        icon: 'Back',
        style: {
          fontSize: '11px'
        }
      }),
      div({}, options.change)
    ])
  ]),
  options.descriptionDOM,
  div({
    className: styles.average
  }, options.average)
])

export const MetricsCallout = (options) => {
  options = options || {}

  return _render(options)
}
