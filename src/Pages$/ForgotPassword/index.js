import { Observable } from 'rx'
import { div, button } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader$ } from 'Components$'
import { InfoMessage, ErrorMessage, FormContainer } from 'StyleFn'

import styles from './ForgotPassword.css'

const EmailInput = InputFactory({
  id: 'username',
  className: styles.input,
  style: {
    margin: 0
  },
  type: 'email',
  placeholder: 'Email',
  required: true
})

const _render = ({
  headerDOM,
  formData$,
  emailInputDOM,
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
      }, 'Forgot your username or Password'),
      div({
        className: styles.intro
      }, 'Enter the email address associated with your account, and we’ll email you a link to reset your password. You may need to check your spam folder or unblock no-reply@zipwire.com'),
      div({
        className: styles.inputGroup
      }, [
        emailInputDOM,
        button({
          id: 'submit',
          className: styles.button
        }, 'Submit')
      ])
    ])
  ])
])

export default sources => {
  const backendResponse$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'postForgotPassword$')
    .map(res => res.body)
    .startWith({})

  const successResponses$ = backendResponse$
    .filter(response => response && !response.error && response.message)

  const errorResponses$ = backendResponse$
    .filter(response => response && response.error && response.message)

  const emailInput = EmailInput(sources)

  const formData$ = combineLatestObj({
    email: emailInput.value$
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
        category: 'postForgotPassword$',
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
            return Observable.just(null)
          }
        }
      )
    })
    .startWith(null)

  const header = SiteHeader$({
    ...sources,
    isLoggedIn$: Observable.just(false),
    message$: message$
  })

  const viewState = {
    headerDOM$: header.DOM,
    formData$,
    emailInputDOM$: emailInput.DOM,
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
