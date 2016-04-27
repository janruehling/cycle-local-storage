import R from 'ramda'
import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div, a, img } from '@cycle/dom'

import { toTitleCase } from 'zwUtility'

import { Icon, Avatar } from 'StyleFn'
import logo from 'assets/img/logo.svg'

import styles from './SiteHeader.css'

const { just } = Observable

const hamburger = Icon({
  icon: 'Hamburger',
  style: {
    color: '#fff'
  }
})

const flag = Icon({
  icon: 'Flag',
  style: {
    color: '#fff',
    'padding-left': '15px'
  }
})

const _render = ({
  profile,
  isLoggedIn,
  message
}) => div([
  div({
    className: styles.spacer
  }),
  div({
    className: styles.container
  }, [
    div({
      className: styles.wrap
    }, [
      isLoggedIn ? hamburger : null,
      div({
        className: styles.logoContainer
      }, [
        a({
          className: styles.logo,
          href: '/#/dash'
        }, [
          img({
            src: logo
          })
        ])
      ]),
      isLoggedIn
        ? div({
          className: styles.userMenuContainer,
          id: 'userMenu'
        }, [
          Avatar({
            image: R.pathOr(null, ['image', 'url'])(profile),
            icon: toTitleCase(R.pathOr('Male', ['gender'])(profile)),
            size: 26
          }),
          R.pathOr(null, ['first_name'])(profile) && div({
            className: styles.userName
          }, 'Hi, ' + profile.first_name),
          flag,
          div([
            a({
              href: '/#/login/'
            }, 'Logout')
          ])
        ])
        : null
    ])
  ]),
  message && div({
    className: styles.messageContainer,
    style: {
      ...message.styles
    }
  }, [
    message.icon && Icon({
      icon: message.icon,
      style: {
        marginRight: '5px',
        fontSize: '17px',
        color: 'inherit',
        ...message.iconStyles
      }
    }),
    div({
      className: styles.messageText,
      styles: {
        ...message.textStyles
      }
    }, message.text)
  ])
])

export const SiteHeader = sources => {
  const viewState = {
    profile: sources.userProfile$ || just({}),
    isLoggedIn: sources.isLoggedIn$ || just(true),
    message: sources.message$ || just(null)
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
