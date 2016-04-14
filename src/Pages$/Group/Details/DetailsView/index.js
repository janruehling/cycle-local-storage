import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName } from 'zwUtility'

import { List, Heading } from 'StyleFn'

import styles from './DetailsView.css'

const _render = ({
  group
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
        title: 'Has Locations',
        items: group.has_locations ? group.has_locations
          .map(location => ({
            text: toTitleCase(getName(location)),
            link: '/#/location/' + location.id + '/'
          })) : null
      }),
      List({
        icon: 'Shield',
        title: 'Owns Groups',
        items: group.owns_groups ? group.owns_groups
          .map(group => ({
            text: toTitleCase(getName(group)),
            link: '/#/group/' + group.id + '/'
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
      div(group.description)
    ])
  ])
])

export default sources => {
  const viewState = {
    group: sources.group$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
