import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { FilterBar } from 'Components$'
import { getPractitionersRelations$, getGroups$,
  getLocations$, getPlans$ } from 'Remote'

import styles from './Relations.css'

const _createRelations = (relations, groups, locations, plans, first) => {
  let order

  console.log(groups)

  switch (first) {
    case 'plans':
      order = ['plans', 'groups', 'locations']
      break
    default:
      order = ['groups', 'locations', 'plans']
      break
  }

  const out = order.map(column => {
    if (column === first) {
      return relations[column]
    }
    return column
  })

  return out
}

const _render = ({
  filterBarDOM,
  relations
}) => div({
  className: styles.container
}, [
  filterBarDOM
])

export default sources => {
  const plans$ = sources.responses$
    .filter(res => res.request.category === 'getPlans$')
    .map(res => res.body)
    .map(data => data.plans)
    .startWith([])

  const organizations$ = sources.responses$
    .filter(res => res.request.category === 'getGroups$')
    .map(res => res.body)
    .map(data => data.groups)
    .startWith([])

  const locations$ = sources.responses$
    .filter(res => res.request.category === 'getLocations$')
    .map(res => res.body)
    .map(data => data.locations)
    .startWith([])

  const relationsData$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getPractitionersRelations$')
    .map(res => res.body)
    .map(data => data.relations)
    .take(1)
    .startWith({})

  const orderBy$ = sources.DOM
    .select('#orderBy')
    .events('change')
    .map(ev => ev.ownerTarget.value)
    .startWith('groups')

  const relations$ = orderBy$
    .combineLatest(relationsData$, organizations$, locations$, plans$)
    // .map(([order, relations, organizations, locations, plans]) => _createRelations(relations, organizations, locations, plans, order))
    .do(console.log.bind(console))

  const filterBar = FilterBar({
    ...sources,
    props$: Observable.just({
      title: 'ORDER BY:',
      style: {
        margin: '0 auto',
        width: '100%'
      },
      children: [{
        id: 'orderBy',
        type: 'select',
        options: [{
          name: 'Organizations',
          value: 'groups'
        }, {
          name: 'Plans',
          value: 'plans'
        }]
      }]
    })
  })

  const viewState = {
    filterBarDOM: filterBar.DOM,
    relations$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  const HTTP = Observable.merge(
    getPractitionersRelations$(sources),
    getGroups$(sources),
    getLocations$(sources),
    getPlans$(sources)
  )

  return {
    DOM,
    HTTP
  }
}
