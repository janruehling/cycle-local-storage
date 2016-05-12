import R from 'ramda'
import { div, span } from '@cycle/dom'
import classNames from 'classnames'
import { zwInput, Avatar } from 'StyleFn'
import { getIcon, getName, toTitleCase } from 'zwUtility'

import styles from './zwSearch.css'

export const _highlightText = (string, match) => {
  const matches = string.split(match)

  const targets = R.dropLast(1, matches)
  const last = R.last(matches)

  const mergeSpans = R.flatten(
    targets
      .map(s => {
        return [span(s), span({
          style: {
            background: 'yellow'
          }
        }, match)]
      })
    )

  const spans = R.concat(mergeSpans, span(last))

  return spans
}

const _getEntityType = (type) => {
  let out

  switch (type) {
    case 'practitioners':
      out = 'practitioner'
      break
    case 'groups':
      out = 'group'
      break
    case 'locations':
      out = 'location'
      break
    case 'plans':
      out = 'plan'
      break
    default:
      throw new Error('No matching type')
  }

  return out
}

const _createResultRow = (entity, searchInputValue, type) => div({
  className: classNames({
    [styles.resultRow]: true,
    'resultRow': true
  }),
  attributes: {
    'data-id': entity.id,
    'data-type': _getEntityType(type)
  }
}, [
  div({
    className: styles.firstColumn
  }, [
    Avatar({
      image: R.pathOr(null, ['image', 'url'])(entity),
      icon: getIcon(entity, type),
      size: 24,
      style: {
        marginRight: '10px'
      }
    }),
    div({
      className: styles.name
    }, _highlightText(getName(entity), searchInputValue))
  ]),
  div({
    className: styles.secondColumn
  }, [
    entity.zwmid && _highlightText(entity.zwmid, searchInputValue)
  ]),
  div({
    className: styles.thirdColumn
  }, [
    entity.npi && _highlightText(entity.npi, searchInputValue)
  ])
])

export const zwSearch = (attributes = {}) => {
  return div({
    className: classNames({
      [styles.container]: true,
      [styles.isActive]: attributes.value && attributes.value.length
    })
  }, [
    div({
      className: styles.backdrop
    }),
    zwInput({
      ...attributes,
      skin: 'search',
      type: 'text',
      value: attributes.value,
      style: {
        zIndex: '8'
      },
      styleInput: {
        ...attributes.styleInput,
        width: '100%'
      }
    }),
    (attributes.value && attributes.value.length >= 1) ? div({
      className: styles.results
    }, [
      attributes.value && attributes.value.length >= 3 ? div({
        className: styles.resultsWrap
      }, [
        (attributes.results && (!R.isEmpty(attributes.results.practitioners) ||
          !R.isEmpty(attributes.results.locations) ||
          !R.isEmpty(attributes.results.groups) ||
          !R.isEmpty(attributes.results.plans)))
          ? div([
            R.map(entities => {
              return attributes.results[entities]
                ? div([
                  div({
                    className: styles.resultsCategory
                  }, toTitleCase(entities)),
                  attributes.results[entities].length
                    ? attributes.results[entities].map(entity => _createResultRow(entity, attributes.value, entities))
                    : div({
                      className: styles.noResults
                    }, 'There are no results which match your search')
                ])
                : null
            })(['practitioners', 'locations', 'groups', 'plans'])
          ])
          : div({
            className: styles.noResults
          }, 'No results match your search')
      ]) : div('Please type at least 3 characters to search')
    ]) : null
  ])
}
