import { Observable } from 'rx'
import R from 'ramda'
import { div } from '@cycle/dom'
import combineLatestObj from 'rx-combine-latest-obj'

import { getIcon } from 'zwUtility'

import { Avatar, Heading } from 'StyleFn'
import { getConceptByName$ } from 'Remote'
import {
  createTextField, createTextSelect, createCheckbox, createTextarea
} from 'Helpers'

import styles from './AddEditForm.css'

const styleLabel = {
  width: '140px'
}

const styleInput = {
  flex: 'initial',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '235px'
}

const styleTextarea = {
  height: '360px',
  width: '100%'
}

const fieldConfig = {
  type: 'text',
  skin: 'narrow',
  styleLabel,
  styleInput
}

const checkboxConfig = {
  styleInput: {
    marginLeft: '145px'
  }
}

const textAreaConfig = {
  styleInput: styleTextarea
}

const _render = ({
  nameFieldDOM,
  phoneFieldDOM,
  emergencyRoomCheckDOM,
  typesSelectDOM,
  hoursMondayFieldDOM,
  hoursTuesdayFieldDOM,
  hoursWednesdayFieldDOM,
  hoursThursdayFieldDOM,
  hoursFridayFieldDOM,
  hoursSaturdayFieldDOM,
  hoursSundayFieldDOM,
  addressStreetFieldDOM,
  addressZipFieldDOM,
  addressStateFieldDOM,
  addressCityFieldDOM,
  addressCountryFieldDOM,
  addressCoordinatesLatitudeFieldDOM,
  addressCoordinatesLongitudeFieldDOM,
  descriptionTextareaDOM,
  location
}) => div({
  className: styles.container
}, [
  div({
    className: styles.columns
  }, [
    div({
      className: styles.firstColumn
    }, [
      Avatar({
        size: 180,
        image: R.pathOr(null, ['image', 'url'])(location),
        icon: getIcon(location, 'location'),
        style: {
          borderRadius: '6px'
        }
      })
    ]),
    div({
      className: styles.secondColumn
    }, [
      nameFieldDOM,
      typesSelectDOM,
      phoneFieldDOM,
      emergencyRoomCheckDOM,
      div([
        Heading({
          text: 'Address'
        }),
        addressStreetFieldDOM,
        addressZipFieldDOM,
        addressStateFieldDOM,
        addressCityFieldDOM,
        addressCountryFieldDOM,
        addressCoordinatesLatitudeFieldDOM,
        addressCoordinatesLongitudeFieldDOM
      ]),
      div([
        Heading({
          text: 'Working Hours'
        }),
        hoursMondayFieldDOM,
        hoursTuesdayFieldDOM,
        hoursWednesdayFieldDOM,
        hoursThursdayFieldDOM,
        hoursFridayFieldDOM,
        hoursSaturdayFieldDOM,
        hoursSundayFieldDOM
      ])
    ]),
    div({
      className: styles.thirdColumn
    }, [
      Heading({
        icon: 'Sheet',
        text: 'Description',
        style: {
          marginTop: 0
        }
      }),
      descriptionTextareaDOM
    ])
  ])
])

