import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { pathOr } from 'ramda'

import { toTitleCase } from 'zwUtility'

import { GridItem } from 'StyleFn'

import styles from './GridView.css'

const _render = ({
  plans
}) => div({
  className: styles.container
}, [
  plans.map(plan => GridItem({
    className: 'plan',
    size: 130,
    style: {
      cursor: 'pointer'
    },
    attributes: {
      'data-id': plan.id
    },
    image: pathOr(null, ['image', 'url'])(plan),
    icon: 'Shield',
    text: toTitleCase(plan.name)
  }))
])

const _navActions = (sources) => sources.DOM.select('.plan')
    .events('click')
    .map(ev => '/plan/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const route$ = _navActions(sources)

  const viewState = {
    plans: sources.plans$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
