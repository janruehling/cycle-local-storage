import { div, span, img, p } from '@cycle/dom'

import styles from './Biography.css'

import shield from 'assets/img/icons/shield.svg'

export default function view (model) {
  const vtree$ = model.organization$
    .map(organization => {
      return div({
        className: styles.section
      }, [
        div({
          className: styles.sectionHeader
        }, [
          img({
            src: shield
          }),
          span({
            className: styles.sectionTitle
          }, 'Profile')
        ]),
        div({
          className: styles.sectionContent
        }, [
          p(organization.profile)
        ])
      ])
    })

  return {
    DOM: vtree$
  }
}
