import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { pathOr } from 'ramda'

import { getIcon } from 'zwUtility'

import { FilterBar } from 'Components$'
import { ListItem } from 'StyleFn'

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
          width: '200px'
        }
      }, 'Name'),
      div({
        style: {
          width: '95px'
        }
      }, 'ZWMID'),
      div({
        style: {
          width: '95px'
        }
      }, 'NPI'),
      div({
        style: {
          width: '95px'
        }
      }, 'PAC ID'),
      div({
        style: {
          width: '95px'
        }
      }, 'Tax #'),
      div({
        style: {
          width: '95px'
        }
      }, 'Type'),
      div({
        style: {
          width: '95px'
        }
      }, 'MedicAid Cert.'),
      div({
        style: {
          width: '95px'
        }
      }, 'Legal Struc.'),
      div({
        style: {
          width: '210px'
        }
      }, 'Legal Name'),
      div({
        style: {
          width: '110px'
        }
      }, 'Last Verified')
    ]),
    groups && groups.map(group => ListItem({
      className: 'group',
      image: pathOr(null, ['image', 'url'])(group),
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
    DOM,
    route$
  }
}
