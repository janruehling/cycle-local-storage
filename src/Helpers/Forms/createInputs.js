import isolate from '@cycle/isolate'

import {
  InputFactory, TextSelectFactory2, CheckboxFactory, TextareaFactory, SelectFactory
} from 'Components$'

export const createTextField = (id, label, config) => isolate(InputFactory({
  ...config,
  id,
  label
}))

export const createCheckbox = (id, label, description, config) => isolate(CheckboxFactory({
  ...config,
  id,
  label,
  description
}))

export const createTextarea = (id, config) => isolate(TextareaFactory({
  ...config,
  id
}))

export const createSelect = (id, label, config, options$) => isolate(SelectFactory({
  ...config,
  id,
  label,
  options$
}))

export const createTextSelect = (id, label, valueProp, config) => isolate(TextSelectFactory2({
  ...config,
  id,
  label,
  valueProp
}))
