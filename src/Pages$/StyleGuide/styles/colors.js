import { div } from '@cycle/dom'
import constants from 'constants.css'

const colors = [
  'primary1',
  'primary1opaque5',
  'primary1opaque8',
  'primary2',
  'primary3',
  'primary4',
  'primary5',
  'secondary1',
  'secondary2',
  'secondary3',
  'additional1',
  'additional1opaque75',
  'additional2',
  'additional3',
  'additional4',
  'additional5',
  'additional6',
  'additional7',
  'additional8',
  'additional9',
  'additional10',
  'additional11',
  'additional12',
  'additional13',
  'additional14',
  'additional15',
  'additional16',
  'additional17'
]

const children = colors.map(color => {
  return {
    name: '',
    fn: div({
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '10px',
        textAlign: 'center'
      }
    }, [
      div({
        style: {
          backgroundColor: constants[color],
          border: '2px solid #000',
          height: '60px',
          margin: '15px',
          width: '60px'
        }
      }),
      div(color),
      div('(' + constants[color] + ')')
    ])
  }
})

const colorsArray = {
  name: 'Colors',
  children: children
}

export default colorsArray
