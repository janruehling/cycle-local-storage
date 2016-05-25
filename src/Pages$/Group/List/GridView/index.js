import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { pathOr } from 'ramda'

import { toTitleCase } from 'zwUtility'

import { GridItem } from 'StyleFn'

import styles from './GridView.css'

const _render = ({
  groups
}) => div({
  className: styles.container
}, [
  groups && groups.map(group => GridItem({
    className: 'group',
    size: 130,
    style: {
      cursor: 'pointer'
    },
    attributes: {
      'data-id': group.id
    },
    image: pathOr(null, ['image', 'url'])(group),
    icon: 'Shield',
    text: toTitleCase(group.name)
  }))
])

const _navActions = (sources) => sources.DOM.select('.group')
    .events('click')
    .map(ev => '/group/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const route$ = _navActions(sources)

  const viewState = {
    groups: sources.groups$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    ...sources,
    DOM,
    route$
  }
}
