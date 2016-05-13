import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName } from 'zwUtility'

import { List, Heading, Calendar } from 'StyleFn'

import styles from './DetailsView.css'
import constants from 'constants.css'

const _render = ({
  plan
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
        title: 'Offered in Locations',
        items: plan && plan.offered_in_locations ? plan.offered_in_locations
          .map(location => ({
            text: toTitleCase(getName(location)),
            link: '/#/location/' + location.id + '/'
          })) : null
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
    plan: sources.plan$ || Observable.just({})
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM
  }
}
