import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { toTitleCase, getName } from 'zwUtility'
import { DetailsCard } from 'StyleFn'

const _render = ({
  group
}) => group ? DetailsCard({
  topCallout: (group.last_verified && moment(group.last_verified).isValid())
    ? {
      key: 'Last Verified',
      value: moment(group.last_verified).format('MMM D, Y'),
      tick: true
    } : {
      key: 'Last Verified',
      value: 'Not verified yet'
    },
  title: toTitleCase(getName(group)),
  image: {
    src: group.image ? group.image : null,
    icon: 'Hospital'
  },
  lists: group.address ? [
    {
      title: 'Address:',
      items: [{
        text: group.address.street_address
      }]
    }
  ] : []
}) : div()

export const GroupDetailsCard = sources => {
  const viewState = {
    group: sources.group
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM
  }
}
