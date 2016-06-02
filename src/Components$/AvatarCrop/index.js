import { Observable } from 'rx'
import R from 'ramda'
import Cropper from 'cropperjs'
import combineLatestObj from 'rx-combine-latest-obj'

import { AvatarCrop } from 'StyleFn'
import { Avatar$ } from 'Components$'
import { postImages$ } from 'Remote'

import { getIcon, getType } from 'zwUtility'

import intent from './intent'
import model from './model'

const _render = ({
  avatar,
  preview,
  isEditMode,
  props,
  image,
  entity
}) => {
  return isEditMode
    ? AvatarCrop({
      ...props,
      preview,
      image,
      entity
    })
    : avatar
}

export const AvatarCrop$ = sources => {
  const actions$ = intent(sources)
  const model$ = model(actions$, sources)

  actions$.uploadClicks$
    .do(_ => {
      const fileInput = document.getElementById('fileInput')
      fileInput.click()
    })
    .subscribe()

  const cropper = model$.image$
    .withLatestFrom(sources.entity$)
    .map(([image, entity]) => {
      return new Cropper(image, {
        aspectRatio: 1 / 1, // Number (NaN)
        dragMode: 'move', // crop, move, none (crop)
        viewMode: 2, // Number 0 - 3 (0)
        data: null, // Object (null)
        preview: '', // jQuery selector ('')
        responsive: false, // Boolean (true)
        restore: false, // Boolean (true)
        checkCrossOrigin: true, // Boolean (true)
        checkOrientation: true, // Boolean (true) -- might cause problems in IE < 10
        modal: true, // Boolean (true)
        guides: true, // Boolean (true)
        center: true, // Boolean (true)
        highlight: true, // Boolean (true)
        background: true, // Boolean (true)
        autoCrop: true, // Boolean (true),
        autoCropArea: 0.8, // Number 0 - 1 (0.8)
        movable: true, // Boolean (true)
        rotatable: true, // Boolean (true)
        scalable: true, // Boolean (true)
        zoomable: true, // Boolean (true)
        zoomOnTouch: true, // Boolean (true)
        zoomOnWheel: true, // Boolean (true)
        wheelZoomRatio: 0.1, // Number (0.1)
        cropBoxMovable: true, // Boolean (true)
        cropBoxResizable: true, // Boolean (true)
        toggleDragModeOnDblclick: true, // Boolean (true)
        minContainerWidth: 200, // Number (200)
        minContainerHeight: 200, // Number (200)
        minCanvasWidth: 0, // Number (0)
        minCanvasHeight: 0, // Number (0)
        minCropBoxWidth: 0, // Number (0)
        minCropBoxHeight: 0, // Number (0)
        build: null, // Function (null)
        built: null, // Function (null)
        cropstart: null, // Function (null)
        cropmove: null, // Function (null)
        cropend: null, // Function (null)
        crop: null, // Function (null)
        zoom: null // Function (null)
      })
    })

  const crops$ = model$.image$
    .filter(image => !!image)
    .flatMap(image => Observable.fromEvent(image, 'crop'))
    .throttle(100)
    .startWith(null)

  const canvas$ = crops$
    .combineLatest(cropper, model$.fileUpload$)
    .flatMap(([_, cropper, originalFile]) => {
      return Observable
        .fromEvent(cropper.element, 'crop')
        .flatMap(_ => {
          return Observable.just(cropper.getCroppedCanvas({
            height: 200,
            width: 200
          }))
            .filter(canvas => !!canvas)
        })
        .map(canvas => ({
          dataURL: canvas.toDataURL(R.pathOr('image/png', ['file', 'type'])(originalFile)),
          blob: Observable.fromPromise(new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
              resolve(blob)
            }, R.pathOr('image/png', ['file', 'type'])(originalFile), 0.8)
          }))
        }))
    })
    .merge(actions$.cancelClicks$.map({}))
    .startWith({})
    .shareReplay()

  const avatarProps = {
    isEditable: true,
    size: 180,
    image: null,
    icon: getIcon({}, 'entity'),
    style: {
      borderRadius: '6px'
    }
  }

  const avatarProps$ = sources.entity$
    .combineLatest(canvas$)
    .map(([entity, canvas]) => {
      return R.merge(avatarProps, {
        image: canvas.dataURL || R.pathOr(null, ['image', 'url'])(entity),
        icon: getIcon((entity || {}), getType(entity))
      })
    })
    .merge(actions$.cancelClicks$
        .combineLatest(sources.entity$)
        .map(([_, entity]) => R.merge(avatarProps, {
          image: R.pathOr(null, ['image', 'url'])(entity),
          icon: getIcon((entity || {}), getType(entity))
        })))
    .merge(actions$.removeButtonClick$.map(avatarProps))
    .startWith(avatarProps)

  const avatar$ = Avatar$({
    ...sources,
    props$: avatarProps$
      .map(props => ({
        ...props
      }))
  })

  const preview$ = Avatar$({
    ...sources,
    props$: avatarProps$.map(props => ({
      ...props,
      isEditable: false
    }))
  })

  const uploadImage$ = canvas$
    .sample(actions$.confirmClicks$)
    .flatMap(canvas => canvas.blob)
    .combineLatest(sources.auth$)
    .flatMap(([blob, auth]) => {
      const formData = new window.FormData()

      formData.append('images', blob)

      return postImages$({
        ...sources,
        data$: Observable.just(formData)
      })
    })

  const isEditMode$ = actions$
    .cancelClicks$.map(false)
    .merge(avatar$.actions$.addButtonClick$.map(true))
    .merge(model$.uploadResponse$.map(false))
    .startWith(false)

  // const currentImage$ = sources.entity$
  //   .sample(actions$.cropCurrentButtonClicks$)
  //   .pluck('image')
  //   .filter(image => !!image)
  //   .pluck('url')
  //   .flatMap(url => {
  //     return Observable.fromPromise(new Promise((resolve, reject) => {
  //       const img = new window.Image()
  //
  //       img.crossOrigin = 'anonymous'
  //
  //       img.onload = function () {
  //         const canvas = document.createElement('canvas')
  //         canvas.width = this.width
  //         canvas.height = this.height
  //
  //         const ctx = canvas.getContext('2d')
  //         ctx.drawImage(this, 0, 0)
  //
  //         const dataURL = canvas.toDataURL('image/png')
  //
  //         resolve(dataURL)
  //       }
  //       img.src = url
  //     }))
  //   })

  const viewState = {
    isEditMode$,
    avatar: avatar$.DOM,
    preview: preview$.DOM,
    props$: sources.props$ || Observable.just({}),
    image: model$.fileUpload$
      .map(file => file.dataURL),
      // .merge(currentImage$),
    entity: sources.entity$
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const HTTP = Observable.merge(
    uploadImage$
  )

  return {
    DOM,
    HTTP,
    actions$,
    value$: model$.uploadResponse$
      .merge(avatar$.actions$.removeButtonClick$.map(null))
  }
}
