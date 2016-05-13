import { pathOr } from 'ramda'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName, getStaticMap } from 'zwUtility'

import { GridItem } from 'StyleFn'

import styles from './GridView.css'

const _render = ({
  locations
}) => div({
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

const _navActions = (sources) => sources.DOM.select('.location')
    .events('click')
    .map(ev => '/location/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const route$ = _navActions(sources)

  const viewState = {
    locations: sources.locations$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
