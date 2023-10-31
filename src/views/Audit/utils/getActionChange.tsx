import { ReactNode } from 'react'
import { mapper } from 'utils/objectMapper'
import { isArray } from 'lodash'
import { messages } from './messages'
import templates from './templates.json'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export const getActionChangeMessage = (
  formatter: Function,
  moduleName: string,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (moduleName) {
    case 'users':
      return getUserMessage(formatter, action, oldData, newData)
    case 'groups':
      return getGroupMessage(formatter, action, oldData, newData)
    case 'roles':
      return getRolesMessage(formatter, action, oldData, newData)
    case 'letterhead':
      return getLetterheadMessage(formatter, action, oldData, newData)
    default:
      return ''
  }
}

const getUserMessage = (
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
        template: templates.user
      })

      return <div>{parseOutput(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData || !oldData) return ''
      const mappedNew = mapper({ data: newData, template: templates.user })
      const mappedOld = mapper({ data: oldData, template: templates.user })

      return <div>{parseOutput(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}

const getGroupMessage = (
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
        template: templates.group
      })

      return <div>{parseOutput(formatter, data)}</div>
    }
    case 'updated': {
      if (!newData) return ''

      const mappedNew = mapper({ data: newData, template: templates.group })
      const mappedOld = mapper({ data: oldData, template: templates.group })

      return <div>{parseOutput(formatter, mappedNew, mappedOld)}</div>
    }
    case 'exported':
      return 'exported'
    default:
      return ''
  }
}

const getRolesMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): ReactNode => {
  switch (action) {
    case 'created': {
      if (!newData) return ''
      const data = mapper({ data: newData, template: templates.roles })
      return <div>{parseOutput(formatter, data)}</div>
    }
    case 'updated': {
      return ''
    }
    case 'exported': {
      return ''
    }
    default:
      return ''
  }
}

const getLetterheadMessage = (
  formatter: Function,
  action: string,
  oldData?: any,
  newData?: any
): string => {
  switch (action) {
    case 'created':
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
        oldCell = oldCell ? formatter(messages.yes) : formatter(messages.no)
        newCell = newCell ? formatter(messages.yes) : formatter(messages.no)
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
      cell = cell ? formatter(messages.yes) : formatter(messages.no)
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
