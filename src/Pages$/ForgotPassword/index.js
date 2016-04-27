import { Observable } from 'rx'
import { div, button, span } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader } from 'Components$'
import { byMatch } from 'zwUtility'

import constants from 'constants.css'
import styles from './ForgotPassword.css'

const { just } = Observable

const EmailInput = InputFactory({
  id: 'username',
  className: styles.input,
  type: 'email',
  placeholder: 'Email',
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
  emailInputDOM,
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
  // const messageInfo$ = just({
  //   text: 'You must login to continue',
  //   icon: 'Info',
  //   type: 'info',
  //   styles: {
  //     background: constants.additional16,
  //     color: constants.primary1
  //   }
  // })

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
    .filter(byMatch('/forgot_password'))
    .map(res => res.body)
    .startWith({})

  const errorResponses$ = backendResponse$
    .filter(response => response && response.error)

  const emailInput = EmailInput(sources)

  const formData$ = combineLatestObj({
    email: emailInput.value$
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
        url: config.api + '/forgot_password',
        method: 'POST',
        send: formData
      }
    })
    .startWith({})

  const message$ = errorResponses$
    .flatMap(response => {
      return Observable
        .timer(0, 1000)
        .take(5)
        .flatMap(count => {
          if (count < 4) {
            return messageWarn$(response.message)
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
    emailInputDOM$: emailInput.DOM,
    message$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM,
    formData$,
    queue$,
    route$: sources.redirectLogin$,
    message$
  }
}
