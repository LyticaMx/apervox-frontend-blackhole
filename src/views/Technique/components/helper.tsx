import { format } from 'date-fns'
import { ReactNode } from 'react'
import { differenceParser } from 'utils/differenceParser'
import { mapper } from 'utils/objectMapper'

const targetsTemplate = {
  alias: 'alias',
  phone: 'phone',
  carrier: 'carrier.name',
  overflowLine: 'overflow_line.phone',
  active: 'status',
  endDate: 'end_date'
}

export const getTargetChanges = (
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
        template: targetsTemplate
      })
      if (data.endDate) {
        data.endDate = format(new Date(data.endDate), 'dd/MM/yyyy - HH:mm:ss')
      }

      return <div>{differenceParser(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData) return ''

      const mappedNew = mapper({ data: newData, template: targetsTemplate })
      const mappedOld = mapper({ data: oldData, template: targetsTemplate })
      if (mappedNew.endDate) {
        mappedNew.endDate = format(
          new Date(mappedNew.endDate),
          'dd/MM/yyyy - HH:mm:ss'
        )
      }
      if (mappedOld.endDate) {
        mappedNew.endDate = format(
          new Date(mappedNew.endDate),
          'dd/MM/yyyy - HH:mm:ss'
        )
      }

      return <div>{differenceParser(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}
