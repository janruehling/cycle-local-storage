import { GridItem } from 'StyleFn'

import practitioner2 from 'assets/img/Practitioner2.png'

const children = [{
  name: '',
  fn: GridItem({
    image: practitioner2,
    text: 'Alex C. Efird',
    size: 132
  })
}, {
  name: '',
  fn: GridItem({
    icon: 'Female',
    text: 'Felicity Granville',
    size: 132
  })
}, {
  name: '',
  fn: GridItem({
    icon: 'Male',
    text: 'Salim Hassan',
    size: 132
  })
}]

const gridItem = {
  name: 'GridItem',
  children: children,
  style: {
    marginRight: '100px'
  }
}

export default gridItem
