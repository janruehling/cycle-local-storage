import { GridItem } from 'StyleFn'

const children = [{
  name: '',
  fn: GridItem({
    image: null,
    gender: 'Male',
    first_name: 'Felicity',
    last_name: 'Granville'
  })
}]

const gridItem = {
  name: 'GridItem',
  children: children
}

export default gridItem
