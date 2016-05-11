import { filterBar } from 'StyleFn'

const children = [{
  name: '',
  fn: filterBar({
    props: {
      title: 'FILTER',
      children: [{
        id: 'all',
        name: 'All',
        isActive: true
      }, {
        id: 'advancedFilters',
        name: 'Advanced Filters',
        isActive: false
      }]
    }
  }),
  style: {
    width: '100%'
  }
}]

const filterBarDOM = {
  name: 'Filter Bar',
  children: children,
  style: {
    width: '100%'
  }
}

export default filterBarDOM
