import { Observable } from 'rx'
import { pathOr } from 'ramda'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName, getStaticMap } from 'zwUtility'

import { FilterBar } from 'Components$'
import { GridItem } from 'StyleFn'

import constants from 'constants.css'
import styles from './GridView.css'

const _render = ({
  filterBarDOM,
  locations
}) => div([
  filterBarDOM,
  div({
    style: {
      margin: '0 auto',
      maxWidth: constants.maxWidth
    }
  }, [
    div({
      className: styles.container
    }, [
      locations && locations.map(location => GridItem({
        className: 'location',
        size: 130,
        style: {
          cursor: 'pointer'
        },
        attributes: {
          'data-id': location.id
        },
        image: getStaticMap({
          latitude: pathOr(null, ['address', 'coordinates', 'latitude'])(location),
          longitude: pathOr(null, ['address', 'coordinates', 'longitude'])(location)
        }) || null,
        icon: 'Hospital',
        text: toTitleCase(getName(location))
      }))
    ])
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
