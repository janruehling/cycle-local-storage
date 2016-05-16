import R from 'ramda'
import moment from 'moment'
import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div, span } from '@cycle/dom'

import {} from 'Components$'
import { Avatar, Icon, KeyValue } from 'StyleFn'

import constants from 'constants.css'
import styles from './AccountInfo.css'

const { just } = Observable

const _render = ({
  organization,
  profile
}) => div({
  className: styles.container
}, [
  organization && div({
    className: styles.wrap
  }, [
    Avatar({
      image: R.pathOr(null, ['image', 'url'])(organization),
      icon: 'Shield',
      size: 60,
      className: styles.avatar,
      style: {
        backgroundColor: '#fff'
      }
    }),
    div({
      className: styles.orgMeta
    }, [
      div({
        className: styles.orgName
      }, [
        span(R.pathOr(null, ['name'])(organization))
      ]),
      organization.last_verified && div({
        className: styles.orgLastVerifiedContainer
      }, [
        Icon({
          icon: 'Tick',
          style: {
            marginRight: '7px'
          }
        }),
        KeyValue({
          key: 'Last Verified',
          value: moment(organization.last_verified).format('ll'),
          reverse: true,
          style: {
            color: '#fff'
          }
        })
      ])
    ]),
    div({
      style: {
        background: constants.color1_3,
        height: '60px',
        width: '1px'
      }
    }),
    profile && div({
      className: styles.userMeta
    }, [
      div({
        className: styles.userName
      }, R.pathOr(null, ['first_name'])(profile) + ' ' + R.pathOr(null, ['last_name'])(profile)),
      profile.last_login && div({
        className: styles.userLogin
      }, 'Last Login: ' + moment(profile.last_login).format('ll [at] LT')),
      profile.account && div('Account: ' + profile.account)
    ])
  ])
])

export const AccountInfo = sources => {
  const viewState = {
    organization: sources.organization$ || just({}),
    profile: sources.userProfile$ || just({})
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
