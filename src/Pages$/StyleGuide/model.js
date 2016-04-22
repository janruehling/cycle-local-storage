import avatar from './styles/avatar'
import colors from './styles/colors'
import icon from './styles/icon'
import metricsCallout from './styles/metricsCallout'
import metricsCircle from './styles/metricsCircle'
import detailsCard from './styles/detailsCard'
import gridItem from './styles/gridItem'
import quickFact from './styles/quickFact'
import keyValue from './styles/keyValue'
import heading from './styles/heading'
import list from './styles/list'

export default sources => {
  const StyleFns = [colors, icon, quickFact, keyValue, heading, avatar, list, gridItem, metricsCallout, metricsCircle, detailsCard]
  return {
    StyleFns: StyleFns
  }
}
