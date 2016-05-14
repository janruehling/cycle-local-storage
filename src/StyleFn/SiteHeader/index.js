import R from 'ramda'
import moment from 'moment'
import { div, a, img } from '@cycle/dom'

import { Icon, Avatar } from 'StyleFn'
import { getIcon } from 'zwUtility'
import logo from 'assets/img/logo.svg'

import styles from './SiteHeader.css'

const _getNotificationIcon = type => {
  let out
  switch (type) {
    default:
      out = 'Info'
      break
  }
  return out
}

const _createNotification = notification => {
  return div({
    className: styles.notificationMenuItem
  }, [
    div({
      className: styles.notificationIcon
    }, [
      Icon({
        icon: _getNotificationIcon(notification.type),
        size: 15
      })
    ]),
    div({
      style: {
        flex: 1
      }
    }, [
      div({
        className: styles.notificationText
      }, notification.text),
      div({
        style: {
          display: 'flex'
        }
      }, [
        div({
          className: styles.notificationDate
        }, moment(notification.creation_date).fromNow()),
        notification.read_date ? div({
          className: styles.notificationRead
        }) : div({
          className: styles.notificationRead
        }, 'Mark Read')
      ])
    ])
  ])
}

const SiteHeader = ({
  profile,
  isLoggedIn,
  isUserMenuOpen,
  isNotificationMenuOpen,
  notifications,
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
      // isLoggedIn ? Icon({
      //   icon: 'Hamburger',
      //   style: {
      //     color: '#fff'
      //   }
      // }) : null,
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
              icon: getIcon(profile, 'practitioner'),
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
                  // div({
                  //   className: styles.userMenuItem + ' userMenuItem'
                  // }, [
                  //   Icon({
                  //     icon: 'ZCards',
                  //     style: {
                  //       fontSize: '18px',
                  //       marginRight: '5px'
                  //     }
                  //   }),
                  //   div('My Profile')
                  // ]),
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
                  // div({
                  //   className: styles.userMenuItem + ' userMenuItem',
                  //   id: 'termsOfService'
                  // }, [
                  //   Icon({
                  //     icon: 'TOS',
                  //     style: {
                  //       fontSize: '18px',
                  //       marginRight: '5px'
                  //     }
                  //   }),
                  //   div('Terms of Service')
                  // ]),
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
            style: {
              background: '#fff',
              height: '26px',
              width: '1px'
            }
          }),
          div({
            className: styles.notificationMenuContainer
          }, [
            Icon({
              icon: 'Flag',
              className: styles.notificationMenuIcon,
              style: {}
            }),
            div({
              className: styles.notificationMenu + (isNotificationMenuOpen ? ' ' + styles.notificationMenuOpen : '')
            }, [
              notifications && notifications.length ? R.compose(R.map(_createNotification), R.take(4))(notifications) : div({
                className: styles.notificationMenuItem
              }, 'No notifications yet')
            ])
          ])
        ])
        : null
    ])
  ]),
  message && div({
    style: {
      position: 'absolute',
      top: '59px',
      width: '100%'
    }
  }, [
    message
  ])
])

export { SiteHeader }
