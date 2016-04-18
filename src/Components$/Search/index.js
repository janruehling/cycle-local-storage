import { Observable } from 'rx'
import { div, input } from '@cycle/dom'

import combineLatestObj from 'rx-combine-latest-obj'

import styles from './Search.css'

const _render = ({
  placeholder
}) => div({
  className: styles.container
}, [
  input({
    className: styles.input,
    placeholder: placeholder,
    type: 'text'
  })
])

export const Search = sources => {
  const viewState = {
    placeholder: Observable.just('Search for a Person, Organization, Location or Plan')
  }

  const DOM = combineLatestObj(viewState).map(_render)
  return {
    ...sources,
    DOM
  }
}
