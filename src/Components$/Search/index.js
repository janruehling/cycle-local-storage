import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { InputFactory } from 'Components$'

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

  const resultClicks$ = actions.resultClicks$
    .map(ev => ev.ownerTarget.dataset.type + '/' + ev.ownerTarget.dataset.id + '/')

  const searchResponse$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getSearch$')
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
        method: 'GET',
        category: 'getSearch$'
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

  const route$ = Observable.merge(
    resultClicks$
  )

  return {
    HTTP,
    route$,
    value$: searchInput.value$,
    DOM
  }
}
