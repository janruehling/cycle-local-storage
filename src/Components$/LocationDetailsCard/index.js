import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { toTitleCase, getName } from 'zwUtility'
import { DetailsCard } from 'StyleFn'

const _render = ({
  location
}) => location ? DetailsCard({
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
  image: {
    src: location.image,
    icon: 'Hospital'
  },
  lists: location.address ? [
    {
      title: 'Address:',
      items: [{
        text: location.address.street_address
      }]
    }
  ] : []
}) : div()

export const LocationDetailsCard = sources => {
  const viewState = {
    location: sources.location
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM
  }
}
