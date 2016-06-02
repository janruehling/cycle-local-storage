import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { AvatarCrop$ } from 'Components$'

import { Heading } from 'StyleFn'
import {
  createTextField, createCheckbox, createTextarea
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
  avatarCrop,
  nameFieldDOM,
  legalNameFieldDOM,
  legalStructureFieldDOM,
  npiFieldDOM,
  practicePacIdFieldDOM,
  taxNumberFieldDOM,
  typeFieldDOM,
  medicaidCertCheckDOM,
  descriptionTextareaDOM,
  group
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
      legalNameFieldDOM,
      legalStructureFieldDOM,
      npiFieldDOM,
      practicePacIdFieldDOM,
      taxNumberFieldDOM,
      typeFieldDOM,
      medicaidCertCheckDOM
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
  const nameField = createTextField('name', 'Name', fieldConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.name)
      : Observable.just(null)
  })

  const legalNameField = createTextField('legal_name', 'Legal Name', fieldConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.legal_name)
      : Observable.just(null)
  })

  const legalStructureField = createTextField('legal_structure', 'Legal Structure', fieldConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.legal_structure)
      : Observable.just(null)
  })

  const npiField = createTextField('npi', 'NPI', fieldConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.npi)
      : Observable.just(null)
  })

  const practicePacIdField = createTextField('practice_pac_id', 'PAC ID', fieldConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.practice_pac_id)
      : Observable.just(null)
  })

  const taxNumberField = createTextField('tax_number', 'Tax #', fieldConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.tax_number)
      : Observable.just(null)
  })

  const typeField = createTextField('type', 'Type', fieldConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.type)
      : Observable.just(null)
  })

  const medicaidCertCheck = createCheckbox('medicaid_certified', '', 'Medicaid Certified', checkboxConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.medicaid_certified)
      : Observable.just(null)
  })

  const descriptionTextarea = createTextarea('description', textAreaConfig)({
    ...sources,
    value$: sources.group$
      ? sources.group$.map(group => group.description)
      : Observable.just(null)
  })

  const avatarCrop = AvatarCrop$({
    ...sources,
    entity$: sources.group$
  })

  const formData$ = combineLatestObj({
    image: avatarCrop.value$,
    name: nameField.value$,
    legal_name: legalNameField.value$,
    legal_structure: legalStructureField.value$,
    npi: npiField.value$,
    practice_pac_id: practicePacIdField.value$,
    tax_number: taxNumberField.value$,
    type: typeField.value$,
    medicaid_certified: medicaidCertCheck.value$,
    description: descriptionTextarea.value$
  })

  const viewState = {
    avatarCrop: avatarCrop.DOM,
    formData: formData$,
    nameFieldDOM: nameField.DOM,
    legalNameFieldDOM: legalNameField.DOM,
    legalStructureFieldDOM: legalStructureField.DOM,
    npiFieldDOM: npiField.DOM,
    practicePacIdFieldDOM: practicePacIdField.DOM,
    taxNumberFieldDOM: taxNumberField.DOM,
    typeFieldDOM: typeField.DOM,
    medicaidCertCheckDOM: medicaidCertCheck.DOM,
    descriptionTextareaDOM: descriptionTextarea.DOM,
    group: sources.group$ || Observable.just({})
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const HTTP = Observable.merge(
    avatarCrop.HTTP
  )

  return {
    formData$,
    HTTP,
    DOM
  }
}
