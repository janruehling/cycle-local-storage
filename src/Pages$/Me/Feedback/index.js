import { Observable } from 'rx'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'
import { TextareaFactory, SiteHeader$, ToolBar } from 'Components$'
import { mergeOrFlatMapLatest } from 'zwUtility'
import { FormContainer, ErrorMessage, SuccessMessage, Button } from 'StyleFn'
import { postFeedback$ } from 'Remote'

import constants from 'constants.css'
import styles from './Feedback.css'

const _createTextarea = (id) => TextareaFactory({
  id,
  placeholder: 'Enter text',
  styleInput: {
    background: '#fff',
    border: '1px solid ' + constants.color1_5,
    height: '335px',
    width: '100%'
  }
})

const _render = ({
  messageTextareaDOM,
  toolBarDOM,
  headerDOM,
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
      FormContainer({
        style: {
          padding: '20px',
          width: '100%'
        },
        message: message
      }, [
        messageTextareaDOM
      ])
    ])
  ])
])

export default sources => {
  const response$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'postFeedback$')
    .startWith({})

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
          div('Give us feedback')
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
          text: 'Send'
        })
      ]
    })
  })

  const messageTextarea = _createTextarea('biography')({
    ...sources
  })

  const formData$ = combineLatestObj({
    text: messageTextarea.value$
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

  const sendData$ = formData$
    .sample(submit$)
    .flatMap(data => postFeedback$({
      ...sources,
      text$: Observable.just(data.text)
    }))

  const message$ = response$
    .filter(res => res && res.body)
    .map(res => res.body)
    .flatMapLatest(response => {
      if (response.message) {
        if (response.error) return Observable.just(ErrorMessage(response.message))
        return Observable.just(SuccessMessage(response.message))
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
    messageTextareaDOM: messageTextarea.DOM,
    headerDOM$: header.DOM,
    message$
  }

  const redirectOnLogout$ = sources.auth$.filter(auth => !auth).map(() => '/#/login')

  const route$ = Observable.merge(
    mergeOrFlatMapLatest('route$', ...children),
    cancelClick$,
    redirectOnLogout$
  )

  const HTTP = Observable.merge(
    mergeOrFlatMapLatest('HTTP', ...children),
    sendData$
  )

  const DOM = combineLatestObj(viewState).map(_render)

  return {
    DOM,
    route$,
    formData$,
    HTTP,
    message$
  }
}
