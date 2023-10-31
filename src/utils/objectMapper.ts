import _ from 'lodash'

const objectMapper = (template, data = {}): any => {
  const mappedObject = {}

  _.forEach(template, (value, key) => {
    let updatedValue = null

    if (_.isArray(template[key])) {
      const [pathToFindData, arrayTemplate] = template[key]

      updatedValue = arrayMapper(arrayTemplate, _.get(data, pathToFindData, []))
    } else if (_.isObject(template[key])) {
      updatedValue = objectMapper(template[key], data)
    } else {
      updatedValue = _.get(data, value)
    }

    _.set(mappedObject, key, updatedValue)
  })

  return mappedObject
}

const arrayMapper = (template, data = []): any =>
  _.map(data, (item) => {
    const mapper = _.isArray(item) ? arrayMapper : objectMapper

    if (mapper) return mapper(template, item)

    return item
  })

const mapper = ({ template, data }): any => {
  if (!data) throw new Error('Nothing to map. The data property is required')
  if (!template) return data

  const mapper = _.isArray(data) ? arrayMapper : objectMapper

  return mapper(template, data)
}

export { mapper }
