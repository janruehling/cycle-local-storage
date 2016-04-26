import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import R from 'ramda'

import { List, Heading, Calendar } from 'StyleFn'

import { toTitleCase, getName, getIcon } from 'zwUtility'

import styles from './DetailsView.css'
import constants from 'constants.css'

const _render = ({
  location,
  practitioners
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
            avatar: {
              image: R.pathOr(null, ['image', 'url'])(group),
              icon: 'Shield'
            },
            link: '/#/group/' + location.id + '/'
          })) : []
      }),
      List({
        icon: 'Contact',
        title: 'Practitioners',
        items: practitioners
          ? practitioners.map(practitioner => ({
            avatar: {
              image: R.pathOr(null, ['image', 'url'])(practitioner),
              icon: getIcon(practitioner, 'practitioner')
            },
            text: toTitleCase(getName(practitioner)),
            link: '/#/practitioner/' + practitioner.id + '/'
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
        icon: 'Photo',
        text: 'Verified Photos'
      }),
      div({
        style: {
          color: constants.primary1,
          fontSize: '14px'
        }
      }, 'No Photos yet')
    ])
  ])
])

export default sources => {
  const viewState = {
    location: sources.location$,
    practitioners: sources.practitioners$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM
  }
}
