import { map, pathOr } from 'ramda'
import { div, span, img, a } from '@cycle/dom'

import styles from './Practitioners.css'

import contact from 'assets/img/icons/contact.svg'
import roundPlus from 'assets/img/icons/roundPlus.svg'

export default function view (model) {
  const vtree$ = model.location$
    .map(location => {
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
          }, 'Practitioners'),
          img({
            src: roundPlus
          })
        ]),
        map(practitioner => {
          return div({
            className: styles.sectionContent
          }, [
            img({
              className: styles.itemImage,
              src: pathOr(null, ['image', 'src'])(practitioner)
            }),
            span({
              className: styles.itemName
            }, practitioner.prefix + ' ' + practitioner.first_name + ' ' + practitioner.last_name)
          ])
        })(location.practitioners),
        div([
          a({
            className: styles.viewAll,
            href: '#'
          }, 'View All Staff')
        ])
      ])
    })

  return {
    DOM: vtree$
  }
}
