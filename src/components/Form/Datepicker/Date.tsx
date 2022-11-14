import { ReactElement, useMemo } from 'react'
import clsx from 'clsx'
import { isEqual, getDaysInMonth, getDay, isBefore, isAfter } from 'date-fns'

interface Props {
  headerDate: Date
  selectedDate: Date | undefined
  setDateValue: (date: number) => any
  minDate?: string
  maxDate?: string
}
const DateView = ({
  headerDate,
  selectedDate,
  setDateValue,
  minDate,
  maxDate
}: Props): ReactElement => {
  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const TODAY = useMemo(() => {
    const now = new Date()

    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])

  const getDate = (date: number): Date =>
    new Date(headerDate.getFullYear(), headerDate.getMonth(), date)
  const isSelectedDay = (date: number): boolean =>
    selectedDate ? isEqual(getDate(date), selectedDate) : false
  const isToday = (date: number): boolean => isEqual(getDate(date), TODAY)

  const dayClasses = (date: number): string => {
    const DATE = getDate(date)
    const selected = isSelectedDay(date)
    const today = isToday(date)

    if (selected) return 'bg-blue-500 text-white cursor-pointer'

    if (minDate) {
      const MIN = new Date(`${minDate} 00:00:00`)

      if (isBefore(DATE, MIN)) return 'text-gray-300 pointer-events-none'
    }

    if (maxDate) {
      const MAX = new Date(`${maxDate} 23:59:59`)

      if (isAfter(DATE, MAX)) return 'text-gray-300 pointer-events-none'
    }

    if (today && !selected) return 'text-blue-500 bg-blue-200 cursor-pointer'

    return 'text-gray-700 hover:bg-gray-100 cursor-pointer'
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

  return (
    <>
      <div className='flex flex-wrap mb-3 -mx-1'>
        {DAYS.map((day, i) => (
          <div key={i} style={{ width: '14.26%' }} className='px-1'>
            <div className='dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400'>
              {day}
            </div>
          </div>
        ))}
      </div>
      <div className='datepicker-grid w-64 grid grid-cols-7'>
        {daysBlank.map((_, i) => (
          <div
            key={i}
            className='text-center border p-1 border-transparent text-sm'
          ></div>
        ))}
        {daysDisplay.map((d, i) => (
          <div key={i} className='p-0.5'>
            <div
              onClick={setDateValue(d)}
              className={clsx(
                'datepicker-cell block flex-1 leading-9 border-0 rounded-lg text-center font-semibold text-sm day',
                dayClasses(d)
                // {
                //   'bg-blue-500 text-white': isSelectedDay(d),
                //   'text-gray-700 hover:bg-gray-100':
                //     !isToday(d) && !isSelectedDay(d),
                //   'text-blue-500 bg-blue-200 ': isToday(d) && !isSelectedDay(d)
                // }
              )}
            >
              {d}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DateView
