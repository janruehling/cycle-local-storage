import avatar from './styles/avatar'
import { buttons, specialButtons } from './styles/button'
import colors from './styles/colors'
import siteHeader from './styles/siteHeader'
import typography from './styles/typography'
import icon from './styles/icon'
import metricsCallout from './styles/metricsCallout'
import metricsCircle from './styles/metricsCircle'
import detailsCard from './styles/detailsCard'
import gridItem from './styles/gridItem'
import quickFact from './styles/quickFact'
import keyValue from './styles/keyValue'
import heading from './styles/heading'
import list from './styles/list'
import zwInput from './styles/zwInput'
import calendar from './styles/calendar'

export default sources => {
  const StyleFns = [colors, typography, icon, buttons, specialButtons, siteHeader, quickFact, keyValue, heading, avatar, list,
    gridItem, metricsCallout, metricsCircle, detailsCard, zwInput, calendar]
  return {
    StyleFns: StyleFns
  }
}
