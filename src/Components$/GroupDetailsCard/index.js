import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { pathOr } from 'ramda'

import classNames from 'classnames'

import { toTitleCase, getName } from 'zwUtility'
import { DetailsCard, Icon } from 'StyleFn'

import helpers from 'helpers.css'

const _render = ({
  group
}) => group ? DetailsCard({
  type: {
    icon: 'Shield',
    name: 'Organization'
  },
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
  subTitle: group.type,
  image: {
    src: pathOr(null, ['image', 'url'])(group),
    icon: 'Hospital'
  },
  meta: [
    {
      key: 'ZWMID',
      value: group.zwmid
    },
    {
      key: 'NPI',
      value: group.npi
    },
    {
      key: 'Tax #',
      value: group.tax_number
    },
    {
      key: 'PAC ID',
      value: group.practice_pac_id
    }
  ],
  lists: [
    {
      title: 'Legal Name:',
      items: group.legal_name ? [{
        text: group.legal_name
      }] : null
    },
    {
      title: 'Legal Structure:',
      items: group.legal_structure ? [{
        text: group.legal_structure
      }] : null
    },
    {
      title: 'Contact:',
      items: group.contact ? [
        {
          text: getName(group.contact)
        },
        {
          children: group.contact.email
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
              div(group.contact.email)
            ])
            : null
        },
        {
          children: group.contact.phone
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
              div(group.contact.phone)
            ])
            : null
        }
      ] : null
    }
  ],
  quickFacts: [
    {
      key: 'Medicaid Certified',
      value: group.medicaid_certified
    }
  ]
}) : div()

export const GroupDetailsCard = sources => {
  const viewState = {
    group: sources.group
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
