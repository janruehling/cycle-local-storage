import R from 'ramda'
import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { div, img, a } from '@cycle/dom'

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
}) => div({
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
        href: '/'
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
        icon: profile.gender ? toTitleCase(profile.gender) : 'Male',
        size: 26
      }),
      div({
        className: styles.userName
      }, 'Hi, ' + profile.first_name),
      flag
    ])
  ])
])

export const SiteHeader = sources => {
  const viewState = {
    profile: sources.userProfile$ || just({})
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM
  }
}
