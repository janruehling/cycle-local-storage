import { div } from '@cycle/dom'

const noSidenav = (header, accountInfo, search, page) => div([
  header,
  accountInfo,
  search,
  div({}, [page])
])

export const DesktopFrame = ({header, accountInfo, search, page}) => div({}, [
  noSidenav(header, accountInfo, search, page)
])
