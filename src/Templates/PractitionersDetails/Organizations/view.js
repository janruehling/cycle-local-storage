import { map, pathOr } from 'ramda'
import { div, span, img } from '@cycle/dom'

import styles from './Organizations.css'

import shield from 'assets/img/icons/shield.svg'
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
            src: shield
          }),
          span({
            className: styles.sectionTitle
          }, 'Organizations'),
          img({
            src: roundPlus
          })
        ]),
        map(organization => {
          return div({
            className: styles.sectionContent
          }, [
            img({
              className: styles.itemImage,
              src: pathOr(null, ['image', 'src'])(organization)
            }),
            span({
              className: styles.itemName
            }, organization.name + ', ' + organization.state)
          ])
        })(practitioner.organizations)
      ])
    })

  return {
    DOM: vtree$
  }
}
