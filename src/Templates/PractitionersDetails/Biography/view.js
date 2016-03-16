import { div, span, img, p } from '@cycle/dom'

import styles from './Biography.css'

import contact from 'assets/img/icons/contact.svg'

export default function view (model) {
  const vtree$ = model.practitioner$
    .map(practitioner => {
      return div({
        className: styles.section
      }, [
        div({
          className: styles.sectionHeader
        }, [
          img({
            src: contact
          }),
          span({
            className: styles.sectionTitle
          }, 'Biography')
        ]),
        div({
          className: styles.sectionContent
        }, [
          div(practitioner.prefix + ' ' + practitioner.first_name + ' ' + practitioner.last_name + ' (' + practitioner.nick_name + ')'),
          div(practitioner.gender + ', ' + practitioner.age),
          p(practitioner.biography)
        ])
      ])
    })

  return {
    DOM: vtree$
  }
}
