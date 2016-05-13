import R from 'ramda'
import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import { FilterBar } from 'Components$'
import { getPractitionersRelations$ } from 'Remote'
import { Avatar } from 'StyleFn'
import { getName } from 'zwUtility'

import constants from 'constants.css'
import styles from './Relations.css'

const _getIcon = (entity) => {
  let out

  switch (entity.type) {
    case 'group':
      out = 'Shield'
      break
    case 'plan':
      out = 'Sheet'
      break
    case 'location':
      out = 'Hospital'
      break
    case 'practitioner':
      out = 'Contact'
      break
    default:
      out = null
      break
  }
  return out ? Avatar({
    icon: out,
    image: entity.image,
    size: '18',
    style: {
      borderRadius: '4px',
      marginRight: '10px'
    }
  }) : null
}

const _createRelationsBox = (entity, idx, list, options = {}) => {
  if (entity.type === 'plan') {
    entity = R.merge(entity.insurance_company, {
      hoverData: [{
        id: entity.id,
        name: entity.name,
        type: 'plan'
      }]
    })
  }

  return div({
    className: styles.hoverTarget,
    style: {
      alignItems: 'center',
      display: 'flex',
      margin: '15px 0'
    }
  }, [
    !options.skipLeftConnection ? div({
      style: {
        alignItems: 'center',
        display: 'flex',
        position: 'relative'
      }
    }, [
      !options.skipLeftBorder && idx > 0 ? div({
        style: {
          background: constants.color1,
          height: '44px',
          position: 'absolute',
          top: '-44px',
          width: '1px'
        }
      }) : null,
      div({
        style: {
          background: constants.color1,
          height: '1px',
          width: '10px'
        }
      })
    ]) : null,
    div({
      style: {
        alignItems: 'center',
        background: options.background === 'light' ? constants.color1_4 : constants.color1,
        border: '1px solid ' + constants.color1,
        borderRadius: '3px',
        color: options.background === 'light' ? constants.color3 : '#fff',
        display: 'flex',
        fontSize: '12px',
        height: '30px',
        padding: '0 10px',
        width: '200px'
      }
    }, [
      !options.skipIcon ? _getIcon(entity) : null,
      div(getName(entity))
    ]),
    !options.skipRightConnection ? div({
      style: {
        background: constants.color1,
        height: '1px',
        width: '10px'
      }
    }) : null,
    entity.hoverData ? div({
      className: styles.hoverData,
      style: {
        background: '#fff',
        border: '1px solid ' + constants.color1,
        borderRadius: '3px',
        color: constants.color3,
        fontSize: '12px',
        position: 'absolute',
        marginLeft: '20px',
        padding: '5px 15px',
        width: '200px'
      }
    }, [
      entity.hoverData.map(item => item.name)
    ]) : null
  ])
}

const _render = ({
  filterBarDOM,
  relations
}) => div({
  className: styles.container
}, [
  filterBarDOM,
  relations.data.map(relation => div({
    style: {
      borderBottom: '1px solid ' + constants.color1_6,
      display: 'flex'
    }
  }, [
    _createRelationsBox(relation, null, [], {
      skipLeftConnection: true
    }),
    relations.order
      .map(next => {
        return div([
          relation.relations
            .map(rel => rel[next])
            .map((data, idx, list) => {
              const options = {
                skipIcon: true,
                background: 'light'
              }

              if (data.type === 'plan') {
                options.skipLeftBorder = true
                options.skipRightConnection = true
              }

              return _createRelationsBox(data, idx, list, options)
            })
        ])
      })
  ]))
])

export default sources => {
  const relationsData$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res => res.request.category === 'getPractitionersRelations$')
    .map(res => res.body)
    .map(data => data.relations)
    .startWith({})

  const orderBy$ = sources.DOM
    .select('#orderBy')
    .events('change')
    .map(ev => ev.ownerTarget.value)
    .startWith('groups')

  const relations$ = orderBy$
    .combineLatest(relationsData$)
    .map(([order, relations]) => ({
      data: relations[order] || [],
      order: order === 'groups' ? ['location', 'plan'] : ['group', 'location']
    }))

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
    getPractitionersRelations$(sources)
  )

  return {
    DOM,
    HTTP
  }
}
