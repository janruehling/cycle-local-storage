import R from 'ramda'

import styles from './PageHeader.css'

import { div, span, img } from '@cycle/dom'

import tick from 'assets/img/icons/tick.svg'

let view = function (model) {
  let view$ = model.profile$
    .do(console.log.bind(console))
    .map(function (profile) {
      return div({className: styles.container}, [
        div({className: styles.wrap}, [
          img(R.merge(R.pathOr(null, ['organization', 'logo'])(profile), {
            className: styles.avatar
          })),
          div({
            className: styles.orgMeta
          }, [
            div({
              className: styles.orgName
            }, [
              span(R.pathOr(null, ['organization', 'name'])(profile))
            ]),
            div({
              className: styles.orgLastVerifiedContainer
            }, [
              img({
                src: tick,
                className: styles.orgLastVerifiedTick
              }),
              div('Last Verified:'),
              div({
                className: styles.orgLastVerifiedDate
              }, R.pathOr(null, ['organization', 'last_verified'])(profile))
            ])
          ]),
          div({
            className: styles.userMeta
          }, [
            div({
              className: styles.userName
            }, R.pathOr(null, ['first_name'])(profile) + ' ' + R.pathOr(null, ['last_name'])(profile)),
            div({
              className: styles.userLogin
            }, 'Last Login: ' + R.pathOr(null, ['last_login'])(profile)),
            div('Account: ' + R.pathOr(null, ['account'])(profile))
          ])
        ])
      ])
    })

  return {
    DOM: view$
  }
}

export default view
