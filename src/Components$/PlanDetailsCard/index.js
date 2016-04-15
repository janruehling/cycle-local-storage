import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { pathOr } from 'ramda'

import classNames from 'classnames'

import { toTitleCase, getName } from 'zwUtility'
import { DetailsCard, Icon } from 'StyleFn'

import helpers from 'helpers.css'

const _render = ({
  plan
}) => plan ? DetailsCard({
  topCallout: (plan.last_verified && moment(plan.last_verified).isValid())
    ? {
      key: 'Last Verified',
      value: moment(plan.last_verified).format('MMM D, Y'),
      tick: true
    } : {
      key: 'Last Verified',
      value: 'Not verified yet'
    },
  title: toTitleCase(getName(plan)),
  image: {
    src: pathOr(null, ['image', 'url'])(plan),
    icon: 'Shield'
  },
  meta: [
    {
      key: 'ZWMID',
      value: plan.zwmid
    },
    {
      key: 'NPI',
      value: plan.npi
    }
  ],
  lists: [
    {
      title: 'Type:',
      items: plan.type ? [{
        text: plan.type
      }] : null
    },
    {
      title: 'Legal Structure:',
      items: plan.legal_structure ? [{
        text: plan.legal_structure
      }] : null
    },
    {
      title: 'Contact:',
      items: plan.contact ? [
        {
          text: getName(plan.contact)
        },
        {
          children: plan.contact.email
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
              div(plan.contact.email)
            ])
            : null
        },
        {
          children: plan.contact.phone
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
              div(plan.contact.phone)
            ])
            : null
        }
      ] : null
    }
  ]
}) : div()

export const PlanDetailsCard = sources => {
  const viewState = {
    plan: sources.plan
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM
  }
}
