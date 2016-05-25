import { Observable } from 'rx'
import { div, textarea } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import R from 'ramda'

import { ActivityStream, List, Heading, Calendar } from 'StyleFn'

import { toTitleCase, getName, getIcon, getActivity } from 'zwUtility'

import styles from './DetailsView.css'
import constants from 'constants.css'

const _render = ({
  location,
  practitioners,
  groups,
  plans,
  activities
}) => div({
  className: styles.container
}, [
  div({
    className: styles.columns
  }, [
    div({
      className: styles.firstColumn
    }, [
      List({
        icon: 'Shield',
        title: 'Organizations',
        items: groups && groups
          .map(group => ({
            text: toTitleCase(getName(group)),
            avatar: {
              image: R.pathOr(null, ['image', 'url'])(group),
              icon: 'Shield'
            },
            link: '/#/group/' + location.id + '/'
          }))
      }),
      List({
        icon: 'Contact',
        title: 'Practitioners',
        items: practitioners && practitioners.map(practitioner => ({
          avatar: {
            image: R.pathOr(null, ['image', 'url'])(practitioner),
            icon: getIcon(practitioner, 'practitioner')
          },
          text: toTitleCase(getName(practitioner)),
          link: '/#/practitioner/' + practitioner.id + '/'
        }))
      }),
      List({
        icon: 'Sheet',
        title: 'Plans',
        items: plans && plans.map(plan => ({
          text: toTitleCase(getName(plan)),
          link: '/#/plan/' + plan.id + '/'
        }))
      })
    ]),
    div({
      className: styles.secondColumn
    }, [
      Heading({
        icon: 'Calendar',
        text: 'Activity'
      }),
      div({
        className: styles.activity
      }, [
        Calendar(),
        activities && activities.length > 0
          ? ActivityStream({
            title: 'Activity Feed',
            items: R.compose(R.map(getActivity), R.reverse, R.sortBy(activity => {
              return activity.timestamp
            }), R.take(5))(activities)
          })
          : div({
            style: {
              color: constants.primary1,
              fontSize: '14px',
              marginTop: '20px'
            }
          }, 'No Activities yet')
      ])
    ]),
    div({
      className: styles.thirdColumn
    }, [
      location.description && div([
        Heading({
          icon: 'Sheet',
          text: 'Description'
        }),
        textarea({
          attributes: {
            readonly: true
          },
          className: styles.description
        }, location.description)
      ]),
      R.isEmpty(location.images)
        ? div([
          Heading({
            icon: 'Photo',
            text: 'Verified Photos'
          }),
          div({
            style: {
              color: constants.primary1,
              fontSize: '14px'
            }
          }, 'No Photos yet')
        ])
        : div([
          Heading({
            icon: 'Photo',
            text: 'Verified Photos'
          }),
          div({
            style: {
              color: constants.primary1,
              fontSize: '14px'
            }
          }, 'No Photos yet')
        ])
    ])
  ])
])

export default sources => {
  const viewState = {
    location$: sources.location$ || Observable.just({}),
    practitioners$: sources.practitioners$ || Observable.just([]),
    groups$: sources.groups$ || Observable.just([]),
    plans$: sources.plans$ || Observable.just([]),
    activities$: sources.activities$ || Observable.just([])
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM
  }
}
