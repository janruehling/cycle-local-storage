import { Observable } from 'rx'
import { div } from '@cycle/dom'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, Heading } from 'StyleFn'
import { InputFactory, SelectFactory, CheckboxFactory,
  TextareaFactory } from 'Components$'
import { getConceptByName$ } from 'Remote'

import styles from './AddView.css'

const styleLabel = {
  width: '140px'
}

// const styleRadioLabel = {
//   fontWeight: 'bold',
//   fontSize: '14px'
// }

const styleInput = {
  flex: 'initial',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '235px'
}

const styleTextarea = {
  width: '100%'
}

const fieldConfig = {
  type: 'text',
  skin: 'narrow',
  styleLabel,
  styleInput
}

const genderSelectOptions = [{
  name: '',
  value: 'null'
}, {
  name: 'Male',
  value: '1'
}, {
  name: 'Female',
  value: '2'
}]

const _createTextField = (id, label) => InputFactory({
  ...fieldConfig,
  id,
  label
})

const _createTextarea = (id) => TextareaFactory({
  id,
  styleInput: styleTextarea
})

const _createSelect = (id, label, options$) => SelectFactory({
  ...fieldConfig,
  id,
  label,
  options$
})

const _createCheckbox = (id, label, description) => isolate(CheckboxFactory({
  id,
  label,
  description,
  styleInput: {
    marginLeft: '145px'
  }
}))

const _render = ({
  firstNameFieldDOM,
  middleNameFieldDOM,
  lastNameFieldDOM,
  emailFieldDOM,
  phoneFieldDOM,
  genderSelectDOM,
  medicalSchoolSelectDOM,
  npiFieldDOM,
  faaFieldDOM,
  deaFieldDOM,
  pacIdFieldDOM,
  newPatientsCheckDOM,
  medicareCheckDOM,
  medicaidCheckDOM,
  biographyTextareaDOM,
  formData
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
        image: null,
        icon: getIcon(formData, 'practitioner'),
        style: {
          borderRadius: '6px'
        }
      })
    ]),
    div({
      className: styles.secondColumn
    }, [
      firstNameFieldDOM,
      middleNameFieldDOM,
      lastNameFieldDOM,
      emailFieldDOM,
      phoneFieldDOM,
      genderSelectDOM,
      medicalSchoolSelectDOM,
      npiFieldDOM,
      faaFieldDOM,
      deaFieldDOM,
      pacIdFieldDOM,
      newPatientsCheckDOM,
      medicareCheckDOM,
      medicaidCheckDOM
    ]),
    div({
      className: styles.thirdColumn
    }, [
      Heading({
        icon: 'Contact',
        text: 'Biography',
        style: {
          marginTop: 0
        }
      }),
      biographyTextareaDOM
    ])
  ])
])

export default sources => {
  const medicalSchool$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getConceptByName$medical_schools')
    .map(res => res.body)
    .map(res => res.elements)
    .map(els => {
      return els.map(el => ({
        name: el.value,
        value: el.key
      }))
    })
    .map(els => {
      els.unshift({
        name: '',
        value: null
      })

      return els
    })
    .startWith([])

  const firstNameField = _createTextField('first_name', 'First Name')({
    ...sources,
    value$: null
  })

  const middleNameField = _createTextField('middle_name', 'Middle Name')({
    ...sources,
    value$: null
  })

  const lastNameField = _createTextField('last_name', 'Last Name')({
    ...sources,
    value$: null
  })

  const emailField = _createTextField('email', 'Email')({
    ...sources,
    value$: null
  })

  const phoneField = _createTextField('phone', 'Phone')({
    ...sources,
    value$: null
  })

  const npiField = _createTextField('npi', 'NPI')({
    ...sources,
    value$: null
  })

  const faaField = _createTextField('faa_number', 'FAA Number')({
    ...sources,
    value$: null
  })

  const deaField = _createTextField('dea_number', 'DEA License')({
    ...sources,
    value$: null
  })

  const pacIdField = _createTextField('pac_id', 'DEA License')({
    ...sources,
    value$: null
  })

  const genderSelect = _createSelect('gender', 'Gender')({
    ...sources,
    options$: Observable.just(genderSelectOptions),
    value$: null
  })

  const medicalSchoolSelect = _createSelect('medical_school', 'Medical School')({
    ...sources,
    options$: medicalSchool$,
    value$: null
  })

  const newPatientsCheck = _createCheckbox('accepts_new_patients', '', 'Accepts New Patients')({
    ...sources,
    value$: Observable.just(true)
  })

  const medicareCheck = _createCheckbox('accepts_medicare', '', 'Accepts Medicare')({
    ...sources,
    value$: Observable.just(true)
  })

  const medicaidCheck = _createCheckbox('accepts_medicaid', '', 'Accepts Medicaid')({
    ...sources,
    value$: Observable.just(true)
  })

  const biographyTextarea = _createTextarea('biography')({
    ...sources,
    value$: null
  })

  const formData$ = combineLatestObj({
    first_name: firstNameField.value$,
    middle_name: middleNameField.value$,
    last_name: lastNameField.value$,
    email: emailField.value$,
    phone: phoneField.value$,
    gender: genderSelect.value$,
    npi: npiField.value$,
    faa_number: faaField.value$,
    dea_number: deaField.value$,
    pac_id: pacIdField.value$,
    accepts_new_patients: newPatientsCheck.value$,
    accepts_medicare: medicareCheck.value$,
    accepts_medicaid: medicaidCheck.value$,
    biography: biographyTextarea.value$,
    medical_school: medicalSchoolSelect.value$
  })

  const viewState = {
    formData: formData$,
    firstNameFieldDOM: firstNameField.DOM,
    middleNameFieldDOM: middleNameField.DOM,
    lastNameFieldDOM: lastNameField.DOM,
    emailFieldDOM: emailField.DOM,
    phoneFieldDOM: phoneField.DOM,
    genderSelectDOM: genderSelect.DOM,
    medicalSchoolSelectDOM: medicalSchoolSelect.DOM,
    npiFieldDOM: npiField.DOM,
    faaFieldDOM: faaField.DOM,
    deaFieldDOM: deaField.DOM,
    pacIdFieldDOM: pacIdField.DOM,
    newPatientsCheckDOM: newPatientsCheck.DOM,
    medicareCheckDOM: medicareCheck.DOM,
    medicaidCheckDOM: medicaidCheck.DOM,
    biographyTextareaDOM: biographyTextarea.DOM
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const HTTP = Observable.merge(
    getConceptByName$({
      ...sources,
      conceptName$: Observable.just('medical_schools')
    })
  )

  return {
    formData$,
    HTTP,
    DOM
  }
}
