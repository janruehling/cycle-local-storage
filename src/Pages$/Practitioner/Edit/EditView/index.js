import R from 'ramda'
import { div, textarea } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, Heading } from 'StyleFn'
import { InputFactory } from 'Components$'

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

const textFieldConfig = {
  type: 'text',
  skin: 'narrow',
  styleLabel,
  styleInput
}

const _createTextField = (id, label) => InputFactory({
  ...textFieldConfig,
  id,
  label
})

// const isFemale = practitioner => practitioner.gender === 'female'

const _render = ({
  firstNameFieldDOM,
  middleNameFieldDOM,
  lastNameFieldDOM,
  emailFieldDOM,
  phoneFieldDOM,
  npiFieldDOM,
  faaFieldDOM,
  deaFieldDOM,
  pacIdFieldDOM,
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
      npiFieldDOM,
      faaFieldDOM,
      deaFieldDOM,
      pacIdFieldDOM
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
      textarea({
        value: practitioner.biography,
        className: styles.textArea
      })
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

  const formData$ = combineLatestObj({
    first_name: firstNameField.value$,
    middle_name: middleNameField.value$,
    last_name: lastNameField.value$,
    email: emailField.value$,
    phone: phoneField.value$,
    npi: npiField.value$,
    faa_number: faaField.value$,
    dea_number: deaField.value$,
    pac_id: pacIdField.value$
  })

  const viewState = {
    formData: formData$,
    firstNameFieldDOM: firstNameField.DOM,
    middleNameFieldDOM: middleNameField.DOM,
    lastNameFieldDOM: lastNameField.DOM,
    emailFieldDOM: emailField.DOM,
    phoneFieldDOM: phoneField.DOM,
    npiFieldDOM: npiField.DOM,
    faaFieldDOM: faaField.DOM,
    deaFieldDOM: deaField.DOM,
    pacIdFieldDOM: pacIdField.DOM,
    practitioner: sources.practitioner$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    formData$,
    DOM
  }
}
