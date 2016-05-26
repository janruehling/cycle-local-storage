import { Observable } from 'rx'
import R from 'ramda'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, Heading } from 'StyleFn'
import { getConceptByName$ } from 'Remote'
import {
  createTextField, createTextSelect, createCheckbox, createTextarea
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

const checkboxConfig = {
  styleInput: {
    marginLeft: '145px'
  }
}

const textAreaConfig = {
  styleInput: styleTextarea
}

const _render = ({
  nameFieldDOM,
  phoneFieldDOM,
  emergencyRoomCheckDOM,
  typesSelectDOM,
  descriptionTextareaDOM,
  location
}) => div({
  className: styles.container
}, [
  div({
    className: styles.columns
  }, [
    div({
      className: styles.firstColumn
    }, [
      Avatar({
        size: 180,
        image: R.pathOr(null, ['image', 'url'])(location),
        icon: getIcon(location, 'location'),
        style: {
          borderRadius: '6px'
        }
      })
    ]),
    div({
      className: styles.secondColumn
    }, [
      nameFieldDOM,
      typesSelectDOM,
      phoneFieldDOM,
      emergencyRoomCheckDOM
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
    .filter(res$ => res$.request.category === 'getConceptByName$location_types')
    .map(res => res.body)
    .map(res => res.elements)
    .startWith([])

  const nameField = createTextField('name', 'Name', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.name)
      : Observable.just(null)
  })

  const phoneField = createTextField('phone', 'Phone', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.phone)
      : Observable.just(null)
  })

  const typesTextSelect = createTextSelect('type', 'Type', 'value', fieldConfig)({
    ...sources,
    options$: types$ || Observable.just([]),
    value$: sources.location$
      ? sources.location$
        .map(location => R.pathOr(null, ['type'])(location))
      : Observable.just(null)
  })

  const emergencyRoomCheck = createCheckbox('emergency_room', '', 'Emergency Room', checkboxConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.emergency_room)
      : Observable.just(null)
  })

  const descriptionTextarea = createTextarea('description', textAreaConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.description)
      : Observable.just(null)
  })

  const formData$ = combineLatestObj({
    name: nameField.value$,
    phone: phoneField.value$,
    emergency_room: emergencyRoomCheck.value$,
    type: typesTextSelect.valueObj$.map(result => result.value),
    description: descriptionTextarea.value$
  })

  const viewState = {
    formData: formData$,
    nameFieldDOM: nameField.DOM,
    phoneFieldDOM: phoneField.DOM,
    emergencyRoomCheckDOM: emergencyRoomCheck.DOM,
    typesSelectDOM: typesTextSelect.DOM,
    descriptionTextareaDOM: descriptionTextarea.DOM,
    location: sources.location$ || Observable.just({})
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const HTTP = Observable.merge(
    getConceptByName$({
      ...sources,
      conceptName$: Observable.just('location_types')
    })
  )

  return {
    formData$,
    HTTP,
    DOM
  }
}
