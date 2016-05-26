import { Observable } from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import { zwTextSelect } from 'StyleFn'

const TextSelectFactory2 = (attributes = {}) => sources => {
  if (!attributes.id) {
    throw new Error('TextSelectFactory needs an id to work properly')
  }
  const _render = ({
    value,
    focus,
    results
  }) => zwTextSelect({
    ...attributes,
    focus,
    value,
    results
  })

  const resultClicks$ = sources.DOM
    .select('.result')
    .events('click')

  const input$ = sources.DOM
    .select('#' + attributes.id)

  const inputChange$ = input$
    .events('keyup')

  const inputFocus$ = input$
    .events('focus')

  const focus$ = inputFocus$
    .map(true)
    .merge(resultClicks$.map(false))
    .startWith(false)

  const value$ = (sources.value$ || Observable.just(null))
    .merge(inputChange$.pluck('currentTarget', 'value'))
    .merge(resultClicks$.pluck('ownerTarget', 'dataset', attributes.valueProp || 'value'))

  const valueObj$ = (sources.value$ || Observable.just({}))
    .combineLatest(resultClicks$.pluck('ownerTarget', 'dataset'))
    .map(([_, result]) => ({
      key: result.key,
      value: result.value
    }))
    .startWith({})

  const results$ = inputChange$
    .combineLatest(sources.options$, (change, options) => {
      const value = String(change.ownerTarget.value).toLowerCase()
      return options
        .filter(option => {
          if (!value) return true
          return String(option.value).toLowerCase().indexOf(value) !== -1
        })
    })
    .startWith([])

  const viewState = {
    value$,
    focus$,
    results$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    DOM,
    value$,
    valueObj$
  }
}

export default TextSelectFactory2
export { TextSelectFactory2 }
