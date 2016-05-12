import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'
import { pathOr } from 'ramda'

import { toTitleCase, getName, getStaticMap } from 'zwUtility'
import { DetailsCard } from 'StyleFn'

const _render = ({
  location
}) => location ? DetailsCard({
  type: {
    icon: 'Hospital',
    name: 'Location'
  },
  topCallout: (location.last_verified && moment(location.last_verified).isValid())
    ? {
      key: 'Last Verified',
      value: moment(location.last_verified).format('MMM D, Y'),
      tick: true
    } : {
      key: 'Last Verified',
      value: 'Not verified yet'
    },
  title: toTitleCase(getName(location)),
  imageFull: {
    src: getStaticMap({
      latitude: pathOr(null, ['address', 'coordinates', 'latitude'])(location),
      longitude: pathOr(null, ['address', 'coordinates', 'longitude'])(location),
      width: 257,
      height: 181
    })
  },
  lists: location.address ? [
    {
      title: 'Address:',
      items: [
        {
          text: pathOr(null, ['address', 'street_address'])(location)
        },
        {
          text: pathOr('', ['address', 'city'])(location) + ', ' + pathOr('', ['address', 'state'])(location)
        },
        {
          text: pathOr(null, ['address', 'zipcode'])(location)
        }
      ]
    },
    {
      title: 'Geo Coordinates:',
      items: [
        {
          text: pathOr(null, ['address', 'coordinates', 'latitude'])(location)
        },
        {
          text: pathOr(null, ['address', 'coordinates', 'longitude'])(location)
        }
      ]
    }
  ] : []
}) : div()

export const LocationDetailsCard = sources => {
  const viewState = {
    location: sources.location
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
