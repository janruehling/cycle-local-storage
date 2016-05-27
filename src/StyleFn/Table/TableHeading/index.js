import { div } from '@cycle/dom'
import { Icon } from 'StyleFn'
import constants from 'constants.css'

export const TableHeading = (width, title, sortBy) => div({
  className: sortBy ? 'sortTarget' : null,
  style: {
    alignItems: 'center',
    cursor: sortBy ? 'pointer' : null,
    display: 'flex',
    width: width
  },
  attributes: {
    'data-sortby': sortBy || null
  }
}, [
  div({
    style: {
      whiteSpace: 'nowrap'
    }
  }, title),
  sortBy && Icon({
    icon: 'Sort',
    style: {
      color: constants.color1_3,
      fontSize: '10px',
      margin: '0 5px'
    }
  })
])
