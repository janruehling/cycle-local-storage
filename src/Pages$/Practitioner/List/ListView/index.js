import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import R from 'ramda'
import Ru from '@panosoft/ramda-utils'

import { getIcon, toTitleCase, getLanguage } from 'zwUtility'

import { FilterBar } from 'Components$'
import { TableRow, TableHeading } from 'StyleFn'

import constants from 'constants.css'

import intent from './intent'
import styles from './ListView.css'

const styleEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}

const _render = ({
  filterBarDOM,
  practitioners
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
      TableHeading('95px', 'First Name', 'first_name&last_name', 'sortTarget'),
      TableHeading('95px', 'Last Name', 'last_name&first_name', 'sortTarget'),
      TableHeading('95px', 'Phone', 'phone&first_name&last_name', 'sortTarget'),
      TableHeading('150px', 'Email', 'email&first_name&last_name', 'sortTarget'),
      TableHeading('95px', 'ZWMID', 'zwmid&first_name&last_name', 'sortTarget'),
      TableHeading('95px', 'NPI', 'npi&first_name&last_name', 'sortTarget'),
      TableHeading('95px', 'DEA', 'dea_number&first_name&last_name', 'sortTarget'),
      TableHeading('120px', 'Languages', 'languages&first_name&last_name', 'sortTarget'),
      TableHeading('160px', 'Residencies', 'residencies&first_name&last_name', 'sortTarget'),
      TableHeading('195px', 'Specialties', 'specialties&first_name&last_name', 'sortTarget')
    ]),
    practitioners && practitioners.map(practitioner => TableRow({
      className: 'practitioner',
      image: R.pathOr(null, ['image', 'url'])(practitioner),
      icon: getIcon(practitioner, 'practitioner'),
      entity: practitioner,
      style: {
        cursor: 'pointer'
      },
      attributes: {
        'data-id': practitioner.id
      },
      children: [
        div({
          style: {
            width: '85px'
          }
        }, practitioner.first_name),
        div({
          style: {
            width: '85px'
          }
        }, practitioner.last_name),
        div({
          style: {
            width: '85px'
          }
        }, practitioner.phone),
        div({
          style: {
            width: '140px',
            ...styleEllipsis
          }
        }, practitioner.email),
        div({
          style: {
            width: '85px'
          }
        }, practitioner.zwmid),
        div({
          style: {
            width: '85px'
          }
        }, practitioner.npi),
        div({
          style: {
            width: '85px'
          }
        }, practitioner.dea_number),
        div({
          style: {
            width: '110px',
            ...styleEllipsis
          }
        },
        practitioner.languages
          ? practitioner.languages.map(getLanguage).join(', ')
          : []
        ),
        ((residencies) => {
          residencies = residencies || []
          const residencyString = residencies.map(residency => toTitleCase(residency)).join(', ')

          return div({
            style: {
              width: '150px',
              ...styleEllipsis
            },
            title: residencyString
          },
            [residencyString]
          )
        })(practitioner.residencies),
        div({
          style: {
            width: '185px',
            ...styleEllipsis
          }
        },
        practitioner.specialties
          ? practitioner.specialties
              .map(specialty => toTitleCase(specialty) + ', ')
          : []
        )
      ]
    }))
  ])
])

const _navActions = (sources) => sources.DOM.select('.practitioner')
    .events('click')
    .map(ev => '/practitioner/' + ev.ownerTarget.dataset.id + '/')

export default sources => {
  const actions = intent(sources)
  const route$ = _navActions(sources)

  const currentSortOrder$ = actions.sortTargetClicks$
    .startWith('first_name&last_name')
    .scan((prev, curr) => {
      if (curr === prev) return '-' + curr
      return curr
    })

  const sortedPractitioners$ = currentSortOrder$
    .combineLatest(sources.practitioners$)
    .map(([sortOrder, practitioners]) => {
      const props = sortOrder.split('&')
      const comparator = Ru.compareProps(props)
      const sortedList = R.sort(comparator)(practitioners)
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
    practitioners: sortedPractitioners$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
