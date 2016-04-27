import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'
import classNames from 'classnames'
import { pathOr } from 'ramda'

import { Avatar } from 'StyleFn'
import { toTitleCase } from 'zwUtility'

import constants from 'constants.css'
import styles from './Relations.css'

const { just } = Observable

const _render = ({
  practitioner
}) => div({
  className: styles.container
}, [
  div({
    className: styles.sort
  }, [
    div({
      className: styles.sortTitle
    }, 'ORDER BY:'),
    div({
      className: classNames({
        [styles.sortItem]: true,
        [styles.isActive]: true
      })
    }, 'Organizations'),
    div({
      className: styles.sortItem
    }, 'Locations'),
    div({
      className: styles.sortItem
    }, 'Plans Covered')
  ]),
  div({
    className: styles.columns
  }, [
    div({
      className: styles.column
    }, [
      div({
        className: classNames({
          [styles.columnTitle]: true,
          [styles.isColumnActive]: true
        })
      }, 'Organizations'),
      div([
        pathOr([], ['works_at'])(practitioner)
          .map(relation => relation.group)
          .map(group => div({
            style: {
              alignItems: 'center',
              display: 'flex',
              backgroundColor: constants.additional15,
              borderRadius: '10px',
              padding: '5px'
            }
          }, [
            Avatar({
              image: pathOr(null, ['image', 'url'])(group),
              icon: 'Shield',
              size: 30,
              style: {
                borderRadius: '5px',
                width: '30px',
                height: '30px',
                marginRight: '5px'
              }
            }),
            div({
              style: {
                color: '#fff',
                flex: 1,
                fontSize: '12px',
                textDecoration: 'underline'
              }
            }, toTitleCase(group.name))
          ]))
      ])
    ]),
    div({
      className: styles.column
    }, [
      div({
        className: styles.columnTitle
      }, 'Locations'),
      div([
        pathOr([], ['works_at'])(practitioner)
          .map(relation => relation.location)
          .map(location => div({
            style: {
              display: 'flex'
            }
          }, [
            toTitleCase(location.name)
          ]))
      ])
    ]),
    div({
      className: styles.column
    }, [
      div({
        className: styles.columnTitle
      }, 'Plans Covered'),
      div([
        pathOr([], ['works_at'])(practitioner)
          .map(relation => relation.plan)
          .map(plan => div({
            style: {
              display: 'flex'
            }
          }, [
            Avatar({
              image: pathOr(null, ['image', 'url'])(plan),
              icon: 'Shield',
              size: 30
            }),
            toTitleCase(plan.name)
          ]))
      ])
    ])
  ])
])

export default sources => {
  const viewState = {
    practitioner: sources.practitioner$ || just({})
  }
  const DOM = combineLatestObj(viewState).map(_render)
  return {
    DOM
  }
}
