import { Observable } from 'rx'
import R from 'ramda'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { AvatarCrop$ } from 'Components$'
import { Heading } from 'StyleFn'
import { getConceptByName$ } from 'Remote'
import {
  createTextField, createTextSelect, createTextarea
} from 'Helpers'

import styles from './AddEditForm.css'

const styleLabel = {
  width: '140px'
}

const styleInput = {
  flex: 'initial',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '235px'
}

const styleTextarea = {
  height: '360px',
  width: '100%'
}

const fieldConfig = {
  type: 'text',
  skin: 'narrow',
  styleLabel,
  styleInput
}

const textAreaConfig = {
  styleInput: styleTextarea
}

const _render = ({
  avatarCrop,
  nameFieldDOM,
  stateFieldDOM,
  countryFieldDOM,
  detailsUrlFieldDOM,
  irsEinFieldDOM,
  typesSelectDOM,
  descriptionTextareaDOM,
  plan
}) => div({
  className: styles.container
}, [
  div({
    className: styles.columns
  }, [
    div({
      className: styles.firstColumn
    }, [
      avatarCrop
    ]),
    div({
      className: styles.secondColumn
    }, [
      nameFieldDOM,
      stateFieldDOM,
      countryFieldDOM,
      detailsUrlFieldDOM,
      irsEinFieldDOM,
      typesSelectDOM
    ]),
    div({
      className: styles.thirdColumn
    }, [
      Heading({
        icon: 'Sheet',
        text: 'Description',
        style: {
          marginTop: 0
        }
      }),
      descriptionTextareaDOM
    ])
  ])
])

export default sources => {
  const types$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getConceptByName$plan_types')
    .map(res => res.body)
    .map(res => res.elements)
    .startWith([])

  const nameField = createTextField('name', 'Name', fieldConfig)({
    ...sources,
    value$: sources.plan$
      ? sources.plan$.map(plan => plan.name)
      : Observable.just(null)
  })

  const stateField = createTextField('state', 'State', fieldConfig)({
    ...sources,
    value$: sources.plan$
      ? sources.plan$.map(plan => plan.state)
      : Observable.just(null)
  })

  const countryField = createTextField('country', 'Country', fieldConfig)({
    ...sources,
    value$: sources.plan$
      ? sources.plan$.map(plan => plan.country)
      : Observable.just(null)
  })

  const detailsUrlField = createTextField('details_url', 'Details URL', fieldConfig)({
    ...sources,
    value$: sources.plan$
      ? sources.plan$.map(plan => plan.details_url)
      : Observable.just(null)
  })

  const irsEinField = createTextField('irs_ein', 'IRS EIN', fieldConfig)({
    ...sources,
    value$: sources.plan$
      ? sources.plan$.map(plan => plan.irs_ein)
      : Observable.just(null)
  })

  const typesTextSelect = createTextSelect('type', 'Type', 'value', fieldConfig)({
    ...sources,
    options$: types$ || Observable.just([]),
    value$: sources.plan$
      ? sources.plan$
        .map(plan => R.pathOr(null, ['type'])(plan))
      : Observable.just(null)
  })

  const descriptionTextarea = createTextarea('description', textAreaConfig)({
    ...sources,
    value$: sources.plan$
      ? sources.plan$.map(plan => plan.description)
      : Observable.just(null)
  })

  const avatarCrop = AvatarCrop$({
    ...sources,
    entity$: sources.plan$
  })

  const formData$ = combineLatestObj({
    image: avatarCrop.value$,
    name: nameField.value$,
    state: stateField.value$,
    country: countryField.value$,
    details_url: detailsUrlField.value$,
    irs_ein: irsEinField.value$,
    type: typesTextSelect.valueObj$.map(result => result.key),
    description: descriptionTextarea.value$
  })

  const viewState = {
    avatarCrop: avatarCrop.DOM,
    formData: formData$,
    nameFieldDOM: nameField.DOM,
    stateFieldDOM: stateField.DOM,
    countryFieldDOM: countryField.DOM,
    detailsUrlFieldDOM: detailsUrlField.DOM,
    irsEinFieldDOM: irsEinField.DOM,
    typesSelectDOM: typesTextSelect.DOM,
    descriptionTextareaDOM: descriptionTextarea.DOM,
    plan: sources.plan$ || Observable.just({})
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const HTTP = Observable.merge(
    avatarCrop.HTTP,
    getConceptByName$({
      ...sources,
      conceptName$: Observable.just('plan_types')
    })
  )

  return {
    formData$,
    HTTP,
    DOM
  }
}
