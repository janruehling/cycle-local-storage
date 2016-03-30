import { Observable } from 'rx'
const { just } = Observable

import avatar from './styles/avatar'
import icon from './styles/icon'

export default sources => {
  const StyleFns = [avatar, icon]
  return {
    StyleFns: StyleFns
  }
}
