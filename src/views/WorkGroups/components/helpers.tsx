import { ReactNode } from 'react'
import { differenceParser } from 'utils/differenceParser'
import { mapper } from 'utils/objectMapper'

interface TechniqueStatusI18Key {
  i18Key: string
  i18AbbreviatedKey: string
}

export const getTechniqueStatusI18Key = (
  key: string
): TechniqueStatusI18Key => {
  let i18Key = ''
  let i18AbbreviatedKey = ''

  switch (key) {
    case 'assigned':
      i18Key = 'assignedPluralFemale'
      i18AbbreviatedKey = 'assignedShortAbbreviation'
      break

    case 'current':
      i18Key = 'currentPlural'
      i18AbbreviatedKey = 'currentShortAbbreviation'
      break

    case 'concluding':
      i18Key = 'toConclude'
      i18AbbreviatedKey = 'toConcludeShortAbbreviation'
      break

    case 'concluded':
      i18Key = 'concludedPluralFemale'
      i18AbbreviatedKey = 'concludedShortAbbreviation'
      break

    default:
      break
  }

  return {
    i18Key,
    i18AbbreviatedKey
  }
}

const groupTemplate = {
  name: 'name',
  description: 'description',
  active: 'status',
  techniques: ['techniques', { name: 'name' }],
  users: ['users', { name: 'username' }]
}

export const getGroupChanges = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({
        data: newData,
        template: groupTemplate
      })

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData) return ''

      const mappedNew = mapper({ data: newData, template: groupTemplate })
      const mappedOld = mapper({ data: oldData, template: groupTemplate })

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}
