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
        options.icon ? Icon({
          icon: options.icon.text,
          style: options.icon.style
        }) : null
      ]),
      options.metric ? div({
        className: styles.metric,
        style: options.metric.style
      }, options.metric.text) : null,
      options.title ? div({
        className: styles.metricTitle,
        style: options.title.style
      }, options.title.text) : null,
      options.link ? a({
        href: options.link.href,
        className: styles.viewLink
      }, options.link.text) : null
    ])
  ]),
  options.change ? div({
    className: styles.change,
    style: options.change.style
  }, options.change.text) : null
])

export const MetricsCircle = (options = {}) => {
  return _render(options)
}
