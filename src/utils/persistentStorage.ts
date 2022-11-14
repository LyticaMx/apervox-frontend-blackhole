import { isEmpty, isObject } from 'lodash'

const setItem = (keyName: string, data: any): void => {
  let parsed = data

  if (isObject(data)) parsed = JSON.stringify(data)
  window.localStorage.setItem(keyName, parsed)
}

const getItem = (keyName: string): any => {
  if (!keyName || isEmpty(keyName)) return null

  let value: any = window.localStorage.getItem(keyName)

  if (value === null) return null

  if ((!isEmpty(value) && value.slice(0) === '[') || value.slice(0) === '{') {
    value = JSON.parse(value)
  }

  if (value === 'true') value = true
  if (value === 'false') value = false

  return value
}

const removeItem = (keyName: string): void =>
  window.localStorage.removeItem(keyName)

export { getItem, setItem, removeItem }
