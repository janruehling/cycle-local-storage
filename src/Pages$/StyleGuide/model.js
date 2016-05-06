import avatar from './styles/avatar'
import { buttons, specialButtons } from './styles/button'
import colors from './styles/colors'
import siteHeader from './styles/siteHeader'
import messageBar from './styles/messageBar'
import search from './styles/search'
import filterBar from './styles/filterBar'
import listView from './styles/listView'
import highlightBox from './styles/highlightBox'
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
import zwSelect from './styles/zwSelect'
import zwCheckbox from './styles/zwCheckbox'
import zwTextarea from './styles/zwTextarea'
import calendar from './styles/calendar'

export default sources => {
  const StyleFns = [
    colors,
    typography,
    icon,
    buttons,
    specialButtons,
    siteHeader,
    messageBar,
    search,
    filterBar,
    listView,
    detailsCard,
    gridItem,
    metricsCallout,
    metricsCircle,
    calendar,
    highlightBox,
    quickFact,
    keyValue,
    heading,
    avatar,
    list,
    zwInput,
    zwSelect,
    zwCheckbox,
    zwTextarea
  ]
  return {
    StyleFns: StyleFns
  }
}
