import { Observable } from 'rx'
import { div, a } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { SiteHeader$ } from 'Components$'
import { getUrlParams } from 'zwUtility'

import styles from './UserWelcome.css'

const _render = ({
  headerDOM,
  params
}) => div([
  headerDOM,
  div({
    className: styles.container
  }, [
    div({
      className: styles.form
    }, [
      div({
        className: styles.title
      }, [
        'Hello and welcome ' + params.first_name + ' ' + params.last_name + '! '
      ]),
      div({
        className: styles.intro
      }, [
        a({
          href: '/#/?email=' + encodeURIComponent(params.email),
          className: styles.link
        }, [
          'You can login now with ' + params.email
        ])
      ])
    ])
  ])
])

export default sources => {
  const urlParams$ = getUrlParams(sources)

  const header = SiteHeader$({
    ...sources,
    isLoggedIn$: Observable.just(false)
  })

  const viewState = {
    headerDOM: header.DOM,
    params: urlParams$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
