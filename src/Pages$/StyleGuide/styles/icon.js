import { Icon } from 'StyleFn'

const icons = ['Info', 'Warn', 'Phone', 'Envelope', 'Hamburger', 'Up', 'Forward', 'Down', 'Back', 'Drop', 'Grid', 'List', 'TickRound', 'CrossRound', 'Calendar', 'Contact', 'Flag', 'Hospital',
  'Photo', 'Sheet', 'Shield', 'Tick', 'Female', 'Male', 'Edit', 'Remove', 'Plus', 'Account', 'TOS', 'ZCard', 'Feedback', 'Date', 'Sort']

const children = icons.map(icon => {
  return {
    name: '',
    fn: Icon({
      icon: icon,
      style: {
        fontSize: '28px',
        marginRight: '20px',
        marginBottom: '20px'
      }
    })
  }
})

const iconArr = {
  name: 'Icon',
  children: children,
  style: {
    width: '310px'
  }
}

export default iconArr
