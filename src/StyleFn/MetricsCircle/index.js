import { div, a } from '@cycle/dom'
import { Icon } from 'StyleFn'

import styles from './MetricsCircle.css'

const _render = (options) => div({
  className: styles.container,
  style: {
    width: options.size || '195px'
  }
}, [
  div({
    className: styles.squareSpacer
  }, [
    div({
      className: styles.metricContainer
    }, [
      div({
        className: styles.metricIcon
      }, [
        options.icon && Icon({
          icon: options.icon.text,
          style: options.icon.style
        })
      ]),
      options.metric && div({
        className: styles.metric,
        style: options.metric.style
      }, options.metric.text),
      options.title && div({
        className: styles.metricTitle,
        style: options.title.style
      }, options.title.text),
      a({
        href: '#',
        className: styles.viewLink
      }, 'view all')
    ])
  ]),
  options.change && div({
    className: styles.change,
    style: options.change.style
  }, options.change.text)
])

export const MetricsCircle = (options) => {
  options = options || {}

  return _render(options)
}
