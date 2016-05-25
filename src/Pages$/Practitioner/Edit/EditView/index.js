import { Observable } from 'rx'
import R from 'ramda'
import { div } from '@cycle/dom'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, Heading } from 'StyleFn'
import { InputFactory, SelectFactory, CheckboxFactory,
  TextareaFactory, TextSelectFactory } from 'Components$'
import { getConceptByName$ } from 'Remote'

import styles from './EditView.css'

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
  height: '360px',
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

const _createTextField = (id, label) => isolate(InputFactory({
  ...fieldConfig,
  id,
  label
}))

const _createTextarea = (id) => isolate(TextareaFactory({
  id,
  styleInput: styleTextarea
}))

const _createSelect = (id, label, options$) => isolate(SelectFactory({
  ...fieldConfig,
  id,
  label,
  options$
}))

const _createCheckbox = (id, label, description) => isolate(CheckboxFactory({
  id,
  label,
  description,
  styleInput: {
    marginLeft: '145px'
  }
}))

const _createTextSelect = (id, label, options$) => isolate(TextSelectFactory({
  ...fieldConfig,
  id,
  label,
  options$
}))

const _render = ({
  prefixFieldDOM,
  firstNameFieldDOM,
  middleNameFieldDOM,
  lastNameFieldDOM,
  suffixFieldDOM,
  emailFieldDOM,
  phoneFieldDOM,
  genderSelectDOM,
  medicalSchoolSelectDOM,
  specialtiesSelectDOM,
  typesSelectDOM,
  npiFieldDOM,
  faaFieldDOM,
  deaFieldDOM,
  pacIdFieldDOM,
  newPatientsCheckDOM,
  medicareCheckDOM,
  medicaidCheckDOM,
  medicaidCertCheckDOM,
  biographyTextareaDOM,
  practitioner
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
        image: R.pathOr(null, ['image', 'url'])(practitioner),
        icon: getIcon(practitioner, 'practitioner'),
        style: {
          borderRadius: '6px'
        }
      })
    ]),
    div({
      className: styles.secondColumn
    }, [
      prefixFieldDOM,
      firstNameFieldDOM,
      middleNameFieldDOM,
      lastNameFieldDOM,
      suffixFieldDOM,
      emailFieldDOM,
      phoneFieldDOM,
      genderSelectDOM,
      medicalSchoolSelectDOM,
      specialtiesSelectDOM,
      typesSelectDOM,
      npiFieldDOM,
      faaFieldDOM,
      deaFieldDOM,
      pacIdFieldDOM,
      newPatientsCheckDOM,
      medicareCheckDOM,
      medicaidCheckDOM,
      medicaidCertCheckDOM
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
    .startWith([])

  const specialties$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getConceptByName$specialties')
    .map(res => res.body)
    .map(res => res.elements)
    .startWith([])

  const types$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getConceptByName$practitioner_types')
    .map(res => res.body)
    .map(res => res.elements)
    .startWith([])

  const prefixField = _createTextField('prefix', 'Prefix')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.prefix)
  })

  const firstNameField = _createTextField('first_name', 'First Name')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.first_name)
  })

  const middleNameField = _createTextField('middle_name', 'Middle Name')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.middle_name)
  })

  const lastNameField = _createTextField('last_name', 'Last Name')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.last_name)
  })

  const suffixField = _createTextField('suffix', 'Suffix')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.suffix)
  })

  const emailField = _createTextField('email', 'Email')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.email)
  })

  const phoneField = _createTextField('phone', 'Phone')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.phone)
  })

  const npiField = _createTextField('npi', 'NPI')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.npi)
  })

  const faaField = _createTextField('faa_number', 'FAA Number')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.faa_number)
  })

  const deaField = _createTextField('dea_number', 'DEA License')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.dea_number)
  })

  const pacIdField = _createTextField('pac_id', 'PAC ID')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.pac_id)
  })

  const genderSelect = _createSelect('gender', 'Gender')({
    ...sources,
    options$: Observable.just(genderSelectOptions),
    value$: sources.practitioner$.map(practitioner => practitioner.gender)
  })

  // const medicalSchoolSelect = _createSelect('medical_school', 'Medical School')({
  //   ...sources,
  //   options$: medicalSchool$,
  //   value$: sources.practitioner$.map(practitioner => practitioner.medical_school)
  // })

  const newPatientsCheck = _createCheckbox('accepts_new_patients', '', 'Accepts New Patients')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.accepts_new_patients)
  })

  const medicareCheck = _createCheckbox('accepts_medicare', '', 'Accepts Medicare')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.accepts_medicare)
  })

  const medicaidCheck = _createCheckbox('accepts_medicaid', '', 'Accepts Medicaid')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.accepts_medicaid)
  })

  const medicaidCertCheck = _createCheckbox('medicaid_certified', '', 'Medicaid Certified')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.medicaid_certified)
  })

  const biographyTextarea = _createTextarea('biography')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.biography)
  })

  const medicalSchoolTextSelect = _createTextSelect('medical_school', 'Medical School')({
    ...sources,
    options$: medicalSchool$ || Observable.just([]),
    value$: sources.practitioner$
      .map(practitioner => R.pathOr(null, ['medical_school', 'name'])(practitioner))
  })

  const specialtiesTextSelect = _createTextSelect('specialties', 'Specialties')({
    ...sources,
    options$: specialties$ || Observable.just([]),
    value$: sources.practitioner$
      .map(practitioner => R.pathOr(null, ['specialties'])(practitioner))
  })

  const typesTextSelect = _createTextSelect('types', 'Types')({
    ...sources,
    options$: types$ || Observable.just([]),
    value$: sources.practitioner$
      .map(practitioner => R.pathOr(null, ['types'])(practitioner))
  })

  const formData$ = combineLatestObj({
    prefix: prefixField.value$,
    first_name: firstNameField.value$,
    middle_name: middleNameField.value$,
    last_name: lastNameField.value$,
    suffix: suffixField.value$,
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
    medicaid_certified: medicaidCertCheck.value$,
    biography: biographyTextarea.value$,
    medical_school: medicalSchoolTextSelect.value$,
    specialties: specialtiesTextSelect.value$.map(specialty => [specialty]),
    types: typesTextSelect.value$.map(type => [type])
  })

  const viewState = {
    formData: formData$,
    prefixFieldDOM: prefixField.DOM,
    firstNameFieldDOM: firstNameField.DOM,
    middleNameFieldDOM: middleNameField.DOM,
    lastNameFieldDOM: lastNameField.DOM,
    suffixFieldDOM: suffixField.DOM,
    emailFieldDOM: emailField.DOM,
    phoneFieldDOM: phoneField.DOM,
    genderSelectDOM: genderSelect.DOM,
    medicalSchoolSelectDOM: medicalSchoolTextSelect.DOM,
    specialtiesSelectDOM: specialtiesTextSelect.DOM,
    typesSelectDOM: typesTextSelect.DOM,
    npiFieldDOM: npiField.DOM,
    faaFieldDOM: faaField.DOM,
    deaFieldDOM: deaField.DOM,
    pacIdFieldDOM: pacIdField.DOM,
    newPatientsCheckDOM: newPatientsCheck.DOM,
    medicareCheckDOM: medicareCheck.DOM,
    medicaidCheckDOM: medicaidCheck.DOM,
    medicaidCertCheckDOM: medicaidCertCheck.DOM,
    biographyTextareaDOM: biographyTextarea.DOM,
    practitioner: sources.practitioner$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const HTTP = Observable.merge(
    getConceptByName$({
      ...sources,
      conceptName$: Observable.just('medical_schools')
    }),
    getConceptByName$({
      ...sources,
      conceptName$: Observable.just('specialties')
    }),
    getConceptByName$({
      ...sources,
      conceptName$: Observable.just('practitioner_types')
    })
  )

  return {
    formData$,
    HTTP,
    DOM
  }
}
