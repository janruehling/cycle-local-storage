import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'
import { pathOr } from 'ramda'
import classNames from 'classnames'

import { toTitleCase, getName, getStaticMap } from 'zwUtility'
import { DetailsCard, Icon } from 'StyleFn'

import helpers from 'helpers.css'

const _render = ({
  location
}) => location ? DetailsCard({
  type: {
    icon: 'Hospital',
    name: 'Location'
  },
  subTitle: location.type || null,
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
  lists: [
    {
      title: 'Contact:',
      items: (location.email || location.phone) ? [
        {
          children: location.email
            ? div({
              className: classNames({
                [helpers.layout]: true,
                [helpers.center]: true
              })
            }, [
              Icon({
                icon: 'Envelope',
                style: {
                  fontSize: '12px',
                  marginRight: '10px'
                }
              }),
              div(location.email)
            ])
            : null
        },
        {
          children: location.phone
            ? div({
              className: classNames({
                [helpers.layout]: true,
                [helpers.center]: true
              })
            }, [
              Icon({
                icon: 'Phone',
                style: {
                  fontSize: '12px',
                  marginRight: '10px'
                }
              }),
              div(location.phone)
            ])
            : null
        }
      ] : null
    },
    {
      title: 'Address:',
      items: location.address ? [
        {
          text: pathOr(null, ['address', 'street_address'])(location)
        },
        {
          text: pathOr('', ['address', 'city'])(location) + ', ' + pathOr('', ['address', 'state'])(location)
        },
        {
          text: pathOr(null, ['address', 'zipcode'])(location)
        }
      ] : null
    },
    {
      title: 'Geo Coordinates:',
      items: (
        pathOr(null, ['address', 'coordinates', 'latitude'])(location) ||
        pathOr(null, ['address', 'coordinates', 'longitude'])(location)
      ) ? [
        {
          text: pathOr(null, ['address', 'coordinates', 'latitude'])(location)
        },
        {
          text: pathOr(null, ['address', 'coordinates', 'longitude'])(location)
        }
      ] : null
    }
  ],
  workingHours: location.hours ? {
    title: 'Working Hours',
    times: location.hours
  } : null,
  quickFacts: [
    {
      key: 'Emergency Room',
      value: location.emergency_room
    }
  ]
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
