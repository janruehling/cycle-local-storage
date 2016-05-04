import { zwInput } from 'StyleFn'

const children = [{
  name: '',
  fn: zwInput({
    type: 'text',
    label: 'Default Skin',
    placeholder: 'Placeholder'
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwInput({
    type: 'text',
    value: 'Default Skin: Value'
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwInput({
    type: 'text',
    label: 'Narrow Skin',
    placeholder: 'Placeholder',
    skin: 'narrow'
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwInput({
    type: 'text',
    value: 'Narrow Skin: Value',
    skin: 'narrow'
  }),
  style: {
    marginRight: '20px'
  }
}]

const inputTypes = {
  name: 'zwInput',
  children: children
}

export default inputTypes
