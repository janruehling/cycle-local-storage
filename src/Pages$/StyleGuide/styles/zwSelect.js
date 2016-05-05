import { zwSelect } from 'StyleFn'

const selectOptions = [{
  name: 'Male',
  value: 'male'
}, {
  name: 'Female',
  value: 'female'
}]

const children = [{
  name: '',
  fn: zwSelect({
    id: 'gender1',
    label: 'Default Skin',
    options: selectOptions,
    value: 'female'
  }),
  style: {
    marginRight: '20px'
  }
}, {
  name: '',
  fn: zwSelect({
    id: 'gender2',
    skin: 'narrow',
    label: 'Narrow Skin',
    options: selectOptions
  }),
  style: {
    marginRight: '20px'
  }
}]

const inputTypes = {
  name: 'zwSelect',
  children: children
}

export default inputTypes
