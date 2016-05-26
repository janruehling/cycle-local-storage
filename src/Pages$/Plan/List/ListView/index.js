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
      }, 'Type'),
      // div({
      //   style: {
      //     width: '95px'
      //   }
      // }, 'IRS EIN'),
      // div({
      //   style: {
      //     width: '120px'
      //   }
      // }, 'Insurance C.'),
      div({
        style: {
          width: '50px'
        }
      }, 'State'),
      div({
        style: {
          width: '95px'
        }
      }, 'Practitioners'),
      div({
        style: {
          width: '95px'
        }
      }, 'Organizations'),
      div({
        style: {
          width: '110px'
        }
      }, 'More Info'),
      div({
        style: {
          width: '110px'
        }
      }, 'Last Verified')
    ]),
    plans && plans.map(plan => ListItem({
      className: 'plan',
      image: pathOr(null, ['image', 'url'])(plan),
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
            width: '85px'
          }
        }, plan.zwmid),
        div({
          style: {
            width: '85px'
          }
        }, plan.type),
        // div({
        //   style: {
        //     width: '85px'
        //   }
        // }, plan.irs_ein),
        // div({
        //   style: {
        //     width: '110px',
        //     ...styleEllipsis
        //   }
        // }, pathOr('', ['owned_by', 'name'])(plan)),
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
    plans: sources.plans$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    route$
  }
}
