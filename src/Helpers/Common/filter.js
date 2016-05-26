import R from 'ramda'

export const filterChangedFields = (newObj, originalObj) => {
  if (!R.is(Object, newObj) || !R.is(Object, originalObj)) throw new Error('filterChangedFields only works on Objects')
  const out = {}
  const changedKeys = key => R.not(R.equals(newObj[key], originalObj[key]))
  const buildObj = key => { out[key] = newObj[key] }

  R.compose(
    R.map(buildObj),
    R.filter(changedKeys)
  )(R.keys(newObj))

  return out
}
