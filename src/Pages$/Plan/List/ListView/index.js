import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import R from 'ramda'
import Ru from '@panosoft/ramda-utils'

import { getIcon } from 'zwUtility'

import { FilterBar } from 'Components$'
import { TableHeading, TableRow } from 'StyleFn'

import intent from './intent'

import constants from 'constants.css'
import styles from './ListView.css'

const _render = ({
  filterBarDOM,
  plans
}) => div([
  filterBarDOM,
  div({
    className: styles.container
  }, [
    div({
      className: styles.tableHeader
    }, [
      div({
        style: {
          width: '46px'
        }
      }),
      TableHeading('110px', 'Name', 'name', 'sortTarget'),
      TableHeading('95px', 'ZWMID', 'zwmid&name', 'sortTarget'),
      TableHeading('95px', 'Type', 'type&name', 'sortTarget'),
      TableHeading('50px', 'State', 'state&name', 'sortTarget'),
      TableHeading('95px', 'Practitioners', 'accepted_by_practitioners&name', 'sortTarget'),
      TableHeading('95px', 'Organizations', 'accepted_by_groups&name', 'sortTarget'),
      TableHeading('110px', 'More Info', 'details_url&name', 'sortTarget'),
      TableHeading('110px', 'Last Verified', 'last_verified&name', 'sortTarget')
    ]),
    plans && plans.map(plan => TableRow({
      className: 'plan',
      image: R.pathOr(null, ['image', 'url'])(plan),
      icon: getIcon(plan, 'plan'),
      entity: plan,
      style: {
        cursor: 'pointer'
      },
      attributes: {
        'data-id': plan.id
      },
      children: [
        div({
          style: {
            width: '100px'
          }
        }, plan.name),
        div({
          style: {
            width: '85px'
          }
        }, plan.zwmid),
        div({
          style: {
            width: '85px'
          }
        }, plan.type),
        div({
          style: {
            width: '40px'
          }
        }, plan.state),
        div({
          style: {
            width: '85px'
          }
        }, plan.accepted_by_practitioners),
        div({
          style: {
            width: '85px'
          }
        }, plan.accepted_by_groups),
        div({
          style: {
            width: '100px'
          }
        }, plan.details_url),
        div({
          style: {
            width: '100px'
          }
        }, plan.last_verified || 'Not verified yet')
      ]
    }))
  ])
])

const _navActions = (sources) => sources.DOM.select('.plan')
    .events('click')
    .map(ev => '/plan/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const actions = intent(sources)
  const route$ = _navActions(sources)

  const currentSortOrder$ = actions.sortTargetClicks$
    .startWith('name')
    .scan((prev, curr) => {
      if (curr === prev) return '-' + curr
      return curr
    })

  const sortedPlans$ = currentSortOrder$
    .combineLatest(sources.plans$)
    .map(([sortOrder, plans]) => {
      const props = sortOrder.split('&')
      const comparator = Ru.compareProps(props)
      const sortedList = R.sort(comparator)(plans)
      return sortedList
    })

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
    plans: sortedPlans$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
