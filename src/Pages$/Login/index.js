import { pathOr } from 'ramda'
import { Observable } from 'rx'
import { div, button, a, span } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SiteHeader } from 'Components$'
import { byMatch } from 'zwUtility'

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
      }, 'Log into Zipwire'),
      emailInputDOM,
      passwordInputDOM,
      button({
        id: 'submit',
        className: styles.button
      }, 'Log in'),
      div([
        a({
          className: styles.link,
          href: '#'
        }, 'Forgotten Password? '),
        a({
          className: styles.link,
          href: '#'
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
  // const messageInfo$ = just({
  //   text: 'You must login to continue',
  //   icon: 'Info',
  //   type: 'info',
  //   styles: {
  //     background: constants.additional16,
  //     color: constants.primary1
  //   }
  // })

  const messageWarn$ = just({
    text: div([
      span('The data you’ve entered is incorrect. Have you'),
      a({
        style: {
          fontWeight: 'bold'
        }
      }, ' forgotten your username or password? ')
    ]),
    icon: 'Warn',
    type: 'warn',
    styles: {
      background: constants.additional17,
      color: '#fff'
    }
  })

  // const message$ = Observable
  //   .interval(1000)
  //   .take(10)
  //   .flatMap(count => {
  //     if (count < 4) {
  //       return messageWarn$
  //     } else if (count < 8) {
  //       return messageInfo$
  //     } else {
  //       return just(null)
  //     }
  //   }
  // )

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
        send: formData
      }
    })
    .startWith({})

  const loginResponse$ = sources.responses$
    .filter(byMatch('/login'))
    .map(res => res.body)
    .startWith({})

  const message$ = loginResponse$
    .filter(response => response && response.error)
    .flatMap(response => {
      return Observable
        .timer(0, 1000)
        .take(5)
        .flatMap(count => {
          if (count < 4) {
            return messageWarn$
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

  const header = SiteHeader({
    ...sources,
    isLoggedIn$: just(false),
    message$: message$
  })

  const viewState = {
    headerDOM$: header.DOM,
    formData$,
    emailInputDOM$: emailInput.DOM,
    passwordInputDOM$: passwordInput.DOM,
    message$
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM,
    storage: storageRequest$,
    formData$,
    queue$,
    route$: sources.redirectLogin$,
    message$
  }
}
