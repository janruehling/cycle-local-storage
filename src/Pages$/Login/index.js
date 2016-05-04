import { pathOr } from 'ramda'
import { Observable } from 'rx'
import { div, a } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader$ } from 'Components$'
import { byMatch, getUrlParams } from 'zwUtility'
import { FormContainer, ErrorMessage, Button } from 'StyleFn'

import constants from 'constants.css'
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
  params,
  headerDOM,
  formData$,
  emailInputDOM,
  passwordInputDOM,
  message
}) => div([
  headerDOM,
  div({
    className: styles.container
  }, [
    FormContainer({
      message: message
    }, [
      div({
        className: styles.title
      }, 'Log into Zipwire'),
      emailInputDOM,
      passwordInputDOM,
      Button({
        id: 'submit',
        text: 'Log In',
        background: constants.color1,
        style: {
          marginBottom: '15px',
          width: '100%'
        }
      }),
      div([
        a({
          className: styles.link,
          href: '/#/forgotPassword'
        }, 'Forgotten Password? '),
        a({
          className: styles.link,
          href: '/#/register'
        }, 'Sign up for Zipwire')
      ]),
      div([
        a({
          className: styles.link,
          href: '#'
        }, 'Do you have a Zipwire Business log in?')
      ])
    ])
  ])
])

export default sources => {
  const urlParams$ = getUrlParams(sources)

  const emailInput = EmailInput({
    ...sources,
    value$: urlParams$.map(params => params.email)
  })
  const passwordInput = PasswordInput(sources)

  const formData$ = combineLatestObj({
    username: emailInput.value$,
    password: passwordInput.value$
  })

  const submit$ = sources.DOM
    .select('#submit')
    .events('click')
    .map(true)

  const HTTP = formData$
    .sample(submit$)
    .combineLatest(sources.config$,
      (formData, config) => ({config, formData})
    )
    .map(({config, formData}) => {
      return {
        skipToken: true,
        url: config.api + '/login',
        method: 'POST',
        send: formData
      }
    })

  const loginResponse$ = sources.responses$
    .filter(byMatch('/login'))
    .map(res => res.body)
    .startWith({})

  const message$ = loginResponse$
    .filter(response => response && response.error)
    .flatMapLatest(response => {
      return Observable
        .timer(0, 1000)
        .take(5)
        .flatMap(count => {
          if (count < 4) {
            return just(ErrorMessage(response.message))
          } else {
            return just(null)
          }
        }
      )
    })
    .startWith(null)

  const storageRequest$ = loginResponse$
    .filter(response => response && !response.error)
    .flatMap(data => {
      const auth = pathOr(null, ['auth'])(data)
      const profile = pathOr(null, ['profile'])(data)
      return just({
        auth: auth ? JSON.stringify(auth) : null,
        profile: profile ? JSON.stringify(profile) : null
      })
    })
    .startWith(null)

  const header = SiteHeader$({
    ...sources,
    isLoggedIn$: just(false),
    message$: message$
  })

  const viewState = {
    params: urlParams$,
    headerDOM$: header.DOM,
    formData$,
    emailInputDOM$: emailInput.DOM,
    passwordInputDOM$: passwordInput.DOM,
    message$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM,
    storage: storageRequest$,
    formData$,
    HTTP,
    route$: sources.redirectLogin$,
    message$
  }
}
