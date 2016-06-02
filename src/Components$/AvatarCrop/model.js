import { Observable } from 'rx'

const getUploadResponse$ = sources => sources.responses$
  .filter(res$ => res$ && res$.request)
  .filter(res$ => res$.request.category === 'postImages$')
  .map(res => res.body)
  .map(res => res.images[0])
  .startWith(null)

const getImage$ = sources => sources.DOM.select('#image')
  .observable
  .filter(images => images.length)
  .map(arr => arr[0])

const getFileUpload$ = (actions$, sources) => actions$.fileInputChange$
  .map(ev => ev.ownerTarget.files[0])
  .filter(file => !!file)
  .merge(actions$.dropAreaDrop$
    .map(ev => {
      ev.preventDefault()
      return ev.dataTransfer.files[0]
    }))
  .flatMap(file => Observable.fromPromise(new Promise((resolve, reject) => {
    const reader = new window.FileReader()
    reader.onload = e => resolve({
      file: file,
      dataURL: e.target.result
    })
    reader.readAsDataURL(file)
  })))
  .merge(actions$.cancelClicks$.map({}))
  .merge(getUploadResponse$(sources).map({}))
  .startWith({})

export default (actions$, sources) => ({
  uploadResponse$: getUploadResponse$(sources),
  image$: getImage$(sources),
  fileUpload$: getFileUpload$(actions$, sources)
})
