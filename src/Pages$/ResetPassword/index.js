import { Observable } from 'rx'
import isolate from '@cycle/isolate'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader$ } from 'Components$'
import { Button, Link, FormContainer, InfoMessage, ErrorMessage } from 'StyleFn'

import constants from 'constants.css'
import styles from './ResetPassword.css'

const { just } = Observable

const PasswordInput = isolate(InputFactory({
  id: 'password',
  className: styles.input,
  type: 'password',
  placeholder: 'Password',
  required: true,
  style: {
    marginBottom: '15px'
  }
}))

const ConfirmPasswordInput = isolate(InputFactory({
  id: 'passwordConfirm',
  className: styles.input,
  type: 'password',
  placeholder: 'Confirm Password',
  required: true,
  style: {
    marginBottom: '15px'
  }
}))

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
      Button({
        id: 'submit',
        text: 'Submit',
        background: constants.color1,
        style: {
          marginBottom: '15px',
          width: '100%'
        }
      }),
      Link({
        href: '/#/login'
      }, 'Cancel')
    ])
  ])
])

export default sources => {
  const backendResponse$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'postResetPassword$')
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
        url: config.api + '/reset_password?category=postResetPassword$',
        method: 'POST',
        category: 'postResetPassword$',
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
            return just(message)
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
