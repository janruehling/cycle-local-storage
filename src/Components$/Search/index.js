import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { InputFactory } from 'Components$'
import { byMatch } from 'zwUtility'

import intent from './intent'

const SearchInput = InputFactory({
  id: 'search',
  type: 'search',
  placeholder: 'Search for a Person, Organization, Location or Plan'
})

const _render = ({
  searchInputDOM
}) => div([
  searchInputDOM
])

export const Search = sources => {
  const actions = intent(sources)

  actions.resultClicks$.do(console.log.bind(console)).subscribe()

  const searchResponse$ = sources.responses$
    .filter(byMatch('/search'))
    .map(res => res.body)
    .filter(data => !!data)
    .map(data => data.results)
    .catch(_handleError)
    .startWith([])

  const searchInput = SearchInput({
    ...sources,
    results$: searchResponse$
  })

  const formData$ = searchInput.value$
    .startWith('')

  const HTTP = formData$
    .debounce(100)
    .filter(data => data && data.length >= 3)
    .combineLatest(sources.config$,
      (formData, config) => ({config, formData})
    )
    .flatMapLatest(({config, formData}) => {
      return Observable.just({
        skipToken: false,
        url: config.api + '/search?q=' + encodeURI(formData),
        method: 'GET'
      })
    })
    .startWith('')

  const _handleError = err => {
    return Observable.just(err)
  }

  const viewState = {
    searchInputDOM: searchInput.DOM
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    HTTP,
    value$: searchInput.value$,
    DOM
  }
}
