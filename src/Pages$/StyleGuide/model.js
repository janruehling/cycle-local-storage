import { Observable } from 'rx'
const { just } = Observable

import avatar from './styles/avatar'
import icon from './styles/icon'
import metricsCallout from './styles/metricsCallout'
import metricsCircle from './styles/metricsCircle'
import detailsCard from './styles/detailsCard'
import gridItem from './styles/gridItem'

export default sources => {
  const StyleFns = [avatar, icon, metricsCallout, metricsCircle, detailsCard, gridItem]
  return {
    StyleFns: StyleFns
  }
}
