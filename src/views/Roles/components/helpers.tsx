import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { generalMessages } from 'globalMessages'
import { isArray } from 'lodash'
import { ReactNode } from 'react'
import { messages } from 'views/Audit/utils/messages'
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

      return <div>{parseOutput(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData) return ''

      const mappedNew = mapper({ data: newData, template: roleTemplate })
      const mappedOld = mapper({ data: oldData, template: roleTemplate })

      return <div>{parseOutput(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}

const parseOutput = (
  formatter: Function,
  data?: any,
  oldData?: any
): ReactNode[] => {
  const out: ReactNode[] = []
  if (oldData) {
    for (const key in oldData) {
      let oldCell = oldData[key]
      let newCell = data[key]
      if (isArray(oldCell)) {
        oldCell =
          oldCell.length === 0
            ? formatter(messages.empty)
            : oldCell.map((item) => item.name).join(', ')
        newCell =
          newCell.length === 0
            ? formatter(messages.empty)
            : newCell.map((item) => item.name).join(', ')
      } else if (typeof oldCell === 'boolean') {
        oldCell = oldCell
          ? formatter(generalMessages.yes)
          : formatter(generalMessages.no)
        newCell = newCell
          ? formatter(generalMessages.yes)
          : formatter(generalMessages.no)
      }

      if (oldCell !== newCell) {
        out.push(
          <p>
            <span className="font-semibold">{formatter(messages[key])}:</span>{' '}
            <span className="line-through">{oldCell}</span>
            <span className="mx-1">
              <ArrowLongRightIcon className="h-2 w-2 inline-block" />
            </span>
            <span>{newCell}</span>
          </p>
        )
      } else {
        out.push(
          <p>
            <span className="font-semibold">{formatter(messages[key])}:</span>{' '}
            {oldCell}
          </p>
        )
      }
    }
    return out
  }

  for (const key in data) {
    let cell = data[key]
    if (isArray(cell)) {
      if (cell.length === 0) cell = formatter(messages.empty)
      else cell = cell.map((item) => item.name).join(', ')
    } else if (typeof cell === 'boolean') {
      cell = cell
        ? formatter(generalMessages.yes)
        : formatter(generalMessages.no)
    }

    out.push(
      <p>
        <span className="font-semibold">
          {messages[key] ? formatter(messages[key]) : key}:
        </span>{' '}
        {cell}
      </p>
    )
  }

  return out
}
