import R from 'ramda'
import { div, textarea } from '@cycle/dom'
import isolate from '@cycle/isolate'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, Heading } from 'StyleFn'
import { InputFactory, SelectFactory, CheckboxFactory, TextareaFactory } from 'Components$'

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

const _createSelect = (id, label, options) => SelectFactory({
  ...fieldConfig,
  id,
  label,
  options
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
  npiFieldDOM,
  faaFieldDOM,
  deaFieldDOM,
  pacIdFieldDOM,
  newPatientsCheckDOM,
  medicareCheckDOM,
  medicaidCheckDOM,
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
      firstNameFieldDOM,
      middleNameFieldDOM,
      lastNameFieldDOM,
      emailFieldDOM,
      phoneFieldDOM,
      genderSelectDOM,
      npiFieldDOM,
      faaFieldDOM,
      deaFieldDOM,
      pacIdFieldDOM,
      newPatientsCheckDOM,
      medicareCheckDOM,
      medicaidCheckDOM
      // lastNameFieldDOM,
      // div({
      //   style: {
      //     display: 'flex',
      //     marginTop: '5px'
      //   }
      // }, [
      //   div({
      //     style: {
      //       width: '145px'
      //     }
      //   }),
      //   input({
      //     type: 'radio',
      //     name: 'gender',
      //     checked: !isFemale(practitioner),
      //     style: {
      //       marginRight: '5px'
      //     }
      //   }),
      //   span({
      //     style: {
      //       ...styleRadioLabel,
      //       color: isFemale(practitioner)
      //         ? constants.primary1opaque5
      //         : constants.primary1
      //     }
      //   }, 'Male')
      // ]),
      // div({
      //   style: {
      //     display: 'flex',
      //     marginTop: '5px',
      //     marginBottom: '15px'
      //   }
      // }, [
      //   div({
      //     style: {
      //       width: '145px'
      //     }
      //   }),
      //   input({
      //     type: 'radio',
      //     name: 'gender',
      //     checked: isFemale(practitioner),
      //     style: {
      //       marginRight: '5px'
      //     }
      //   }),
      //   span({
      //     style: {
      //       ...styleRadioLabel,
      //       color: isFemale(practitioner)
      //         ? constants.primary1
      //         : constants.primary1opaque5
      //     }
      //   }, 'Female')
      // ]),
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

  const pacIdField = _createTextField('pac_id', 'DEA License')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.pac_id)
  })

  const genderSelect = _createSelect('gender', 'Gender', genderSelectOptions)({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.gender)
  })

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

  const biographyTextarea = _createTextarea('biography')({
    ...sources,
    value$: sources.practitioner$.map(practitioner => practitioner.biography)
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
    biography: biographyTextarea.value$
  })

  const viewState = {
    formData: formData$,
    firstNameFieldDOM: firstNameField.DOM,
    middleNameFieldDOM: middleNameField.DOM,
    lastNameFieldDOM: lastNameField.DOM,
    emailFieldDOM: emailField.DOM,
    phoneFieldDOM: phoneField.DOM,
    genderSelectDOM: genderSelect.DOM,
    npiFieldDOM: npiField.DOM,
    faaFieldDOM: faaField.DOM,
    deaFieldDOM: deaField.DOM,
    pacIdFieldDOM: pacIdField.DOM,
    newPatientsCheckDOM: newPatientsCheck.DOM,
    medicareCheckDOM: medicareCheck.DOM,
    medicaidCheckDOM: medicaidCheck.DOM,
    biographyTextareaDOM: biographyTextarea.DOM,
    practitioner: sources.practitioner$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    formData$,
    DOM
  }
}
