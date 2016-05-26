import { Observable } from 'rx'
import R from 'ramda'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, Heading } from 'StyleFn'
import { getConceptByName$ } from 'Remote'
import {
  createTextField, createTextarea, createCheckbox, createSelect, createTextSelect
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
  hoursMondayFieldDOM,
  hoursTuesdayFieldDOM,
  hoursWednesdayFieldDOM,
  hoursThursdayFieldDOM,
  hoursFridayFieldDOM,
  hoursSaturdayFieldDOM,
  hoursSundayFieldDOM,
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
      div([
        Heading({
          text: 'Working Hours'
        }),
        hoursMondayFieldDOM,
        hoursTuesdayFieldDOM,
        hoursWednesdayFieldDOM,
        hoursThursdayFieldDOM,
        hoursFridayFieldDOM,
        hoursSaturdayFieldDOM,
        hoursSundayFieldDOM
      ]),
      div([
        Heading({
          text: 'Quick Facts'
        }),
        newPatientsCheckDOM,
        medicaidCheckDOM,
        medicareCheckDOM,
        medicaidCertCheckDOM
      ])
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

  const prefixField = createTextField('prefix', 'Prefix', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.prefix)
      : Observable.just(null)
  })

  const firstNameField = createTextField('first_name', 'First Name', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.first_name)
      : Observable.just(null)
  })

  const middleNameField = createTextField('middle_name', 'Middle Name', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.middle_name)
      : Observable.just(null)
  })

  const lastNameField = createTextField('last_name', 'Last Name', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.last_name)
      : Observable.just(null)
  })

  const suffixField = createTextField('suffix', 'Suffix', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.suffix)
      : Observable.just(null)
  })

  const emailField = createTextField('email', 'Email', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.email)
      : Observable.just(null)
  })

  const phoneField = createTextField('phone', 'Phone', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.phone)
      : Observable.just(null)
  })

  const npiField = createTextField('npi', 'NPI', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.npi)
      : Observable.just(null)
  })

  const faaField = createTextField('faa_number', 'FAA Number', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.faa_number)
      : Observable.just(null)
  })

  const deaField = createTextField('dea_number', 'DEA License', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.dea_number)
      : Observable.just(null)
  })

  const pacIdField = createTextField('pac_id', 'PAC ID', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.pac_id)
      : Observable.just(null)
  })

  const hoursMondayField = createTextField('mon', 'Monday', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['hours', 'mon'])(practitioner))
      : Observable.just(null)
  })

  const hoursTuesdayField = createTextField('tue', 'Tuesday', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['hours', 'tue'])(practitioner))
      : Observable.just(null)
  })

  const hoursWednesdayField = createTextField('wed', 'Wednesday', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['hours', 'wed'])(practitioner))
      : Observable.just(null)
  })

  const hoursThursdayField = createTextField('thu', 'Thursday', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['hours', 'thu'])(practitioner))
      : Observable.just(null)
  })

  const hoursFridayField = createTextField('fri', 'Friday', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['hours', 'fri'])(practitioner))
      : Observable.just(null)
  })

  const hoursSaturdayField = createTextField('sat', 'Saturday', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['hours', 'sat'])(practitioner))
      : Observable.just(null)
  })

  const hoursSundayField = createTextField('sun', 'Sunday', fieldConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['hours', 'sun'])(practitioner))
      : Observable.just(null)
  })

  const genderSelect = createSelect('gender', 'Gender', fieldConfig)({
    ...sources,
    options$: Observable.just(genderSelectOptions),
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.gender)
      : Observable.just(null)
  })

  const newPatientsCheck = createCheckbox('accepts_new_patients', '', 'Accepts New Patients', checkboxConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.accepts_new_patients)
      : Observable.just(null)
  })

  const medicareCheck = createCheckbox('accepts_medicare', '', 'Accepts Medicare', checkboxConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.accepts_medicare)
      : Observable.just(null)
  })

  const medicaidCheck = createCheckbox('accepts_medicaid', '', 'Accepts Medicaid', checkboxConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.accepts_medicaid)
      : Observable.just(null)
  })

  const medicaidCertCheck = createCheckbox('medicaid_certified', '', 'Medicaid Certified', checkboxConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.medicaid_certified)
      : Observable.just(null)
  })

  const biographyTextarea = createTextarea('biography', textAreaConfig)({
    ...sources,
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => practitioner.biography)
      : Observable.just(null)
  })

  const medicalSchoolTextSelect = createTextSelect('medical_school', 'Medical School', 'value', fieldConfig)({
    ...sources,
    options$: medicalSchool$ || Observable.just([]),
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['medical_school', 'name'])(practitioner))
      : Observable.just(null)
  })

  const specialtiesTextSelect = createTextSelect('specialties', 'Specialties', 'value', fieldConfig)({
    ...sources,
    options$: specialties$ || Observable.just([]),
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['specialties'])(practitioner))
      : Observable.just(null)
  })

  const typesTextSelect = createTextSelect('types', 'Types', 'value', fieldConfig)({
    ...sources,
    options$: types$ || Observable.just([]),
    value$: sources.practitioner$
      ? sources.practitioner$.map(practitioner => R.pathOr(null, ['types'])(practitioner))
      : Observable.just(null)
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
    hours: Observable.just({})
      .combineLatest(
        hoursMondayField.value$,
        hoursTuesdayField.value$,
        hoursWednesdayField.value$,
        hoursThursdayField.value$,
        hoursFridayField.value$,
        hoursSaturdayField.value$,
        hoursSundayField.value$
      )
      .map(([_, mon, tue, wed, thu, fri, sat, sun]) => ({
        mon, tue, wed, thu, fri, sat, sun
      }))
      .map(hours => JSON.stringify(hours)),
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
    hoursMondayFieldDOM: hoursMondayField.DOM,
    hoursTuesdayFieldDOM: hoursTuesdayField.DOM,
    hoursWednesdayFieldDOM: hoursWednesdayField.DOM,
    hoursThursdayFieldDOM: hoursThursdayField.DOM,
    hoursFridayFieldDOM: hoursFridayField.DOM,
    hoursSaturdayFieldDOM: hoursSaturdayField.DOM,
    hoursSundayFieldDOM: hoursSundayField.DOM,
    newPatientsCheckDOM: newPatientsCheck.DOM,
    medicareCheckDOM: medicareCheck.DOM,
    medicaidCheckDOM: medicaidCheck.DOM,
    medicaidCertCheckDOM: medicaidCertCheck.DOM,
    biographyTextareaDOM: biographyTextarea.DOM,
    practitioner: sources.practitioner$ || Observable.just({})
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
