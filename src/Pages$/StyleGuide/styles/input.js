import { zwInput } from 'StyleFn'

const children = [{
  name: '',
  fn: zwInput({
    type: 'text',
    value: 'Value'
  })
}, {
  name: '',
  fn: zwInput({
    type: 'text',
    label: 'With label',
    placeholder: 'Placeholder'
  })
}]

const inputTypes = {
  name: 'zwInput',
  children: children
}

export default inputTypes
