import { div, img, input } from '@cycle/dom'
import R from 'ramda'

import { Button } from 'StyleFn'

import constants from 'constants.css'

const cropArea = options => div([
  img({
    id: 'image',
    src: options.image || null,
    style: {
      maxWidth: '100%'
    }
  })
])

const uploadOptions = options => div({
  style: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}, [
  div({
    style: {
      color: constants.color1_3,
      fontSize: '24px',
      fontWeight: 'bold'
    }
  }, 'Drag files here'),
  div({
    style: {
      color: constants.color1_3,
      fontSize: '24px'
    }
  }, 'or'),
  Button({
    id: 'uploadButton',
    background: constants.color1,
    text: 'Upload a file',
    style: {
      marginTop: '10px'
    }
  }),
  input({
    id: 'fileInput',
    type: 'file',
    style: {
      visibility: 'hidden'
    }
  })
])

export const AvatarCrop = (options = {}) => {
  options.style = options.style || {}
  return div([
    div({
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'rgba(207, 220, 236, .8)'
      }
    }),
    div({
      style: {
        background: constants.color1_6,
        borderRadius: '4px',
        boxShadow: '0 0 8px 0 rgba(0, 0, 0, .3)',
        display: 'flex',
        margin: '-8px 0 40px -8px',
        padding: '8px',
        position: 'relative',
        width: '800px',
        zIndex: 100
      }
    }, [
      div([
        options.preview || options.avatar,
        (false && R.pathOr(null, ['image', 'url'])(options.entity) && !options.image) ? Button({
          id: 'cropCurrentButton',
          text: 'Crop current image',
          background: constants.color1,
          style: {
            marginTop: '10px',
            padding: '0 5px',
            width: '180px'
          }
        }) : null
      ]),
      div({
        style: {
          flex: '1',
          marginLeft: '8px'
        }
      }, [
        div({
          id: 'dropArea',
          style: {
            alignItems: 'center',
            background: '#fff',
            border: '2px dashed ' + constants.color1_3,
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            height: '600px',
            justifyContent: 'center'
          },
          ondragover: ev => false
        }, [
          options.image
            ? cropArea(options)
            : uploadOptions(options)
        ]),
        div({
          style: {
            display: 'flex',
            marginTop: '10px',
            justifyContent: 'flex-end'
          }
        }, [
          Button({
            id: 'cancelButton',
            background: constants.color1_3,
            text: 'Cancel',
            style: {
              marginRight: '10px'
            }
          }),
          Button({
            id: 'confirmButton',
            background: constants.color4,
            text: 'Confirm'
          })
        ])
      ])
    ])
  ])
}
