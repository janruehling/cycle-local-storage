import { Observable } from 'rx'
import { div, button, span } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader } from 'Components$'
import { byMatch } from 'zwUtility'

import constants from 'constants.css'
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

const _getContainerBorder = (message) => {
  let border

  if (!message) {
    return '2px solid transparent'
  }

  switch (message.type) {
    case 'info':
      border = '2px solid ' + constants.additional16
      break
    case 'warn':
      border = '2px solid ' + constants.additional17
      break
    default:
      border = '2px solid transparent'
      break
  }
  return border
}

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
    div({
      className: styles.form,
      style: {
        border: _getContainerBorder(message)
      }
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
        }, 'Submit')
      ])
    ])
  ])
])

export default sources => {
  // const messageInfo$ = just({
  //   text: 'You must login to continue',
  //   icon: 'Info',
  //   type: 'info',
  //   styles: {
  //     background: constants.additional16,
  //     color: constants.primary1
  //   }
  // })

  const messageInfo$ = message => just({
    text: div([
      span(message)
    ]),
    icon: 'Info',
    type: 'info',
    styles: {
      background: constants.additional16,
      color: constants.primary1
    }
  })

  const messageWarn$ = message => just({
    text: div([
      span(message)
    ]),
    icon: 'Warn',
    type: 'warn',
    styles: {
      background: constants.additional17,
      color: '#fff'
    }
  })

  const backendResponse$ = sources.responses$
    .filter(byMatch('/register'))
    .map(res => res.body)

  const successResponses$ = backendResponse$
    .filter(response => response && !response.error)

  const errorResponses$ = backendResponse$
    .filter(response => response && response.error)

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

  const queue$ = formData$
    .sample(submit$)
    .combineLatest(sources.config$,
      (formData, config) => ({config, formData})
    )
    .map(({config, formData}) => {
      return {
        skipToken: true,
        url: config.api + '/register',
        method: 'POST',
        send: formData
      }
    })
    .startWith({})

  const message$ = errorResponses$
    .map(res => messageWarn$(res.message))
    .merge(successResponses$.map(res => messageInfo$('Welcome to Zipwire. Please check your inbox for a confirmation email')))
    .do(console.log.bind(console))
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

  const header = SiteHeader({
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

  return {
    ...sources,
    DOM,
    queue$,
    route$: sources.redirectLogin$,
    message$
  }
}
