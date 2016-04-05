import { Observable } from 'rx'
import { div, button, a, span } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

const { just } = Observable

import { getPractitioners$ } from 'Remote'

import constants from 'constants.css'
import styles from './Landing.css'

import { MetricsCallout, MetricsCircle } from 'StyleFn'

const _render = ({
  createHref,
  practitioners
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
      div('I am a sidebar'),
    ]),
  ])
}

export default sources => {
  const queue$ = getPractitioners$(sources)
    .startWith('')

  const response$ = queue$
    .map(request => request.url)
    .flatMap(url => {
      return sources.HTTP
        .filter(res$ => res$.request.url === url)
    })
    .mergeAll()
    .map(res => res.body)
    .catch(err => just(err))
    .startWith('')

  const practitioners = response$
    .map(data => data.practitioners)
    .filter(data => !!data)

  const viewState = {
    practitioners
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM,
    queue$
  }
}
