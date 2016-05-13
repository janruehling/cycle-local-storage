import R from 'ramda'
import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { InputFactory, SelectFactory, SiteHeader$, ToolBar } from 'Components$'
import { getIcon, mergeOrFlatMapLatest } from 'zwUtility'
import { Avatar, FormContainer, ErrorMessage, Button } from 'StyleFn'
import { getMe$ } from 'Remote'

import constants from 'constants.css'
import styles from './Account.css'

const styleLabel = {
  width: '140px'
}

const styleInput = {
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const fieldConfig = {
  type: 'text',
  skin: 'narrow',
  styleLabel,
  styleInput
}

const _createTextField = (id, label) => InputFactory({
  ...fieldConfig,
  id,
  label
})

const _createSelect = (id, label, options) => SelectFactory({
  ...fieldConfig,
  id,
  label,
  options
})

const genderSelectOptions = [{
  name: '',
  value: '0'
}, {
  name: 'Male',
  value: '1'
}, {
  name: 'Female',
  value: '2'
}]

const _render = ({
  toolBarDOM,
  me,
  firstNameFieldDOM,
  lastNameFieldDOM,
  emailFieldDOM,
  phoneFieldDOM,
  genderSelectDOM,
  headerDOM,
  formData$,
  message
}) => div([
  headerDOM,
  div({
    className: styles.container
  }, [
    toolBarDOM,
    div({
      className: styles.main
    }, [
      div({
        className: styles.firstColumn
      }, [
        Avatar({
          size: 180,
          image: R.pathOr(null, ['image', 'url'])(me),
          icon: getIcon(me, 'practitioner'),
          style: {
            borderRadius: '6px'
          }
        })
      ]),
      div({
        className: styles.secondColumn
      }, [
        FormContainer({
          message: message
        }, [
          firstNameFieldDOM,
          lastNameFieldDOM,
          emailFieldDOM,
          phoneFieldDOM,
          genderSelectDOM
        ])
      ])
    ])
  ])
])

export default sources => {
  const GETresponse$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getMe$')
    .filter(res => !R.isEmpty(res))
    .map(res => res.body)

  const PUTresponse$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'putMe$')
    .filter(res => !R.isEmpty(res))
    .map(res => res.body)

  const me$ = GETresponse$
    .filter(response => response && !!response.user)
    .map(response => response.user)

  const toolBar = ToolBar({
    ...sources,
    tools$: Observable.just({
      left: [
        div({
          style: {
            fontSize: '24px',
            fontWeight: 'bold'
          }
        }, [
          div('Account Settings')
        ])
      ],
      right: [
        Button({
          background: constants.color1_3,
          id: 'cancel',
          skin: 'narrow',
          text: 'Cancel',
          style: {
            marginRight: '10px'
          }
        }),
        Button({
          background: constants.color2,
          id: 'save',
          skin: 'narrow',
          text: 'Save & Close'
        })
      ]
    })
  })

  const firstNameField = _createTextField('first_name', 'First Name')({
    ...sources,
    value$: me$.map(me => me.first_name)
  })

  const lastNameField = _createTextField('last_name', 'Last Name')({
    ...sources,
    value$: me$.map(me => me.last_name)
  })

  const phoneField = _createTextField('phone', 'Phone')({
    ...sources,
    value$: me$.map(me => me.phone)
  })

  const genderSelect = _createSelect('gender', 'Gender', genderSelectOptions)({
    ...sources,
    value$: me$.map(me => me.gender)
  })

  const formData$ = combineLatestObj({
    first_name: firstNameField.value$,
    last_name: lastNameField.value$,
    phone: phoneField.value$,
    gender: genderSelect.value$
  })

  const cancelClick$ = sources.DOM.select('#cancel')
    .events('click')
    .map(ev => ({
      type: 'go',
      value: -1
    }))

  const submit$ = sources.DOM
    .select('#save')
    .events('click')
    .map(true)

  const saveData$ = formData$
    .sample(submit$)
    .combineLatest(sources.config$,
      (formData, config) => ({config, formData})
    )
    .map(({config, formData}) => {
      return {
        url: config.api + '/me',
        method: 'PUT',
        category: 'putMe$',
        send: formData
      }
    })

  const successRedirect$ = PUTresponse$
    .filter(response => !response.error)
    .map(ev => ({
      type: 'go',
      value: -1
    }))

  const message$ = GETresponse$
    .merge(PUTresponse$)
    .filter(response => response && !!response.error)
    .merge(formData$.map(data => ({
      message: null
    })))
    .flatMapLatest(response => {
      if (response.message) {
        return Observable.just(ErrorMessage(response.message))
      }

      return Observable.just(null)
    })
    .startWith(null)

  const header = SiteHeader$({
    ...sources,
    message$: message$
  })

  const children = [header]

  const viewState = {
    toolBarDOM: toolBar.DOM,
    formData: formData$,
    firstNameFieldDOM: firstNameField.DOM,
    lastNameFieldDOM: lastNameField.DOM,
    phoneFieldDOM: phoneField.DOM,
    genderSelectDOM: genderSelect.DOM,
    me$,
    headerDOM$: header.DOM,
    message$
  }

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/#/login')

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    cancelClick$,
    successRedirect$,
    redirectOnLogout$
  )

  const HTTP = Observable.merge(
    mergeOrFlatMapLatest('HTTP', ...children),
    saveData$,
    getMe$(sources)
  )

  const storageRequest$ = PUTresponse$
    .filter(response => response && !!response.user)
    .map(response => response.user)
    .flatMap(data => {
      return Observable.just({
        profile: JSON.stringify(data)
      })
    })

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM,
    storage: storageRequest$,
    route$,
    formData$,
    HTTP,
    message$
  }
}
