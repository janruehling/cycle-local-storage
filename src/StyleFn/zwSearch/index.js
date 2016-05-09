import R from 'ramda'
import { div, span } from '@cycle/dom'
import classNames from 'classnames'
import { zwInput, Avatar, KeyValue } from 'StyleFn'
import { getIcon, getName } from 'zwUtility'

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

  return div({
    style: {
      display: 'inline-block'
    }
  }, [
    spans
  ])
}

const _createResultRow = (entity, searchInputValue, type) => div({
  className: classNames({
    [styles.resultRow]: true,
    'result': true
  }),
  attributes: {
    'data-id': entity.id,
    'data-type': type
  }
}, [
  Avatar({
    image: R.pathOr(null, ['image', 'url'])(entity),
    icon: getIcon(entity, type),
    size: 60,
    style: {
      marginRight: '20px'
    }
  }),
  div([
    div({
      className: styles.name
    }, _highlightText(getName(entity), searchInputValue)),
    div({
      className: styles.ids
    }, [
      KeyValue({
        key: 'ZWMID',
        value: entity.zwmid,
        reverse: true,
        style: {
          marginRight: '10px'
        }
      }),
      KeyValue({
        key: 'NPI',
        value: entity.npi,
        reverse: true
      })
    ])
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
      styleInput: {
        ...attributes.styleInput,
        width: '100%'
      }
    }),
    (attributes.value && attributes.value.length >= 1) ? div({
      className: styles.results
    }, [
      attributes.value && attributes.value.length >= 3 ? div([
        (attributes.results && (!R.isEmpty(attributes.results.practitioners) ||
          !R.isEmpty(attributes.results.locations) ||
          !R.isEmpty(attributes.results.groups) ||
          !R.isEmpty(attributes.results.plans)))
          ? div([
            R.map(entities => {
              return attributes.results[entities]
                ? attributes.results[entities].map(entity => _createResultRow(entity, attributes.value, entities))
                : null
            })(['practitioners', 'locations', 'groups', 'plans'])
          ])
          : div('No results match your search')
      ]) : div('Please type at least 3 characters to search')
    ]) : null
  ])
}
