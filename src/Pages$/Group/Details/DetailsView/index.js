import R from 'ramda'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName, getActivity, getIcon } from 'zwUtility'

import { ActivityStream, List, Heading, Calendar } from 'StyleFn'

import styles from './DetailsView.css'
import constants from 'constants.css'

const _render = ({
  group,
  locations,
  practitioners,
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
        icon: 'Hospital',
        title: 'Locations',
        items: locations && locations
          .map(location => ({
            text: toTitleCase(getName(location)),
            link: '/#/location/' + location.id + '/'
          }))
      }),
      List({
        icon: 'Contact',
        title: 'Practitioners',
        items: practitioners && practitioners
          .map(practitioner => ({
            text: toTitleCase(getName(practitioner)),
            avatar: {
              image: R.pathOr(null, ['image', 'url'])(practitioner),
              icon: getIcon(practitioner, 'practitioner')
            },
            link: '/#/practitioner/' + practitioner.id + '/'
          }))
      }),
      List({
        icon: 'Sheet',
        title: 'Plans',
        items: plans && plans
          .map(plan => ({
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
    group && div({
      className: styles.thirdColumn
    }, [
      Heading({
        icon: 'Sheet',
        text: 'Description'
      }),
      div(group.description)
    ])
  ])
])

export default sources => {
  const viewState = {
    locations: sources.locations$,
    practitioners: sources.practitioners$,
    plans: sources.plans$,
    group$: sources.group$,
    activities$: sources.activities$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
