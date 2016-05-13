import R from 'ramda'
import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName, getActivity } from 'zwUtility'

import { ActivityStream, List, Heading, Calendar } from 'StyleFn'

import styles from './DetailsView.css'

const _render = ({
  practitioner,
  locations,
  organizations,
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
        items: locations
          .map(location => ({
            text: toTitleCase(getName(location)),
            link: '/#/location/' + location.id + '/'
          }))
      }),
      List({
        icon: 'Shield',
        title: 'Organizations',
        items: organizations
          .map(group => ({
            text: toTitleCase(getName(group)),
            avatar: {
              image: R.pathOr(null, ['image', 'url'])(group),
              icon: 'Shield'
            },
            link: '/#/group/' + group.id + '/'
          }))
      }),
      List({
        icon: 'Sheet',
        title: 'Plans Covered',
        items: plans
          .map(plan => ({
            text: toTitleCase(getName(plan))
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
        ActivityStream({
          title: 'Activity Feed',
          items: R.compose(R.map(getActivity), R.reverse, R.sortBy(activity => {
            return activity.timestamp
          }), R.take(5))(activities)
        })
      ])
    ]),
    div({
      className: styles.thirdColumn
    }, [
      Heading({
        icon: 'Contact',
        text: 'Biography'
      }),
      div(practitioner.biography)
    ])
  ])
])

export default sources => {
  const activityClicks$ = sources.DOM.select('.ActivityStream_item_hook')
    .events('click')
    .map(ev => '/' + ev.ownerTarget.dataset.type + '/' + ev.ownerTarget.dataset.id + '/')

  const viewState = {
    locations: sources.locations$,
    organizations: sources.organizations$,
    plans: sources.plans$,
    practitioner: sources.practitioner$ || Observable.just({}),
    activities: sources.activities$ || Observable.just([])
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const route$ = Observable.merge(
    activityClicks$
  )

  return {
    DOM,
    route$
  }
}
