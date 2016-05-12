import { div, img } from '@cycle/dom'
import { Icon } from 'StyleFn'

import constants from 'constants.css'
import styles from './MetricsCalloutV2.css'

const _render = (options) => div({
  className: styles.container
}, [
  options.title
    ? div({
      className: styles.title
    }, options.title)
    : null,
  options.descriptionDOM && div({
    style: {
      fontSize: '14px',
      marginBottom: '10px'
    }
  }, [
    options.descriptionDOM
  ]),
  div({
    className: styles.metricContainer
  }, [
    div({
      className: styles.metric
    }, options.metric),
    options.change && div({
      className: styles.metricChange
    }, [
      Icon({
        icon: 'Up',
        style: {
          fontSize: '11px'
        }
      }),
      div({}, options.change)
    ])
  ]),
  options.metricDescription && div({
    style: {
      color: constants.color4,
      fontSize: '14px',
      fontWeight: 'bold'
    }
  }, options.metricDescription),
  div({
    className: styles.average
  }, options.average)
])

export const MetricsCalloutV2 = (options) => {
  options = options || {}

  return _render(options)
}
