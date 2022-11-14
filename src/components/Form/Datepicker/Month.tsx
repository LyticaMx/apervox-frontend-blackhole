import { ReactElement } from 'react'
import clsx from 'clsx'
import { format, isEqual } from 'date-fns'

interface Props {
  headerDate: Date
  selectedDate: Date | undefined
  setMonthValue: (month: number) => any
}
const MonthView = ({
  setMonthValue,
  headerDate,
  selectedDate
}: Props): ReactElement => {
  const isSelectedMonth = (month: number): boolean =>
    selectedDate
      ? isEqual(
          new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
          selectedDate
        )
      : false

  return (
    <div className='flex flex-wrap -mx-1'>
      {Array(12)
        .fill(null)
        .map((_, i) => (
          <div key={i} onClick={setMonthValue(i)} style={{ width: '25%' }}>
            <div
              className={clsx(
                // 'cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200',
                'cursor-ponter text-sm rounded-lg font-semibold py-3 px-2.5 text-center focus:outline-none focus:ring-2 focus:ring-gray-200',
                {
                  'bg-blue-500 text-white': isSelectedMonth(i),
                  'bg-white text-gray-700 hover:bg-gray-100': !isSelectedMonth(i)
                }
              )}
            >
              {format(
                new Date(headerDate.getFullYear(), i, headerDate.getDate()),
                'MMM'
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default MonthView
