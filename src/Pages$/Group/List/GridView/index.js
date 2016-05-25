import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { pathOr } from 'ramda'

import { toTitleCase } from 'zwUtility'

import { FilterBar } from 'Components$'
import { GridItem } from 'StyleFn'

import constants from 'constants.css'
import styles from './GridView.css'

const _render = ({
  filterBarDOM,
  groups
}) => div({
  style: {
    margin: '0 auto',
    maxWidth: constants.maxWidth
  }
}, [
  filterBarDOM,
  div({
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
])

const _navActions = (sources) => sources.DOM.select('.group')
    .events('click')
    .map(ev => '/group/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const route$ = _navActions(sources)

  const filterBar = FilterBar({
    ...sources,
    props$: Observable.just({
      title: 'FILTER',
      style: {
        margin: '0 auto 15px',
        width: constants.maxWidth
      },
      children: [{
        id: 'all',
        name: 'All',
        isActive: true
      }
      // , {
      //   id: 'advancedFilters',
      //   name: 'Advanced Filters',
      //   isActive: false
      // }
    ]
    })
  })

  const viewState = {
    filterBarDOM: filterBar.DOM,
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
