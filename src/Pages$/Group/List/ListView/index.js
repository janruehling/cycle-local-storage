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

const styleEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const _render = ({
  filterBarDOM,
  groups
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
      TableHeading('95px', 'NPI', 'npi&name', 'sortTarget'),
      TableHeading('95px', 'PAC ID', 'pac_id&name', 'sortTarget'),
      TableHeading('95px', 'Tax #', 'tax_number&name', 'sortTarget'),
      TableHeading('95px', 'Type', 'type&name', 'sortTarget'),
      TableHeading('95px', 'MedicAid Cert.', 'medicaid_certified&name', 'sortTarget'),
      TableHeading('95px', 'Legal Struc.', 'legal_structure&name', 'sortTarget'),
      TableHeading('210px', 'Legal Name', 'legal_name&name', 'sortTarget'),
      TableHeading('110px', 'Last Verified', 'last_verified&name', 'sortTarget')
    ]),
    groups && groups.map(group => TableRow({
      className: 'group',
      image: R.pathOr(null, ['image', 'url'])(group),
      icon: getIcon(group, 'group'),
      entity: group,
      style: {
        cursor: 'pointer'
      },
      attributes: {
        'data-id': group.id
      },
      children: [
        div({
          style: {
            width: '100px'
          }
        }, group.name),
        div({
          style: {
            width: '85px'
          }
        }, group.zwmid),
        div({
          style: {
            width: '85px'
          }
        }, group.npi),
        div({
          style: {
            width: '85px'
          }
        }, group.practice_pac_id),
        div({
          style: {
            width: '85px'
          }
        }, group.tax_number),
        div({
          style: {
            width: '85px'
          }
        }, group.type),
        div({
          style: {
            width: '85px'
          }
        }, group.medicaid_certified ? 'Yes' : 'No'),
        div({
          style: {
            width: '85px'
          }
        }, group.legal_structure),
        div({
          style: {
            width: '200px',
            ...styleEllipsis
          }
        }, group.legal_name),
        div({
          style: {
            width: '100px'
          }
        }, group.last_verified || 'Not verified yet')
      ]
    }))
  ])
])

const _navActions = (sources) => sources.DOM.select('.group')
    .events('click')
    .map(ev => '/group/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const actions = intent(sources)
  const route$ = _navActions(sources)

  const currentSortOrder$ = actions.sortTargetClicks$
    .startWith('name')
    .scan((prev, curr) => {
      if (curr === prev) return '-' + curr
      return curr
    })

  const sortedGroups$ = currentSortOrder$
    .combineLatest(sources.groups$)
    .map(([sortOrder, groups]) => {
      const props = sortOrder.split('&')
      const comparator = Ru.compareProps(props)
      const sortedList = R.sort(comparator)(groups)
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
    groups: sortedGroups$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
