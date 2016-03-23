import { Observable } from 'rx'
import { div, input, button, a } from '@cycle/dom'
import classNames from 'classnames'

import styles from './Login.css'

export default function view (model) {
  const sinks = {
    DOM: model.loginResponse$.map(({email, password}) => div({
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
          className: classNames({
            [styles.input]: true,
            'email': true
          }),
          value: email
        }),
        input({
          type: 'password',
          placeholder: 'Password',
          required: true,
          className: classNames({
            [styles.input]: true,
            'password': true
          }),
          value: password
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
