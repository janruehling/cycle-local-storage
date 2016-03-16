import { map } from 'ramda'
import { div, span, img } from '@cycle/dom'

import styles from './Locations.css'

import hospital from 'assets/img/icons/hospital.svg'
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
            src: hospital
          }),
          span({
            className: styles.sectionTitle
          }, 'Locations'),
          img({
            src: roundPlus
          })
        ]),
        map(location => {
          return div({
            className: styles.sectionContent
          }, [
            span(location.name + ', ' + location.state)
          ])
        })(practitioner.locations)
      ])
    })

  return {
    DOM: vtree$
  }
}
