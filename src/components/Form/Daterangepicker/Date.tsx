import { ReactElement, useMemo } from 'react'
import clsx from 'clsx'
import {
  isEqual,
  getDaysInMonth,
  getDay,
  isBefore,
  isAfter,
  format
} from 'date-fns'

interface Props {
  headerDate: Date
  dates: [Date?, Date?]
  onChange: (date: Date) => void
  minDate?: string
  maxDate?: string
  start?: boolean
  end?: boolean
  onDecrement?: () => void
  onIncrement?: () => void
}
const DateView = ({
  headerDate,
  dates,
  onChange,
  minDate,
  maxDate,
  start,
  end,
  onDecrement,
  onIncrement
}: Props): ReactElement => {
  const [STARTDATE, ENDDATE] = dates
  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const TODAY = useMemo(() => {
    const now = new Date()

    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])

  const getDate = (date: number): Date =>
    new Date(headerDate.getFullYear(), headerDate.getMonth(), date)

  const isToday = (date: number): boolean => isEqual(getDate(date), TODAY)
  const isBetween = (
    date: Date,
    from: Date,
    to: Date,
    inclusivity = '()'
  ): boolean => {
    if (!['()', '[]', '(]', '[)'].includes(inclusivity)) {
      throw new Error('Inclusivity parameter must be one of (), [], (], [)')
    }

    const isBeforeEqual = inclusivity[0] === '['
    const isAfterEqual = inclusivity[1] === ']'

    return (
      (isBeforeEqual
        ? isEqual(from, date) || isBefore(from, date)
        : isBefore(from, date)) &&
      (isAfterEqual
        ? isEqual(to, date) || isAfter(to, date)
        : isAfter(to, date))
    )
  }
  const selectedClasses = (date: number): string => {
    const DATE = getDate(date)

    if (
      STARTDATE &&
      ENDDATE &&
      isEqual(STARTDATE, ENDDATE) &&
      isEqual(STARTDATE, DATE)
    ) {
      return 'text-white bg-blue-600 rounded-lg'
    }

    if (STARTDATE && isEqual(DATE, STARTDATE)) {
      return 'text-white bg-blue-600 rounded-l-lg'
    }

    if (ENDDATE && isEqual(DATE, ENDDATE)) {
      return 'text-white bg-blue-600 rounded-r-lg'
    }

    if (STARTDATE && ENDDATE && isBetween(DATE, STARTDATE, ENDDATE)) {
      return 'text-blue-600 rounded-none bg-gray-100'
    }

    return 'text-gray-700'
  }

  const dayClasses = (date: number): string => {
    const DATE = getDate(date)
    const selected =
      STARTDATE && ENDDATE && isBetween(DATE, STARTDATE, ENDDATE, '[]')
    const today = isToday(date)

    if (selected) return 'cursor-pointer'

    if (STARTDATE && isEqual(DATE, STARTDATE)) return 'cursor-pointer'

    if (minDate) {
      const MIN = new Date(`${minDate} 00:00:00`)

      if (isBefore(DATE, MIN)) return 'text-gray-300 pointer-events-none'
    }

    if (maxDate) {
      const MAX = new Date(`${maxDate} 23:59:59`)

      if (isAfter(DATE, MAX)) return 'text-gray-300 pointer-events-none'
    }

    if (today && !selected) return 'text-blue-500 bg-blue-200 cursor-pointer'

    return 'hover:bg-gray-100 cursor-pointer'
  }

  const daysBlank = useMemo(
    () =>
      Array.from(
        {
          length: getDay(
            new Date(headerDate.getFullYear(), headerDate.getMonth(), 1)
          )
        },
        (_, i) => i + 1
      ),
    [headerDate]
  )
  const daysDisplay = useMemo(
    () => Array.from({ length: getDaysInMonth(headerDate) }, (_, i) => i + 1),
    [headerDate]
  )

  const handleChange = (date: number): void => {
    onChange(new Date(headerDate.getFullYear(), headerDate.getMonth(), date))
  }

  return (
    <div className='flex flex-col px-6 pt-5 pb-6 border-b border-gray-100'>
      <div className='flex items-center justify-between'>
        <button
          className={clsx(
            'flex items-center justify-center p-2 rounded-xl hover:bg-gray-50',
            { 'pointer-events-none opacity-0': !start }
          )}
          onClick={() => {
            if (onDecrement) onDecrement()
          }}
        >
          <svg className='w-6 h-6 text-gray-900 stroke-current' fill='none'>
            <path
              d='M13.25 8.75L9.75 12l3.5 3.25'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <div className='text-sm font-semibold'>
          {format(headerDate, 'MMMM')}
        </div>
        <button
          className={clsx(
            'flex items-center justify-center p-2 rounded-xl hover:bg-gray-50',
            { 'pointer-events-none opacity-0': !end }
          )}
          onClick={() => {
            if (onIncrement) onIncrement()
          }}
        >
          <svg className='w-6 h-6 text-gray-900 stroke-current' fill='none'>
            <path
              d='M10.75 8.75l3.5 3.25-3.5 3.25'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
      <div className='grid grid-cols-7 text-xs text-center text-gray-900'>
        {DAYS.map((day, i) => (
          <span
            key={i}
            className='flex items-center justify-center w-10 h-10 font-semibold rounded-lg'
          >
            {day}
          </span>
        ))}

        {daysBlank.map((_, i) => (
          <span
            key={i}
            className='flex items-center justify-center w-10 h-10 text-blue-600 rounded-none rounded-tl-lg bg-gray-50'
          />
        ))}

        {daysDisplay.map((d, i) => (
          <div key={i} className={clsx('p-0.5', selectedClasses(d))}>
            <div
              onClick={() => handleChange(d)}
              className={clsx(
                'flex items-center justify-center w-10 h-10 rounded-lg',
                dayClasses(d)
              )}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DateView
