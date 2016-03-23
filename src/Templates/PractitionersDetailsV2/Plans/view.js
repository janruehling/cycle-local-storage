import { map } from 'ramda'
import { div, span, img } from '@cycle/dom'

import styles from './Plans.css'

import sheet from 'assets/img/icons/sheet.svg'
import roundPlus from 'assets/img/icons/roundPlus.svg'

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
            src: sheet
          }),
          span({
            className: styles.sectionTitle
          }, 'Plans Covered'),
          img({
            src: roundPlus
          })
        ]),
        map(plan => {
          return div({
            className: styles.sectionContent
          }, [
            span(plan.name)
          ])
        })(practitioner.plans)
      ])
    })

  return {
    DOM: vtree$
  }
}
