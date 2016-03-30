import { div } from '@cycle/dom'

const noSidenav = (header, page) =>
  div([
    header,
    div({style: {padding: '0em 1em'}}, [page]),
  ])

export const DesktopFrame = ({header, page}) =>
  div({}, [
    noSidenav(header,page),
  ])
