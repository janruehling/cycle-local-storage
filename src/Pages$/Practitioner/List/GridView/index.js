import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { pathOr } from 'ramda'

import { getIcon, getName } from 'zwUtility'

import { FilterBar } from 'Components$'
import { GridItem } from 'StyleFn'

import constants from 'constants.css'
import styles from './GridView.css'

const _render = ({
  filterBarDOM,
  practitioners
}) => div([
  filterBarDOM,
  div({
    style: {
      margin: '0 auto',
      maxWidth: constants.maxWidth
    }
  }, [
    div({
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
        image: pathOr(null, ['image', 'url'])(practitioner),
        icon: getIcon(practitioner, 'practitioner'),
        text: getName(practitioner)
      }))
    ])
  ])
])

const _navActions = (sources) => sources.DOM.select('.practitioner')
    .events('click')
    .map(ev => '/practitioner/' + ev.ownerTarget.dataset.id + '/')

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
    practitioners: sources.practitioners$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
