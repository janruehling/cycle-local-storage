import { Observable } from 'rx'
import { div, button, a, span } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader } from 'Components$'
import { byMatch } from 'zwUtility'

import constants from 'constants.css'
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
  passwordInputDOM,
  confirmPasswordInputDOM,
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
  console.log(sources.resetCode$)
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
    .filter(byMatch('/reset_password'))
    .map(res => res.body)
    .startWith({})

  const errorResponses$ = backendResponse$
    .filter(response => response && response.error)

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
    passwordInputDOM$: passwordInput.DOM,
    confirmPasswordInputDOM$: confirmPasswordInput.DOM,
    message$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM,
    formData$,
    queue$,
    route$: sources.redirectLogin$,
    message$
  }
}
