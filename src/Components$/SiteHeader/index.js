import { Observable } from 'rx'
const { just } = Observable

import combineLatestObj from 'rx-combine-latest-obj'
import { div, img, a } from '@cycle/dom'

import { Icon, Avatar } from 'StyleFn'
import logo from 'assets/img/logo.svg'
import avatarImage from 'assets/img/avatar.png'

import styles from './SiteHeader.css'

const hamburger = Icon({
  icon: 'Hamburger',
  style: {
    color: '#fff'
  }
})

const avatar = Avatar({
  image: avatarImage,
  gender: 'male',
  style: {
    fontSize: '26px',
    height: '26px',
    width: '26px'
  }
})

const flag = Icon({
  icon: 'Flag',
  style: {
    color: '#fff',
    'padding-left': '15px'
  }
})

const _render = () => div({
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
      avatar,
      div({
        className: styles.userName
      }, 'Hi, Jan'),
      flag
    ])
  ])
])

export const SiteHeader = sources => {

  const viewState = {
    logo: sources.logo || just('')
  }

  const DOM = combineLatestObj(viewState).map(_render)

  return {
  DOM}
}
