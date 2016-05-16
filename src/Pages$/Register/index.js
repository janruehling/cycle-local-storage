import { Observable } from 'rx'
import { div, button } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader$ } from 'Components$'
import { FormContainer, InfoMessage, ErrorMessage } from 'StyleFn'

import styles from './Register.css'

const { just } = Observable

const FirstNameInput = InputFactory({
  id: 'firstName',
  className: styles.input,
  type: 'text',
  placeholder: 'First Name (required)',
  required: true
})

const LastNameInput = InputFactory({
  id: 'lastName',
  className: styles.input,
  type: 'text',
  placeholder: 'Last Name (required)',
  required: true
})

const EmailInput = InputFactory({
  id: 'username',
  className: styles.input,
  type: 'email',
  placeholder: 'Email (required)',
  required: true
})

const PasswordInput = InputFactory({
  id: 'password',
  className: styles.input,
  type: 'password',
  placeholder: 'Password (required)',
  required: true
})

const _render = ({
  headerDOM,
  formData$,
  firstNameInputDOM,
  lastNameInputDOM,
  emailInputDOM,
  passwordInputDOM,
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
      }, 'Sign up for Zipwire Healthcare Data'),
      div({}, [
        firstNameInputDOM,
        lastNameInputDOM,
        emailInputDOM,
        passwordInputDOM,
        button({
          id: 'submit',
          className: styles.button
        }, 'Submit'),
        div({
          id: 'cancel',
          className: styles.link
        }, 'Cancel')
      ])
    ])
  ])
])

export default sources => {
  const backendResponse$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'postRegister$')
    .map(res => res.body)

  const successResponses$ = backendResponse$
    .filter(response => response && !response.error && response.message)

  const errorResponses$ = backendResponse$
    .filter(response => response && response.error && response.message)

  const firstNameInput = FirstNameInput(sources)
  const lastNameInput = LastNameInput(sources)
  const emailInput = EmailInput(sources)
  const passwordInput = PasswordInput(sources)

  const formData$ = combineLatestObj({
    email: emailInput.value$,
    password: passwordInput.value$,
    first_name: firstNameInput.value$,
    last_name: lastNameInput.value$
  })

  const submit$ = sources.DOM
    .select('.' + styles.button)
    .events('click')
    .map(true)

  const cancelClicks$ = sources.DOM
    .select('#cancel')
    .events('click')
    .map(ev => '/')

  const HTTP = formData$
    .sample(submit$)
    .combineLatest(sources.config$,
      (formData, config) => ({config, formData})
    )
    .map(({config, formData}) => {
      return {
        skipToken: true,
        url: config.api + '/register',
        method: 'POST',
        category: 'postRegister$',
        send: formData
      }
    })
    .startWith({})

  const message$ = errorResponses$
    .map(res => ErrorMessage(res.message))
    .merge(successResponses$.map(res => InfoMessage('Welcome to Zipwire. Please check your inbox for a confirmation email')))
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
    firstNameInputDOM$: firstNameInput.DOM,
    lastNameInputDOM$: lastNameInput.DOM,
    emailInputDOM$: emailInput.DOM,
    passwordInputDOM$: passwordInput.DOM,
    message$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  const route$ = Observable.merge(
    sources.redirectLogin$,
    cancelClicks$
  )

  return {
    DOM,
    HTTP,
    route$,
    message$
  }
}
