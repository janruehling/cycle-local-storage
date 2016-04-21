import { Icon } from 'StyleFn'

const icons = ['Info', 'Warn', 'Phone', 'Envelope', 'Hamburger', 'Up', 'Forward', 'Down', 'Back', 'Drop', 'Grid', 'List', 'TickRound', 'CrossRound', 'Calendar', 'Contact', 'Flag', 'Hospital',
  'Photo', 'Sheet', 'Shield', 'Tick', 'Female', 'Male']

const children = icons.map(icon => {
  return {
    name: icon,
    fn: Icon({
      icon: icon,
      style: {
        fontSize: '32px'
      }
    })
  }
})

const iconArr = {
  name: 'Icon',
  children: children
}

export default iconArr
