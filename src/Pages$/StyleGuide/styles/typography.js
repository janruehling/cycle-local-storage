import { div } from '@cycle/dom'

const items = [
  {
    style: {
      fontSize: '44px',
      marginBottom: '20px'
    },
    label: null,
    text: 'Helvetica Neue'
  }, {
    style: {
      fontSize: '24px',
      fontWeight: 'normal',
      marginBottom: '20px'
    },
    label: 'Search entry',
    text: 'Regular 24px'
  }, {
    style: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    label: 'Header 1',
    text: 'Bold 24px'
  }, {
    style: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    label: 'Header 2',
    text: 'Bold 18px'
  }, {
    style: {
      fontSize: '18px',
      fontWeight: 'normal',
      marginBottom: '15px'
    },
    label: 'Body 2',
    text: 'Regular 18px'
  }, {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    label: 'Header 3',
    text: 'Bold 16px'
  }, {
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    label: 'Header 4',
    text: 'Bold 14px'
  }, {
    style: {
      fontSize: '14px',
      fontWeight: 'normal',
      marginBottom: '15px'
    },
    label: 'Body 1',
    text: 'Regular 14px'
  }, {
    style: {
      fontSize: '12px',
      fontWeight: 'normal',
      marginBottom: '15px'
    },
    label: 'Button / Subtext',
    text: 'Regular 12px'
  }
]

const children = [{
  name: '',
  fn: div({
    style: {
      color: '#333D4A',
      fontFamily: 'Helvetica Neue'
    }
  }, [
    items.map(item => div({
      style: {
        display: 'flex',
        ...item.style
      }
    }, [
      item.label && div({
        style: {
          width: '170px'
        }
      }, item.label),
      div(item.text)
    ]))
  ])
}]

const typography = {
  name: 'Typography',
  style: {
    width: '400px'
  },
  children: children
}

export default typography
