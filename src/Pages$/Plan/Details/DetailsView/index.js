import R from 'ramda'
import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName, getActivity } from 'zwUtility'

import { ActivityStream, List, Heading, Calendar } from 'StyleFn'

import styles from './DetailsView.css'
import constants from 'constants.css'

const _render = ({
  plan,
  locations,
  groups,
  practitioners,
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
        icon: 'Hospital',
        title: 'Locations',
        items: locations && locations
          .map(location => ({
            text: toTitleCase(getName(location)),
            link: '/#/location/' + location.id + '/'
          }))
      }),
      List({
        icon: 'Shield',
        title: 'Organizations',
        items: groups && groups
          .map(group => ({
            text: toTitleCase(getName(group)),
            link: '/#/group/' + group.id + '/'
          }))
      }),
      List({
        icon: 'Contact',
        title: 'Practitioners',
        items: practitioners && practitioners
          .map(practitioner => ({
            text: toTitleCase(getName(practitioner)),
            link: '/#/practitioner/' + practitioner.id + '/'
          }))
      }),
      List({
        icon: 'Shield',
        title: 'Owned By',
        items: plan && plan.owned_by ? [plan.owned_by]
          .map(company => ({
            text: toTitleCase(getName(company))
          })) : null
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
      Heading({
        icon: 'Sheet',
        text: 'Descripion'
      }),
      plan && div({
        style: {
          color: constants.primary1,
          fontSize: '14px'
        }
      }, plan.description || 'No Description yet')
    ])
  ])
])

export default sources => {
  const viewState = {
    plan: sources.plan$ || Observable.just({}),
    locations: sources.locations$ || Observable.just([]),
    groups: sources.groups$ || Observable.just([]),
    practitioners: sources.practitioner$ || Observable.just([]),
    activities: sources.activities$ || Observable.just([])
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM
  }
}
