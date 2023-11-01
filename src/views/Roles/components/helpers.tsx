import { ReactNode } from 'react'
import { differenceParser } from 'utils/differenceParser'
import { mapper } from 'utils/objectMapper'

const roleTemplate = {
  name: 'name',
  users: ['users', { name: 'username' }],
  active: 'status'
}

export const getRoleChanges = (
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
        template: roleTemplate
      })

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData) return ''

      const mappedNew = mapper({ data: newData, template: roleTemplate })
      const mappedOld = mapper({ data: oldData, template: roleTemplate })

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}
