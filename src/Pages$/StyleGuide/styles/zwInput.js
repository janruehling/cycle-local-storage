import { zwInput } from 'StyleFn'

const children = [{
  name: '',
  fn: zwInput({
    type: 'text',
    label: 'Default Skin',
    placeholder: 'Placeholder'
  })
}, {
  name: '',
  fn: zwInput({
    type: 'text',
    value: 'Default Skin: Value'
  })
}, {
  name: '',
  fn: zwInput({
    type: 'text',
    label: 'Narrow Skin',
    placeholder: 'Placeholder',
    skin: 'narrow'
  })
}, {
  name: '',
  fn: zwInput({
    type: 'text',
    value: 'Narrow Skin: Value',
    skin: 'narrow'
  })
}]

const inputTypes = {
  name: 'zwInput',
  children: children
}

export default inputTypes
