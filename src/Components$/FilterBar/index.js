import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { filterBar } from 'StyleFn'

export const FilterBar = sources => {
  const props$ = sources.props$ || Observable.just({})
  const viewState = {
    props$
  }

  const DOM = combineLatestObj(viewState).map(filterBar)

  return {
    DOM
  }
}
