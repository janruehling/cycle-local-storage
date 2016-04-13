import { GridItem } from 'StyleFn'

const children = [{
  name: '',
  fn: GridItem({
    image: null,
    icon: 'Male',
    first_name: 'Felicity',
    last_name: 'Granville',
    size: 132
  })
}]

const gridItem = {
  name: 'GridItem',
  children: children
}

export default gridItem
