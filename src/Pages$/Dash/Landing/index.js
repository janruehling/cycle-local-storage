import { div, span } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import constants from 'constants.css'
import styles from './Landing.css'

import { MetricsCallout, MetricsCircle, Heading } from 'StyleFn'

const _render = ({
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
            text: '12'
          },
          title: {
            text: 'Practitioners'
          },
          link: {
            text: 'view all',
            className: 'link',
            href: '/#/practitioners/'
          },
          change: {
            style: {
              backgroundColor: constants.secondary2
            },
            text: '+3 this week'
          }
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Hospital'
          },
          metric: {
            text: '10'
          },
          title: {
            text: 'Locations'
          },
          link: {
            text: 'view all',
            href: '/#/locations/'
          },
          change: {
            style: {
              backgroundColor: constants.secondary2
            },
            text: '+1 this week'
          }
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Shield'
          },
          metric: {
            text: '3'
          },
          title: {
            text: 'Organizations'
          },
          link: {
            text: 'view all',
            href: '/#/groups/'
          },
          change: {
            text: '+/- 0 this week'
          }
        }),
        MetricsCircle({
          size: '195px',
          icon: {
            text: 'Sheet'
          },
          metric: {
            text: '22'
          },
          title: {
            text: 'Plans'
          },
          change: {
            style: {
              backgroundColor: constants.secondary3
            },
            text: '-4 this week'
          }
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
    config: sources.config$
  }

  const viewLinkClicks$ = sources.DOM
    .select('.link')
    .events('click')
    .map(ev => ev.ownerTarget.dataset.link)
    .do(console.log.bind(console))

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM,
    route$: viewLinkClicks$
  }
}
