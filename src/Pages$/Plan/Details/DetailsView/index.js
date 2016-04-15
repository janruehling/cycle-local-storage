import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName } from 'zwUtility'

import { List, Heading } from 'StyleFn'

import styles from './DetailsView.css'

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
        items: plan.offered_in_locations ? plan.offered_in_locations
          .map(location => ({
            text: toTitleCase(getName(location)),
            link: '/#/location/' + location.id + '/'
          })) : null
      }),
      List({
        icon: 'Shield',
        title: 'Owned By',
        items: plan.owned_by ? [plan.owned_by]
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
      })
    ]),
    div({
      className: styles.thirdColumn
    }, [
      Heading({
        icon: 'Photo',
        text: 'Verified Photos'
      }),
      div(plan.description)
    ])
  ])
])

export default sources => {
  const viewState = {
    plan: sources.plan$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
