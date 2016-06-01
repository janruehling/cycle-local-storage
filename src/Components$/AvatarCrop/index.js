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
  image
}) => {
  return isEditMode
    ? AvatarCrop({
      ...props,
      preview,
      image
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
        aspectRatio: 1 / 1,
        viewMode: 2
      })
    })

  const crops$ = model$.image$
    .filter(image => !!image)
    .flatMap(image => Observable.fromEvent(image, 'crop'))
    .throttle(100)
    .startWith(null)

  const canvas$ = crops$
    .combineLatest(cropper)
    .flatMap(([_, cropper]) => {
      return Observable
        .fromEvent(cropper.element, 'crop')
        .flatMap(_ => {
          return Observable.just(cropper.getCroppedCanvas())
            .filter(canvas => !!canvas)
        })
        .map(canvas => ({
          dataURL: canvas.toDataURL(),
          blob: Observable.fromPromise(new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
              resolve(blob)
            })
          }))
        }))
    })
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
        image: canvas.dataURL || R.pathOr(null, ['data', 'image', 'url'])(entity),
        icon: getIcon(entity || {}, getType(entity))
      })
    })
    .startWith(avatarProps)

  const avatar$ = Avatar$({
    ...sources,
    props$: avatarProps$
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

  const viewState = {
    isEditMode$,
    avatar: avatar$.DOM,
    preview: preview$.DOM,
    props$: sources.props$ || Observable.just({}),
    image: model$.fileUpload$
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
