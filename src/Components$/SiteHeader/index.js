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
  profile
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
      hamburger,
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
      div({
        className: styles.userMenuContainer
      }, [
        Avatar({
          image: R.pathOr(null, ['image', 'url'])(profile),
          icon: toTitleCase(R.pathOr('Male', ['gender'])(profile)),
          size: 26
        }),
        R.pathOr(null, ['first_name'])(profile) && div({
          className: styles.userName
        }, 'Hi, ' + profile.first_name),
        flag
      ])
    ])
  ])
])

// const _logoClicks = (sources) => sources.DOM
//   .select('.' + styles.logo)
//   .events('click')
//   .map(ev => '/dash')

export const SiteHeader = sources => {
  const viewState = {
    profile: sources.userProfile$ || just({})
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM
  }
}
