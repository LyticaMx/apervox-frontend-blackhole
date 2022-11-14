import { subDays, subMonths } from 'date-fns'
import { ReactElement } from 'react'

interface Props {
  onClick: (dates: [Date, Date]) => void
}
const Menu = ({ onClick }: Props): ReactElement => {
  const handleClick = (sub: number, type: string = 'days'): void => {
    const now = new Date()
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (type) {
      case 'days':
        onClick([subDays(date, sub), date])
        break
      case 'months':
        onClick([subMonths(date, sub), date])
        break
    }
  }
  return (
    <div className='py-6 border-r border-gray-100'>
      <ul className='flex flex-col text-xs'>
        <li>
          <button
            className='px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left'
            onClick={() => {
              handleClick(7)
            }}
          >
            Last 7 days
          </button>
        </li>
        <li>
          <button
            className='px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left'
            onClick={() => {
              handleClick(14)
            }}
          >
            Last 14 days
          </button>
        </li>
        <li>
          <button
            className='px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left'
            onClick={() => {
              handleClick(30)
            }}
          >
            Last 30 days
          </button>
        </li>
        <li>
          <button
            className='px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left'
            onClick={() => {
              handleClick(3, 'months')
            }}
          >
            Last 3 months
          </button>
        </li>
        <li>
          <button
            className='px-6 py-1.5 w-full leading-5 hover:bg-gray-50 hover:text-blue-600 text-left'
            onClick={() => {
              handleClick(12, 'months')
            }}
          >
            Last 12 months
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Menu
