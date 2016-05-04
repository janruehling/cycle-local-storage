import R from 'ramda'
import { Observable } from 'rx'
import { div, a, img, span } from '@cycle/dom'

import { Icon, Avatar } from 'StyleFn'
import { toTitleCase } from 'zwUtility'
import logo from 'assets/img/logo.svg'

import constants from 'constants.css'
import styles from './SiteHeader.css'

const InfoMessage = message => Observable.just({
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

const ErrorMessage = message => Observable.just({
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

const SiteHeader = ({
  profile,
  isLoggedIn,
  isUserMenuOpen,
  message,
  style
}) => div([
  div({
    className: styles.spacer
  }),
  div({
    className: styles.container,
    style: style
  }, [
    div({
      className: styles.wrap
    }, [
      isLoggedIn ? Icon({
        icon: 'Hamburger',
        style: {
          color: '#fff'
        }
      }) : null,
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
          style: {
            display: 'flex',
            alignItems: 'center'
          }
        }, [
          div({
            className: styles.userMenuContainer
          }, [
            Avatar({
              image: R.pathOr(null, ['image', 'url'])(profile),
              icon: toTitleCase(R.pathOr('Male', ['gender'])(profile)),
              size: 26,
              style: {
                marginRight: '5px'
              }
            }),
            R.pathOr(null, ['first_name'])(profile)
              ? div({
                className: styles.userNameContainer + (isUserMenuOpen ? ' ' + styles.userMenuOpen : ''),
                id: 'userMenu'
              }, [
                div({
                  className: styles.userName,
                  style: {
                    alignItems: 'center',
                    display: 'flex'
                  }
                }, [
                  div('Hi, ' + profile.first_name),
                  Icon({
                    icon: 'Drop',
                    style: {
                      color: 'inherit',
                      marginLeft: '5px',
                      marginTop: '5px',
                      fontSize: '10px'
                    }
                  })
                ]),
                div({
                  className: styles.userMenu
                }, [
                  div({
                    className: styles.userMenuItem + ' userMenuItem'
                  }, [
                    Icon({
                      icon: 'ZCards',
                      style: {
                        fontSize: '18px',
                        marginRight: '5px'
                      }
                    }),
                    div('My Profile')
                  ]),
                  div({
                    className: styles.userMenuItem + ' userMenuItem',
                    id: 'accountSettings'
                  }, [
                    Icon({
                      icon: 'Account',
                      style: {
                        fontSize: '18px',
                        marginRight: '5px'
                      }
                    }),
                    div('Account Settings')
                  ]),
                  div({
                    className: styles.userMenuItem + ' userMenuItem',
                    id: 'termsOfService'
                  }, [
                    Icon({
                      icon: 'TOS',
                      style: {
                        fontSize: '18px',
                        marginRight: '5px'
                      }
                    }),
                    div('Terms of Service')
                  ]),
                  div({
                    className: styles.userMenuItem + ' userMenuItem',
                    id: 'feedback'
                  }, [
                    Icon({
                      icon: 'Feedback',
                      style: {
                        fontSize: '18px',
                        marginRight: '5px'
                      }
                    }),
                    div('Give us feedback')
                  ]),
                  div({
                    className: styles.userMenuItem + ' userMenuItem',
                    id: 'signOut'
                  }, [
                    div({
                      style: {
                        fontWeight: 'bold'
                      }
                    }, 'Sign Out'),
                    Icon({
                      icon: 'Forward',
                      style: {
                        fontSize: '18px',
                        marginLeft: '15px'
                      }
                    })
                  ])
                ])
              ]
              )
              : null
          ]),
          div({
            className: styles.notificationMenuContainer
          }, [
            Icon({
              icon: 'Flag',
              style: {
                borderLeft: '1px solid #fff',
                color: '#fff',
                padding: '5px 10px'
              }
            })
          ])
        ])
        : null
    ])
  ]),
  (message && message.text) && div({
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

export { InfoMessage, ErrorMessage, SiteHeader }
