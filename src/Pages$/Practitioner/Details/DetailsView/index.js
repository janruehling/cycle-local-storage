import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName } from 'zwUtility'

import { List, Heading } from 'StyleFn'

import styles from './DetailsView.css'

const _render = ({
  practitioner
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
        items: practitioner.works_at ? practitioner.works_at
          .map(relation => {
            return relation.location
          })
          .map(location => ({
            text: toTitleCase(getName(location)),
            link: '/#/location/' + location.id + '/'
          })) : null
      }),
      List({
        icon: 'Shield',
        title: 'Organizations',
        items: practitioner.works_at ? practitioner.works_at
          .map(relation => {
            return relation.group
          })
          .map(group => ({
            text: toTitleCase(getName(group)),
            avatar: {
              image: group.image,
              icon: 'Shield'
            },
            link: '/#/group/' + group.id + '/'
          })) : null
      }),
      List({
        icon: 'Sheet',
        title: 'Plans Covered',
        items: practitioner.works_at ? practitioner.works_at
          .map(relation => {
            return relation.plan
          })
          .map(plan => ({
            text: toTitleCase(getName(plan))
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
        icon: 'Contact',
        text: 'Biography'
      }),
      div(practitioner.biography)
    ])
  ])
])

export default sources => {
  const viewState = {
    practitioner: sources.practitioner$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
