import { Observable } from 'rx'
import { div, button, a } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader$ } from 'Components$'
import { byMatch } from 'zwUtility'
import { FormContainer, InfoMessage, ErrorMessage } from 'StyleFn'

import styles from './ResetPassword.css'

const { just } = Observable

const PasswordInput = InputFactory({
  id: 'password',
  className: styles.input,
  type: 'password',
  placeholder: 'Password',
  required: true
})

const ConfirmPasswordInput = InputFactory({
  id: 'passwordConfirm',
  className: styles.input,
  type: 'password',
  placeholder: 'Confirm Password',
  required: true
})

const _render = ({
  headerDOM,
  formData$,
  passwordInputDOM,
  confirmPasswordInputDOM,
  message
}) => div([
  headerDOM,
  div({
    className: styles.container
  }, [
    FormContainer({
      style: {
        marginTop: '120px',
        width: '614px'
      },
      message: message
    }, [
      div({
        className: styles.title
      }, 'Reset Password'),
      passwordInputDOM,
      confirmPasswordInputDOM,
      button({
        id: 'submit',
        className: styles.button
      }, 'Submit'),
      a({
        href: '/#/login'
      }, 'Cancel')
    ])
  ])
])

export default sources => {
  const backendResponse$ = sources.responses$
    .filter(byMatch('/reset_password'))
    .map(res => res.body)
    .startWith({})

  const successResponses$ = backendResponse$
    .filter(response => response && !response.error && response.message)

  const errorResponses$ = backendResponse$
    .filter(response => response && response.error && response.message)

  const passwordInput = PasswordInput(sources)
  const confirmPasswordInput = ConfirmPasswordInput(sources)

  const formData$ = combineLatestObj({
    code: sources.resetCode$,
    password: passwordInput.value$
  })

  const submit$ = sources.DOM
    .select('.' + styles.button)
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
        url: config.api + '/forgot_password',
        method: 'POST',
        send: formData
      }
    })
    .startWith({})

  const message$ = errorResponses$
    .map(res => ErrorMessage(res.message))
    .merge(successResponses$.map(res => InfoMessage(res.message)))
    .flatMap(message => {
      return Observable
        .timer(0, 1000)
        .take(5)
        .flatMap(count => {
          if (count < 4) {
            return message
          } else {
            return just(null)
          }
        }
      )
    })
    .startWith(null)

  const header = SiteHeader$({
    ...sources,
    isLoggedIn$: just(false),
    message$: message$
  })

  const viewState = {
    headerDOM$: header.DOM,
    formData$,
    passwordInputDOM$: passwordInput.DOM,
    confirmPasswordInputDOM$: confirmPasswordInput.DOM,
    message$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM,
    formData$,
    HTTP,
    route$: sources.redirectLogin$,
    message$
  }
}
