import { Observable } from 'rx'
const { just } = Observable
import { div, span } from '@cycle/dom'
import { MetricsCallout } from 'StyleFn'

const metricsCallout = MetricsCallout({
  title: 'Data Quality',
  metric: '97%',
  change: '2%',
  descriptionDOM: div([
    span({style: {color: 'green'}}, '116.227 '),
    span({style: {color: '#fff'}}, 'records verified and updated in the last 30 days')
  ]),
  average: 'Industry Average: 52%'
})

const callout = {
  name: 'MetricsCallout',
  children: [metricsCallout].map(callout => ({
    fn: metricsCallout
  }))
}

export default callout
