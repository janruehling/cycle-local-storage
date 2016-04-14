import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { toTitleCase, getName } from 'zwUtility'

import { GridItem } from 'StyleFn'

import styles from './GridView.css'

const _render = ({
  practitioners
}) => div({
  className: styles.container
}, [
  practitioners.map(practitioner => GridItem({
    className: 'practitioner',
    size: 130,
    style: {
      cursor: 'pointer'
    },
    attributes: {
      'data-id': practitioner.id
    },
    image: practitioner.image,
    icon: practitioner.gender ? toTitleCase(practitioner.gender) : 'Male',
    text: getName(practitioner)
  }))
])

const _navActions = (sources) => sources.DOM.select('.practitioner')
    .events('click')
    .map(ev => '/practitioner/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const route$ = _navActions(sources)

  const viewState = {
    practitioners: sources.practitioners$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM,
    route$
  }
}
