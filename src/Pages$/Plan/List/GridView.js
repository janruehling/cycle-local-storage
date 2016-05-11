import { Observable } from 'rx'
import { div, a } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { FilterBar } from 'Components$'
import { HighlightBox } from 'StyleFn'

import styles from './GridView.css'

const _render = ({
  filterBar,
  plans
}) => div({
  className: styles.container
}, [
  filterBar,
  div({
    className: styles.grid
  }, [
    plans.map(plan => HighlightBox({
      style: {
        marginRight: '20px',
        height: '125px',
        width: '132px'
      },
      id: plan.id,
      title: plan.name,
      count: (plan.practitioners || plan.groups) ? ['practitioners', 'groups'].map(entity => {
        const isPractitioner = entity === 'practitioners'
        const name = isPractitioner ? 'Practitioner' : 'Organizations'
        const count = plan[entity]

        return count ? a({
          href: isPractitioner ? '/#/practitioners?filter=plan_' + plan.id : '/#/groups?filter=plan_' + plan.id
        }, count + ' ' + name) : null
      }) : null
    }))
  ])
  // plans.map(plan => GridItem({
  //   className: 'plan',
  //   size: 130,
  //   style: {
  //     cursor: 'pointer'
  //   },
  //   attributes: {
  //     'data-id': plan.id
  //   },
  //   image: pathOr(null, ['image', 'url'])(plan),
  //   icon: 'Shield',
  //   text: toTitleCase(plan.name)
  // }))
])

const _navActions = (sources) => sources.DOM.select('.HighlightBox_title_hook')
    .events('click')
    .map(ev => '/plan/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const route$ = _navActions(sources)

  const filterBar = FilterBar({
    ...sources,
    props$: Observable.just({
      title: 'FILTER',
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
    filterBar: filterBar.DOM,
    plans: sources.plans$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
