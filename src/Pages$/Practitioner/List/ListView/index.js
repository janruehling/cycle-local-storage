import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import R from 'ramda'
import Ru from '@panosoft/ramda-utils'

import { getIcon, toTitleCase, getLanguage } from 'zwUtility'

import { FilterBar } from 'Components$'
import { ListItem, Icon } from 'StyleFn'

import constants from 'constants.css'

import intent from './intent'
import styles from './ListView.css'

const _heading = (width, title, sortBy) => div({
  className: sortBy ? 'sortTarget' : null,
  style: {
    alignItems: 'center',
    cursor: sortBy ? 'pointer' : null,
    display: 'flex',
    width: width
  },
  attributes: {
    'data-sortby': sortBy || null
  }
}, [
  div({
    style: {
      whiteSpace: 'nowrap'
    }
  }, title),
  sortBy && Icon({
    icon: 'Sort',
    style: {
      color: constants.color1_3,
      fontSize: '10px',
      margin: '0 5px'
    }
  })
])

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
      _heading('95px', 'First Name', 'first_name&last_name'),
      _heading('95px', 'Last Name', 'last_name&first_name'),
      _heading('95px', 'Phone', 'phone&first_name&last_name'),
      _heading('150px', 'Email', 'email&first_name&last_name'),
      _heading('95px', 'ZWMID', 'zwmid&first_name&last_name'),
      _heading('95px', 'NPI', 'npi&first_name&last_name'),
      _heading('95px', 'DEA', 'dea_number&first_name&last_name'),
      _heading('120px', 'Languages', 'languages&first_name&last_name'),
      _heading('160px', 'Residencies', 'residencies&first_name&last_name'),
      _heading('195px', 'Specialties', 'specialties&first_name&last_name')
    ]),
    practitioners && practitioners.map(practitioner => ListItem({
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
