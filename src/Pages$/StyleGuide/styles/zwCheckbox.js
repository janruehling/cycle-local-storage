import { zwCheckbox } from 'StyleFn'

const selectOptions = [{
  name: 'Male',
  value: 'male'
}, {
  name: 'Female',
  value: 'female'
}]

const children = [{
  name: '',
  fn: zwCheckbox({
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
  fn: zwCheckbox({
    id: 'gender2',
    description: 'The description / secondary label',
    options: selectOptions
  }),
  style: {
    marginRight: '20px'
  }
}]

const out = {
  name: 'zwCheckbox',
  children: children
}

export default out
