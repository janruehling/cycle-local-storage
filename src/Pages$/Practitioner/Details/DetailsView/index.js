import R from 'ramda'
import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName, byMatch } from 'zwUtility'
import { getPractitionersId$, getPractitionersLocations$,
  getPractitionersOrganizations$, getPractitionersPlans$ } from 'Remote'

import { List, Heading, Calendar } from 'StyleFn'

import styles from './DetailsView.css'
import constants from 'constants.css'

const _render = ({
  practitioner,
  locations,
  organizations,
  plans
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
        div({
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
        icon: 'Contact',
        text: 'Biography'
      }),
      div(practitioner.biography)
    ])
  ])
])

export default sources => {
  const practitioner$ = sources.responses$
    .filter(byMatch('/practitioners'))
    .map(res => res.body)
    .map(data => data.practitioner)
    .startWith({})

  const organizations$ = sources.responses$
    .filter(byMatch('/groups'))
    .map(res => res.body)
    .map(data => data.groups)
    .startWith([])

  const locations$ = sources.responses$
    .filter(byMatch('/locations'))
    .map(res => res.body)
    .map(data => data.locations)
    .startWith([])

  const plans$ = sources.responses$
    .filter(byMatch('/plans'))
    .map(res => res.body)
    .map(data => data.plans)
    .startWith([])

  const viewState = {
    practitioner: practitioner$,
    locations: locations$,
    organizations: organizations$,
    plans: plans$
  }

  const HTTP = Observable.from([
    getPractitionersId$(sources),
    getPractitionersPlans$(sources),
    getPractitionersLocations$(sources),
    getPractitionersOrganizations$(sources)
  ])
  .mergeAll()

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    HTTP,
    DOM
  }
}
