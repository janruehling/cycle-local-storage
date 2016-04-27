import { div } from '@cycle/dom'
import { map, addIndex } from 'ramda'
import classNames from 'classnames'

const mapIndexed = addIndex(map)

import { Icon } from 'StyleFn'

import styles from './Calendar.css'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const _render = ({
  data
}) => div({
  className: styles.container
}, [
  div({
    className: styles.header
  }, [
    Icon({
      icon: 'Back',
      style: {
        cursor: 'pointer'
      }
    }),
    div({
      style: {
        flex: 1
      }
    }, data.year),
    Icon({
      icon: 'Forward',
      style: {
        cursor: 'pointer'
      }
    })
  ]),
  div({
    className: styles.content
  }, [
    mapIndexed((month, index) => {
      return div({
        className: classNames({
          [styles.item]: true,
          [styles.isActive]: data.month === month
        })
      }, month)
    })(months)
  ])
])

export const Calendar = (attributes) => {
  const attr = {
    data: {
      year: attributes.year || '2016',
      month: attributes.month || 'April'
    }
  }

  return _render(attr)
}
