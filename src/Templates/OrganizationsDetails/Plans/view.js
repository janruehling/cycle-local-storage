import { map } from 'ramda'
import { div, span, img } from '@cycle/dom'

import styles from './Plans.css'

import sheet from 'assets/img/icons/sheet.svg'
import roundPlus from 'assets/img/icons/roundPlus.svg'

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
        })(organization.plans)
      ])
    })

  return {
    DOM: vtree$
  }
}
