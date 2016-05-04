import { Calendar } from 'StyleFn'

const calendar = {
  name: 'Calendar',
  children: [{
    name: '',
    fn: Calendar({
      year: '2019',
      month: 'February'
    })
  }],
  style: {
    marginRight: '40px',
    width: '219px'
  }
}

export default calendar
