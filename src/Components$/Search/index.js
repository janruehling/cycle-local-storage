import R from 'ramda'
import { Observable } from 'rx'
import { div, span } from '@cycle/dom'
import classNames from 'classnames'
import combineLatestObj from 'rx-combine-latest-obj'

import { InputFactory } from 'Components$'
import { Avatar, KeyValue } from 'StyleFn'
import { byMatch, getName, getIcon } from 'zwUtility'

import styles from './Search.css'

const _highlightText = (string, match) => {
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

const SearchInput = InputFactory({
  id: 'search',
  type: 'text',
  placeholder: 'Search for a Person, Organization, Location or Plan',
  className: styles.input
})

const _createResultRow = (entity, searchInputValue, type) => div({
  className: styles.resultRow
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

const _render = ({
  searchInputValue,
  searchInputDOM,
  searchResponse
}) => div({
  className: classNames({
    [styles.container]: true,
    [styles.isActive]: searchInputValue && searchInputValue.length
  })
}, [
  div({
    className: styles.backdrop
  }),
  searchInputDOM,
  (searchInputValue && searchInputValue.length >= 1) ? div({
    className: styles.results
  }, [
    searchInputValue && searchInputValue.length >= 3 ? div([
      (searchResponse.practitioners ||
        searchResponse.locations ||
        searchResponse.groups ||
        searchResponse.plans)
        ? div([
          R.map(entities => {
            return searchResponse[entities]
              ? searchResponse[entities].map(entity => _createResultRow(entity, searchInputValue, entities))
              : null
          })(['practitioners', 'locations', 'groups', 'plans'])
        ])
        : div('There were no results for you search')
    ]) : div('Please type at least 3 characters to search')
  ]) : null
])

export const Search = sources => {
  const searchInput = SearchInput(sources)

  const formData$ = searchInput.value$.startWith('')

  const queue$ = formData$
    .debounce(100)
    .filter(data => data && data.length >= 3)
    .combineLatest(sources.config$,
      (formData, config) => ({config, formData})
    )
    .flatMapLatest(({config, formData}) => {
      return Observable.just({
        skipToken: false,
        url: config.api + 'search?q=' + encodeURI(formData),
        method: 'GET'
      })
    })
    .startWith('')

  const _handleError = err => {
    return Observable.just(err)
  }

  const searchResponse$ = sources.responses$
    .filter(byMatch('/search'))
    .map(res => res.body)
    .filter(data => !!data)
    .map(data => data.results)
    .catch(_handleError)
    .startWith('')

  const viewState = {
    searchInputValue: searchInput.value$,
    searchInputDOM: searchInput.DOM,
    searchResponse: searchResponse$
  }

  const DOM = combineLatestObj(viewState).map(_render)
  return {
    ...sources,
    queue$,
    value$: searchInput.value$,
    DOM
  }
}

export { _highlightText }
