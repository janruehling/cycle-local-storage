import R from 'ramda'
import { Observable } from 'rx'
import { div, input, span, textarea } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, zwInput, Heading } from 'StyleFn'
import { InputFactory } from 'Components$'

import constants from 'constants.css'
import styles from './EditView.css'

const FirstNameField = InputFactory({
  id: 'first_name',
  type: 'text',
  label: 'First Name',
  // value: practitioner.first_name,
  skin: 'narrow',
  styleLabel,
  styleInput
})

const styleLabel = {
  width: '140px'
}

const styleRadioLabel = {
  fontWeight: 'bold',
  fontSize: '14px'
}

const styleInput = {
  flex: 'initial',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '235px'
}

const isFemale = practitioner => practitioner.gender === 'female'

const _render = ({
  firstNameFieldDOM,
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
      zwInput({
        id: 'middle_name',
        type: 'text',
        label: 'Middle Name',
        value: practitioner.middle_name,
        skin: 'narrow',
        styleLabel,
        styleInput
      }),
      zwInput({
        id: 'last_name',
        type: 'text',
        label: 'Last Name',
        value: practitioner.last_name,
        skin: 'narrow',
        styleLabel,
        styleInput
      }),
      div({
        style: {
          display: 'flex',
          marginTop: '5px'
        }
      }, [
        div({
          style: {
            width: '145px'
          }
        }),
        input({
          type: 'radio',
          name: 'gender',
          checked: !isFemale(practitioner),
          style: {
            marginRight: '5px'
          }
        }),
        span({
          style: {
            ...styleRadioLabel,
            color: isFemale(practitioner)
              ? constants.primary1opaque5
              : constants.primary1
          }
        }, 'Male')
      ]),
      div({
        style: {
          display: 'flex',
          marginTop: '5px',
          marginBottom: '15px'
        }
      }, [
        div({
          style: {
            width: '145px'
          }
        }),
        input({
          type: 'radio',
          name: 'gender',
          checked: isFemale(practitioner),
          style: {
            marginRight: '5px'
          }
        }),
        span({
          style: {
            ...styleRadioLabel,
            color: isFemale(practitioner)
              ? constants.primary1
              : constants.primary1opaque5
          }
        }, 'Female')
      ]),
      zwInput({
        id: 'npi',
        type: 'text',
        label: 'NPI',
        value: practitioner.npi,
        skin: 'narrow',
        styleLabel,
        styleInput
      }),
      zwInput({
        id: 'medical_school',
        type: 'text',
        label: 'Medical School',
        value: R.pathOr(null, ['medical_school', 'name'])(practitioner),
        skin: 'narrow',
        styleLabel,
        styleInput
      }),
      zwInput({
        id: 'dea',
        type: 'text',
        label: 'DEA license',
        value: practitioner.dea_number,
        skin: 'narrow',
        styleLabel,
        styleInput
      })
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
  const firstNameField = FirstNameField(sources)

  const formData$ = Observable.just({
    first_name: firstNameField.value$
  })

  const viewState = {
    formData: formData$,
    firstNameFieldDOM: firstNameField.DOM,
    practitioner: sources.practitioner$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  return {
    formData$,
    DOM
  }
}
