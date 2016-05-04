import { SiteHeader } from 'StyleFn'

import avatarJan from 'assets/img/avatar.png'

const children = [{
  name: '',
  fn: SiteHeader({
    isLoggedIn: false,
    profile: {}
  }),
  style: {
    width: '100%'
  }
}, {
  name: '',
  fn: SiteHeader({
    isLoggedIn: true,
    profile: {
      first_name: 'Jan',
      gender: 'Male'
    }
  }),
  style: {
    height: '250px',
    width: '100%'
  }
}, {
  name: '',
  fn: SiteHeader({
    isLoggedIn: true,
    isUserMenuOpen: true,
    profile: {
      first_name: 'Jan',
      gender: 'Male',
      image: {
        url: avatarJan
      }
    }
  }),
  style: {
    height: '250px',
    width: '100%'
  }
}]

const siteHeader = {
  name: 'siteHeader',
  children: children,
  style: {
    width: '100%'
  }
}

export default siteHeader
