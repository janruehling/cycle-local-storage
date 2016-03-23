import R from 'ramda'

import styles from './SiteHeader.css'

import hamburger from 'assets/img/icons/hamburger.svg'
import logo from 'assets/img/logo.svg'
import flag from 'assets/img/icons/flag.svg'

import { div, span, img, a } from '@cycle/dom'

export default function view (model, sources) {

  const view$ = model.profile$
    .map(profile => {
      return div({className: styles.container}, [
        div({className: styles.wrap}, [
          div({className: styles.menu}, [
            img({
              src: hamburger
            })
          ]),
          a({className: styles.logo, href: '/#/'}, [
            img({
              src: logo
            })
          ]),
          div({className: styles.account}, [
            img(R.merge(profile.avatar, {
              className: styles.avatar
            })),
            div({className: styles.greeting}, [
              span('Hi, ' + profile.first_name)
            ]),
            img({
              src: flag
            })
          ])
        ])
      ])
    })

  return {
    DOM: view$
  }
}
