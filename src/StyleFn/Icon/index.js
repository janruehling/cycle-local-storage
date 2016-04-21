import { div } from '@cycle/dom'
import classNames from 'classnames'

import fonts from 'fonts.css'

export const Icon = (options = {}) => {
  const style = options.style || {}
  const icon = options.icon || ''

  const iconName = 'icon' + icon

  return div({
    style,
    className: classNames({
      [options.className]: true,
      [fonts[iconName]]: true,
      [fonts.icon]: true
    }),
    id: options.id || null
  }, [])
}
