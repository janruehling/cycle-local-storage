import { div } from '@cycle/dom'

const first = [{
  value: '#21406A',
  name: 'primary1',
  color: '#fff'
}, {
  value: '#6C89AF',
  name: 'primary2',
  color: '#fff'
}, {
  value: '#A6BCD9',
  name: 'primary3',
  color: '#fff'
}, {
  value: '#CFDCEC',
  name: 'primary4',
  color: '#fff'
}, {
  value: '#ECF2F8',
  name: 'primary5',
  color: '#21406A'
}, {
  value: '#F4FAFC',
  name: 'primary6',
  color: '#21406A'
}]

const second = [{
  value: '#DE4249',
  name: 'secondary1',
  color: '#fff'
}]

const third = [{
  value: '#7A57C9',
  name: 'secondary2',
  color: '#fff'
}]

const fourth = [{
  value: '#90BF5A',
  name: 'secondary3',
  color: '#fff'
}]

const fifth = [{
  value: '#333D4A',
  name: 'secondary4',
  color: '#fff'
}]

const columns = [
  first,
  second,
  third,
  fourth,
  fifth
]

const children = [{
  name: '',
  fn: div({
    style: {
      display: 'flex'
    }
  }, [
    columns.map(column => div([
      column.map(item => div({
        style: {
          backgroundColor: item.value,
          color: item.color,
          fontSize: '10px',
          height: '60px',
          textAlign: 'center',
          marginRight: '20px',
          marginBottom: '20px',
          padding: '5px',
          width: '60px'
        }
      }, [
        div(item.name),
        div([item.value])
      ]))
    ]))
  ])
}]

const colorsArray = {
  name: 'Colors',
  style: {
    width: '470px'
  },
  children: children
}

export default colorsArray
