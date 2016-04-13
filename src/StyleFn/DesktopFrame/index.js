import { div } from '@cycle/dom'

const noSidenav = (header, page) =>
  div([
    header,
    div({}, [page])
  ])

export const DesktopFrame = ({header, page}) =>
  div({}, [
    noSidenav(header,page),
  ])
