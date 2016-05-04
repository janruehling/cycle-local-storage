import { div } from '@cycle/dom'

const first = [{
  value: '#21406A',
  name: 'color1',
  color: '#fff'
}, {
  value: '#6C89AF',
  name: 'color1_2',
  color: '#fff'
}, {
  value: '#A6BCD9',
  name: 'color1_3',
  color: '#fff'
}, {
  value: '#CFDCEC',
  name: 'color1_4',
  color: '#fff'
}, {
  value: '#ECF2F8',
  name: 'color1_5',
  color: '#21406A'
}, {
  value: '#F4FAFC',
  name: 'color1_6',
  color: '#21406A'
}]

const second = [{
  value: '#DE4249',
  name: 'color2',
  color: '#fff'
}]

const third = [{
  value: '#7A57C9',
  name: 'color3',
  color: '#fff'
}]

const fourth = [{
  value: '#90BF5A',
  name: 'color4',
  color: '#fff'
}]

const fifth = [{
  value: '#333D4A',
  name: 'color5',
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
