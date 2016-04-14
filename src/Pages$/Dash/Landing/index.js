import { div, span } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { pathOr } from 'ramda'

import constants from 'constants.css'
import styles from './Landing.css'

import { MetricsCallout, MetricsCircle, Heading } from 'StyleFn'

const _getChangeObject = (changeString) => {
  const number = Number(changeString)

  if (Number.isNaN(number)) return null

  if (number > 0) {
    return {
      style: {
        backgroundColor: constants.secondary2
      },
      text: '+' + changeString + ' this week'
    }
  } else if (number < null) {
    return {
      style: {
        backgroundColor: constants.secondary3
      },
      text: '-' + changeString + ' this week'
    }
  } else {
    return {
      text: '+/- 0 this week'
    }
  }
}

const _render = ({
  stats,
  config
}) => {
  return div({
    className: styles.container
  }, [
    div({
      className: styles.sidebar
    }, [
      MetricsCallout({
        title: 'Data Quality',
        metric: '97%',
        change: '2%',
        descriptionDOM: div([
          span({style: {color: 'green'}}, '116.227 '),
          span({style: {color: '#fff'}}, 'records verified and updated in the last 30 days')
        ]),
        average: 'Industry Average: 52%'
      }),
      Heading({
        text: 'Activity Feed'
      })
    ]),
    div({
      className: styles.main
    }, [
      div({
        className: styles.mainTitle
      }, 'Your company at a glance'),
      div({
        className: styles.mainMetricsCircles
      }, [
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Contact'
          },
          metric: {
            text: pathOr('0', ['practitioners', 'total'])(stats)
          },
          title: {
            text: 'Practitioners'
          },
          link: {
            text: 'view all',
            className: 'link',
            href: '/#/practitioners/'
          },
          change: _getChangeObject(pathOr(null, ['practitioners', 'last_week'])(stats))
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Hospital'
          },
          metric: {
            text: pathOr('0', ['locations', 'total'])(stats)
          },
          title: {
            text: 'Locations'
          },
          link: {
            text: 'view all',
            href: '/#/locations/'
          },
          change: _getChangeObject(pathOr(null, ['locations', 'last_week'])(stats))
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Shield'
          },
          metric: {
            text: pathOr('0', ['groups', 'total'])(stats)
          },
          title: {
            text: 'Organizations'
          },
          link: {
            text: 'view all',
            href: '/#/groups/'
          },
          change: _getChangeObject(pathOr(null, ['groups', 'last_week'])(stats))
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Sheet'
          },
          metric: {
            text: pathOr('0', ['plans', 'total'])(stats)
          },
          title: {
            text: 'Plans'
          },
          change: _getChangeObject(pathOr(null, ['plans', 'last_week'])(stats))
        })
      ])
    ]),
    div({
      className: styles.sidebar
    }, [
      Heading({
        text: 'Recent Searches'
      }),
      Heading({
        text: 'Top Plans'
      })
    ])
  ])
}

export default sources => {
  const viewState = {
    stats: sources.stats$,
    config: sources.config$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
