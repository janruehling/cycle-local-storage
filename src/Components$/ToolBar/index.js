import combineLatestObj from 'rx-combine-latest-obj'
import { div } from '@cycle/dom'

import styles from './ToolBar.css'

const _render = ({
  tools
}) => tools && div('.' + styles.container, [
  tools.left && div('.' + styles.left, tools.left),
  div('.' + styles.center),
  tools.right && div('.' + styles.left, tools.right)
])

export const ToolBar = (sources) => {
  const viewState = {
    tools: sources.tools$
  }
  const DOM = combineLatestObj(viewState).map(_render)

  return {
    ...sources,
    DOM
  }
}
