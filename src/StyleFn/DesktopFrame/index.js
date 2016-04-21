import { div } from '@cycle/dom'
import classNames from 'classnames'

import styles from './DesktopFrame.css'

const noSidenav = (noScroll, header, accountInfo, search, toolBar, page) => div({
  className: classNames({
    [styles.noScroll]: noScroll
  })
}, [
  header,
  accountInfo,
  search,
  toolBar,
  div({}, [page])
])

export const DesktopFrame = ({noScroll, header, accountInfo, search, toolBar, page}) => div({}, [
  noSidenav(noScroll, header, accountInfo, search, toolBar, page)
])
