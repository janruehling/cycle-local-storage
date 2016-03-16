import { Observable } from 'rx'
import { div, input, button, a } from '@cycle/dom'

import styles from './Login.css'

export default function view (sources) {
  const sinks = {
    DOM: Observable.just(
      div({
        className: styles.container
      }, [
        div({
          className: styles.form
        }, [
          div({
            className: styles.title
          }, 'Log into Zipwire'),
          input({
            type: 'email',
            placeholder: 'Email',
            required: true,
            className: styles.input
          }),
          input({
            type: 'password',
            placeholder: 'Password',
            required: true,
            className: styles.input
          }),
          button({
            className: styles.button
          }, 'Log in'),
          a({
            className: styles.link,
            href: '#'
          }, 'Forgotten Password? '),
          a({
            className: styles.link,
            href: '#'
          }, 'Sign up for Zipwire')
        ])
      ])
    ),
    HTTP: Observable.empty()
  }
  return sinks
}
