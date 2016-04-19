import { div } from '@cycle/dom'
import classNames from 'classnames'

import styles from './DesktopFrame.css'

const noSidenav = (noScroll, header, accountInfo, search, page) => div({
  className: classNames({
    [styles.noScroll]: noScroll
  })
}, [
  header,
  accountInfo,
  search,
  div({}, [page])
])

export const DesktopFrame = ({noScroll, header, accountInfo, search, page}) => div({}, [
  noSidenav(noScroll, header, accountInfo, search, page)
])
