import { pathOr } from 'ramda'
import { Observable } from 'rx'
import { div, button, a } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory } from 'Components$'
import { byMatch } from 'zwUtility'

import styles from './Login.css'

const { just } = Observable

const EmailInput = InputFactory({
  id: 'username',
  className: 'email',
  type: 'email',
  placeholder: 'Email',
  required: true
})

const PasswordInput = InputFactory({
  id: 'password',
  type: 'password',
  placeholder: 'Password',
  required: true,
  className: 'password'
})

const _render = ({
  emailInputDOM,
  passwordInputDOM
}) => div({
  className: styles.container
}, [
  div({
    className: styles.form
  }, [
    div({
      className: styles.title
    }, 'Log into Zipwire'),
    emailInputDOM,
    passwordInputDOM,
    button({
      id: 'submit',
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

export default sources => {
  const emailInput = EmailInput(sources)
  const passwordInput = PasswordInput(sources)

  const formData$ = combineLatestObj({
    username: emailInput.value$,
    password: passwordInput.value$
  })

  const submit$ = sources.DOM
    .select('.' + styles.button)
    .events('click')
    .map(true)

  const queue$ = formData$
    .sample(submit$)
    .combineLatest(sources.config$,
      (formData, config) => ({config, formData})
    )
    .map(({config, formData}) => {
      return {
        skipToken: true,
        url: config.api + 'login',
        method: 'POST',
        send: config.dev ? {
          username: 'jason@zipwire.com',
          password: 'Happy19'
        } : formData
      }
    })
    .startWith('')

  const loginResponse$ = sources.responses$
    .filter(byMatch('/login'))
    .map(res => res.body)
    .catch(err => just(err))
    .startWith('')

  const storageRequest$ = loginResponse$
    .flatMap(data => {
      const auth = pathOr(null, ['auth'])(data)
      const profile = pathOr(null, ['profile'])(data)
      return just({
        auth: auth ? JSON.stringify(auth) : null,
        profile: profile ? JSON.stringify(profile) : null
      })
    })

  const viewState = {
    formData$,
    emailInputDOM$: emailInput.DOM,
    passwordInputDOM$: passwordInput.DOM
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM,
    storage: storageRequest$,
    formData$,
    queue$,
    route$: sources.redirectLogin$
  }
}
