import { Observable } from 'rx'
import { div, input } from '@cycle/dom'

import combineLatestObj from 'rx-combine-latest-obj'

import styles from './Search.css'

const _render = ({
  just
}) => div({
  className: styles.container
}, [
  input({
    className: styles.input,
    placeholder: 'Search for a Person, Organization, Location or Plan',
    type: 'text'
  })
])

export const Search = sources => {
  const viewState = {
    just: Observable.just('I am the searchbar')
  }

  const DOM = combineLatestObj(viewState).map(_render)
  return {
    ...sources,
    DOM
  }
}
