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
        icon: 'Shield',
        title: 'Organizations',
        items: group.belongs_to_groups ? group.belongs_to_groups
          .map(group => ({
            text: toTitleCase(getName(group)),
            link: '/#/group/' + group.id
          })) : []
      }),
      List({
        icon: 'Contact',
        title: 'Practitioners',
        items: []
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
