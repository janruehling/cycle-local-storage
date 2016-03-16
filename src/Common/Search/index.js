import { Observable } from 'rx'

import styles from './Search.css'

import { div, input } from '@cycle/dom'

let view = function (sources) {
  let view$ = Observable.of(
    div({
      className: styles.container
    }, [
      input({
        className: styles.input,
        type: 'text',
        placeholder: 'Search for a Person, Organization, Location or Plan'
      })
    ])
  )

  return {
    DOM: view$
  }
}

export default view