export default sources => {
  const types$ = sources.responses$
    .filter(res$ => res$ && res$.request)
    .filter(res$ => res$.request.category === 'getConceptByName$location_types')
    .map(res => res.body)
    .map(res => res.elements)
    .startWith([])

  const nameField = createTextField('name', 'Name', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.name)
      : Observable.just(null)
  })

  const phoneField = createTextField('phone', 'Phone', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.phone)
      : Observable.just(null)
  })

  const typesTextSelect = createTextSelect('type', 'Type', 'value', fieldConfig)({
    ...sources,
    options$: types$ || Observable.just([]),
    value$: sources.location$
      ? sources.location$
        .map(location => R.pathOr(null, ['type'])(location))
      : Observable.just(null)
  })

  const hoursMondayField = createTextField('mon', 'Monday', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['hours', 'mon'])(location))
      : Observable.just(null)
  })

  const hoursTuesdayField = createTextField('tue', 'Tuesday', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['hours', 'tue'])(location))
      : Observable.just(null)
  })

  const hoursWednesdayField = createTextField('wed', 'Wednesday', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['hours', 'wed'])(location))
      : Observable.just(null)
  })

  const hoursThursdayField = createTextField('thu', 'Thursday', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['hours', 'thu'])(location))
      : Observable.just(null)
  })

  const hoursFridayField = createTextField('fri', 'Friday', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['hours', 'fri'])(location))
      : Observable.just(null)
  })

  const hoursSaturdayField = createTextField('sat', 'Saturday', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['hours', 'sat'])(location))
      : Observable.just(null)
  })

  const hoursSundayField = createTextField('sun', 'Sunday', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['hours', 'sun'])(location))
      : Observable.just(null)
  })

  const addressStreetField = createTextField('street_address', 'Street', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['address', 'street_address'])(location))
      : Observable.just(null)
  })

  const addressZipField = createTextField('zipcode', 'ZIP', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['address', 'zipcode'])(location))
      : Observable.just(null)
  })

  const addressStateField = createTextField('state', 'State', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['address', 'state'])(location))
      : Observable.just(null)
  })

  const addressCityField = createTextField('city', 'Street', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['address', 'city'])(location))
      : Observable.just(null)
  })

  const addressCountryField = createTextField('country', 'Street', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['address', 'country'])(location))
      : Observable.just(null)
  })

  const addressCoordinatesLatitudeField = createTextField('latitude', 'Latitude', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['address', 'coordinates', 'latitude'])(location))
      : Observable.just(null)
  })

  const addressCoordinatesLongitudeField = createTextField('longitude', 'Longitude', fieldConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => R.pathOr(null, ['address', 'coordinates', 'longitude'])(location))
      : Observable.just(null)
  })

  const emergencyRoomCheck = createCheckbox('emergency_room', '', 'Emergency Room', checkboxConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.emergency_room)
      : Observable.just(null)
  })

  const descriptionTextarea = createTextarea('description', textAreaConfig)({
    ...sources,
    value$: sources.location$
      ? sources.location$.map(location => location.description)
      : Observable.just(null)
  })

  const formData$ = combineLatestObj({
    name: nameField.value$,
    phone: phoneField.value$,
    emergency_room: emergencyRoomCheck.value$,
    type: typesTextSelect.valueObj$.map(result => result.value),
    description: descriptionTextarea.value$,
    hours: Observable.just({})
      .combineLatest(
        hoursMondayField.value$,
        hoursTuesdayField.value$,
        hoursWednesdayField.value$,
        hoursThursdayField.value$,
        hoursFridayField.value$,
        hoursSaturdayField.value$,
        hoursSundayField.value$
      )
      .map(([_, mon, tue, wed, thu, fri, sat, sun]) => ({
        mon, tue, wed, thu, fri, sat, sun
      }))
      .map(hours => JSON.stringify(hours)),
    address: Observable.just({})
      .combineLatest(
        addressStreetField.value$,
        addressZipField.value$,
        addressStateField.value$,
        addressCityField.value$,
        addressCountryField.value$,
        addressCoordinatesLatitudeField.value$,
        addressCoordinatesLongitudeField.value$
      )
      .map(([_, mon, tue, wed, thu, fri, sat, sun]) => ({
        mon, tue, wed, thu, fri, sat, sun
      }))
      .map(hours => JSON.stringify(hours))
  })

  const viewState = {
    formData: formData$,
    nameFieldDOM: nameField.DOM,
    phoneFieldDOM: phoneField.DOM,
    emergencyRoomCheckDOM: emergencyRoomCheck.DOM,
    typesSelectDOM: typesTextSelect.DOM,
    descriptionTextareaDOM: descriptionTextarea.DOM,
    hoursMondayFieldDOM: hoursMondayField.DOM,
    hoursTuesdayFieldDOM: hoursTuesdayField.DOM,
    hoursWednesdayFieldDOM: hoursWednesdayField.DOM,
    hoursThursdayFieldDOM: hoursThursdayField.DOM,
    hoursFridayFieldDOM: hoursFridayField.DOM,
    hoursSaturdayFieldDOM: hoursSaturdayField.DOM,
    hoursSundayFieldDOM: hoursSundayField.DOM,
    addressStreetFieldDOM: addressStreetField.DOM,
    addressZipFieldDOM: addressZipField.DOM,
    addressStateFieldDOM: addressStateField.DOM,
    addressCityFieldDOM: addressCityField.DOM,
    addressCountryFieldDOM: addressCountryField.DOM,
    addressCoordinatesLatitudeFieldDOM: addressCoordinatesLatitudeField.DOM,
    addressCoordinatesLongitudeFieldDOM: addressCoordinatesLongitudeField.DOM,
    location: sources.location$ || Observable.just({})
  }

  const DOM = combineLatestObj(viewState)
    .map(_render)

  const HTTP = Observable.merge(
    getConceptByName$({
      ...sources,
      conceptName$: Observable.just('location_types')
    })
  )

  return {
    formData$,
    HTTP,
    DOM
  }
}
