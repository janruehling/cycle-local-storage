import moment from 'moment'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { pathOr } from 'ramda'

import { toTitleCase, getName } from 'zwUtility'
import { DetailsCard } from 'StyleFn'

const _render = ({
  plan
}) => plan ? DetailsCard({
  type: {
    icon: 'Sheet',
    name: 'Plan'
  },
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
      title: 'State',
      items: plan.state ? [{
        text: plan.state + (plan.country ? ', ' + plan.country : '')
      }] : null
    },
    {
      title: 'More Info:',
      items: plan.details_url ? [{
        text: plan.details_url,
        link: plan.details_url
      }] : null
    }
  ]
}) : div()

export const PlanDetailsCard = sources => {
  const viewState = {
    plan: sources.plan
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
