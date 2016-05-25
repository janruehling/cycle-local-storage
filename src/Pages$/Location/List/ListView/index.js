import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { pathOr } from 'ramda'

import { getIcon } from 'zwUtility'

import { FilterBar } from 'Components$'
import { ListItem } from 'StyleFn'

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
          width: '200px'
        }
      }, 'Name'),
      div({
        style: {
          width: '95px'
        }
      }, 'ZWMID'),
      div({
        style: {
          width: '130px'
        }
      }, 'Type'),
      div({
        style: {
          width: '130px'
        }
      }, 'Phone'),
      div({
        style: {
          width: '210px'
        }
      }, 'Address'),
      div({
        style: {
          width: '70px'
        }
      }, 'City'),
      div({
        style: {
          width: '70px'
        }
      }, 'ZIP'),
      div({
        style: {
          width: '70px'
        }
      }, 'State'),
      div({
        style: {
          width: '80px'
        }
      }, 'Emergency R.')
    ]),
    locations && locations.map(location => ListItem({
      className: 'location',
      image: pathOr(null, ['image', 'url'])(location),
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
        }, pathOr('', ['address', 'street_address'])(location)),
        div({
          style: {
            width: '60px',
            ...styleEllipsis
          }
        }, pathOr('', ['address', 'city'])(location)),
        div({
          style: {
            width: '60px',
            ...styleEllipsis
          }
        }, pathOr('', ['address', 'zipcode'])(location)),
        div({
          style: {
            width: '60px',
            ...styleEllipsis
          }
        }, pathOr('', ['address', 'state'])(location)),
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
  const route$ = _navActions(sources)

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
    locations: sources.locations$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
