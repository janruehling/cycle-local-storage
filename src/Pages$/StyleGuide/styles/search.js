import { div } from '@cycle/dom'

import { zwSearch } from 'StyleFn'

const children = [{
  name: 'Default State',
  fn: zwSearch({
    id: 'search',
    placeholder: 'Search for a Person, Organization, Location or Plan'
  }),
  style: {
    marginBottom: '20px',
    width: '100%'
  }
}, {
  name: 'With Results',
  fn: zwSearch({
    id: 'search',
    placeholder: 'Search for a Person, Organization, Location or Plan',
    results: []
  }),
  style: {
    width: '100%'
  }
}]

const searchBar = {
  name: 'Search Bar',
  children: children,
  style: {
    width: '100%'
  }
}

export default searchBar
