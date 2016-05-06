import { zwTextarea } from 'StyleFn'

const children = [{
  name: '',
  fn: zwTextarea({
    type: 'text',
    label: 'Default Skin',
    placeholder: 'Placeholder'
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwTextarea({
    type: 'text',
    value: 'Default Skin: Value spanning multiple lines to show how this looks like',
    styleInput: {
      height: '100px'
    }
  }),
  style: {
    marginRight: '20px'
  }
}]

const inputTypes = {
  name: 'zwTextarea',
  children: children
}

export default inputTypes
