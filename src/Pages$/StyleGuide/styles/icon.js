import { Icon } from 'StyleFn'

const icons = ['Hamburger', 'Back', 'Calendar', 'Contact', 'Flag', 'Hospital',
  'Photo', 'Sheet', 'Shield', 'Tick', 'AvatarFemale', 'AvatarMale']

const children = icons.map(icon => {
  return {
    name: icon,
    fn: Icon({
      icon: icon,
      style: {
        fontSize: '62px'
      }
    })
  }
})

const iconArr = {
  name: 'Icon',
  children: children
}

export default iconArr
