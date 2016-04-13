import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { List, Heading } from 'StyleFn'

import { toTitleCase, getName } from 'zwUtility'

import styles from './DetailsView.css'

const _render = ({
  location
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
        items: location.belongs_to_groups ? location.belongs_to_groups
          .map(group => ({
            text: toTitleCase(getName(group)),
            link: '/#/group/' + location.id
          })) : []
      }),
      List({
        icon: 'Contact',
        title: 'Practitioners',
        items: location.practitioners
          ? location.practitioners.map(practitioner => ({
            text: toTitleCase(getName(practitioner)),
            link: '/#/practitioner/' + practitioner.id
          }))
          : []
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
      div(location.description)
    ])
  ])
])

export default sources => {
  const viewState = {
    location: sources.location$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
