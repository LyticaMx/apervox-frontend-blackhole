import { isArray } from 'lodash'
import { ReactNode } from 'react'
import { messages } from './messages'
import { generalMessages } from 'globalMessages'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export const differenceParser = (
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

      // For undefineds
      if (typeof oldCell === 'undefined') {
        oldCell = formatter(messages.empty)
      }
      if (typeof newCell === 'undefined') {
        newCell = formatter(messages.empty)
      }

      const message = messages[key] ? formatter(messages[key]) : key
      if (oldCell !== newCell) {
        out.push(
          <p className="flex items-center gap-1">
            <span className="font-semibold">{message}:</span>{' '}
            <span className="line-through">{oldCell}</span>
            <ArrowLongRightIcon className="h-2 w-2 inline-block mx-1" />
            <span>{newCell}</span>
          </p>
        )
      } else {
        out.push(
          <p className="flex items-center gap-1">
            <span className="font-semibold">{message}:</span> {oldCell}
          </p>
        )
      }
    }
    return out
  }

  for (const key in data) {
    let cell = data[key]
    if (typeof cell === 'undefined') {
      cell = formatter(messages.empty)
    } else if (isArray(cell)) {
      if (cell.length === 0) cell = formatter(messages.empty)
      else cell = cell.map((item) => item.name).join(', ')
    } else if (typeof cell === 'boolean') {
      cell = cell
        ? formatter(generalMessages.yes)
        : formatter(generalMessages.no)
    }

    out.push(
      <p className="flex items-center gap-1">
        <span className="font-semibold">
          {messages[key] ? formatter(messages[key]) : key}:
        </span>{' '}
        {cell}
      </p>
    )
  }

  return out
}
