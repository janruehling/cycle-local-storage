import { div, span, img, a } from '@cycle/dom'
import { map } from 'ramda'

import styles from './Activity.css'

import Calendar from './Calendar'
import calendarIcon from 'assets/img/icons/calendar.svg'

export default function view (model) {
  const calendar = Calendar(model).DOM

  const vtree$ = model.location$
    .map(location => {
      return div({
        className: styles.section
      }, [
        div({
          className: styles.sectionHeader
        }, [
          img({
            src: calendarIcon
          }),
          span({
            className: styles.sectionTitle
          }, 'Activity')
        ]),
        calendar,
        div([
          map(activity => {
            return div({
              className: styles.activity
            }, [
              div({
                className: styles.activityHeader
              }, activity.date),
              div({
                className: styles.activityContent
              }, a({href: '#'}, activity.text))
            ])
          })(location.activities)
        ])
      ])
    })

  return {
    DOM: vtree$
  }
}
