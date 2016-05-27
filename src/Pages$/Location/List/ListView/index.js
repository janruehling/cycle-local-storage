import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import R from 'ramda'
import Ru from '@panosoft/ramda-utils'

import { getIcon } from 'zwUtility'

import { FilterBar } from 'Components$'
import { TableHeading, TableRow } from 'StyleFn'

import intent from './intent'

import constants from 'constants.css'
import styles from './ListView.css'

const styleEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const _render = ({
  filterBarDOM,
  locations
}) => div([
  filterBarDOM,
  div({
    className: styles.container
  }, [
    div({
      className: styles.tableHeader
    }, [
      div({
        style: {
          width: '46px'
        }
      }),
      TableHeading('110px', 'Name', 'name', 'sortTarget'),
      TableHeading('95px', 'ZWMID', 'zwmid&name', 'sortTarget'),
      TableHeading('130px', 'Type', 'type&name', 'sortTarget'),
      TableHeading('130px', 'Phone', 'phone&name', 'sortTarget'),
      TableHeading('210px', 'Address', 'address.street_address&name', 'sortTarget'),
      TableHeading('70px', 'City', 'address.city&name', 'sortTarget'),
      TableHeading('70px', 'Zip', 'address.zipcode&name', 'sortTarget'),
      TableHeading('70px', 'State', 'address.state&name', 'sortTarget'),
      TableHeading('80px', 'Emergency R.', 'emergency_room&name', 'sortTarget')
    ]),
    locations && locations.map(location => TableRow({
      className: 'location',
      image: R.pathOr(null, ['image', 'url'])(location),
      icon: getIcon(location, 'location'),
      entity: location,
      style: {
        cursor: 'pointer'
      },
      attributes: {
        'data-id': location.id
      },
      children: [
        div({
          style: {
            width: '100px'
          }
        }, location.name),
        div({
          style: {
            width: '85px'
          }
        }, location.zwmid),
        div({
          style: {
            width: '120px',
            ...styleEllipsis
          }
        }, location.type),
        div({
          style: {
            width: '120px',
            ...styleEllipsis
          }
        }, location.phone),
        div({
          style: {
            width: '200px',
            ...styleEllipsis
          }
        }, R.pathOr('', ['address', 'street_address'])(location)),
        div({
          style: {
            width: '60px',
            ...styleEllipsis
          }
        }, R.pathOr('', ['address', 'city'])(location)),
        div({
          style: {
            width: '60px',
            ...styleEllipsis
          }
        }, R.pathOr('', ['address', 'zipcode'])(location)),
        div({
          style: {
            width: '60px',
            ...styleEllipsis
          }
        }, R.pathOr('', ['address', 'state'])(location)),
        div({
          style: {
            width: '70px',
            ...styleEllipsis
          }
        }, location.emergency_room ? 'Yes' : 'No')
      ]
    }))
  ])
])

const _navActions = (sources) => sources.DOM.select('.location')
    .events('click')
    .map(ev => '/location/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const actions = intent(sources)
  const route$ = _navActions(sources)

  const currentSortOrder$ = actions.sortTargetClicks$
    .startWith('name')
    .scan((prev, curr) => {
      if (curr === prev) return '-' + curr
      return curr
    })

  const sortedLocations$ = currentSortOrder$
    .combineLatest(sources.locations$)
    .map(([sortOrder, locations]) => {
      const props = sortOrder.split('&')
      const comparator = Ru.compareProps(props)
      const sortedList = R.sort(comparator)(locations)
      return sortedList
    })

  const filterBar = FilterBar({
    ...sources,
    props$: Observable.just({
      title: 'FILTER',
      style: {
        margin: '0 auto 15px',
        width: constants.maxWidth
      },
      children: [{
        id: 'all',
        name: 'All',
        isActive: true
      }
      // , {
      //   id: 'advancedFilters',
      //   name: 'Advanced Filters',
      //   isActive: false
      // }
    ]
    })
  })

  const viewState = {
    filterBarDOM: filterBar.DOM,
    locations: sortedLocations$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
