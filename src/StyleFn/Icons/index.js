import { div, img } from '@cycle/dom'
import classNames from 'classnames'

import fonts from 'fonts.css'

export const Icon = (options = {}) => {
  const style = options.style || {}
  const icon = options.icon || ''

  const iconName = 'icon' + icon

  return div({
    style: {
      ...style
    },
    className: classNames({
      [fonts[iconName]]: true,
      [fonts.icon]: true
    })
  }, [])
}
