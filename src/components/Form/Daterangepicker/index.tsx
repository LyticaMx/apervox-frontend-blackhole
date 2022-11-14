import { ReactElement, useState, useMemo, useEffect } from 'react'
import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { addMonths, subMonths, isDate, isBefore, format } from 'date-fns'
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/20/solid'

import { formClasses, labelFormClasses } from 'utils/classes'
import clsx from 'clsx'
import Menu from './Menu'
import DateView from './Date'

interface Props {
  id?: string
  name?: string
  label?: string
  value?: [Date?, Date?]
  required?: boolean
  onChange?: (dates: [Date?, Date?]) => void
  formatDisplay?: string
  clearable?: boolean
  error?: boolean
  helperText?: string
  placeholder?: string
  minDate?: string
  maxDate?: string
}

const Daterangepicker = ({
  id,
  label,
  helperText,
  error,
  value = [],
  onChange,
  formatDisplay = 'dd/MM/yyyy',
  clearable,
  minDate,
  maxDate,
  ...props
}: Props): ReactElement => {
  const [DATE, setDate] = useState(new Date())
  const [dates, setDates] = useState<[Date?, Date?]>([])

  const [show, setShow] = useState(false)
  const toggle = (): void => {
    setShow(!show)
  }
  const handleChange = (date: Date): void => {
    if (!isDate(dates[0])) {
      setDates([date])
    } else {
      if (dates.length === 2) {
        setDates([date])
      } else {
        if (dates[0] && isBefore(date, dates[0])) {
          setDates([date])
        } else {
          setDates([dates[0], date])
        }
      }
    }
  }

  const inputValue = useMemo(() => {
    if (value.length < 2) return ''

    return value.map(date => format(date as Date, formatDisplay)).join(' - ')
  }, [value, formatDisplay])

  const left = useMemo(() => DATE, [DATE])
  const right = useMemo(() => addMonths(DATE, 1), [DATE])
  const decrement = (): void => {
    setDate(prev => subMonths(prev, 1))
  }

  const increment = (): void => {
    setDate(prev => addMonths(prev, 1))
  }

  const handleChangeInput = (): void => {
    if (onChange) onChange(dates)

    setShow(false)
  }

  useEffect(() => {
    if (show) setDates(value)
  }, [show])

  return (
    <Popover className='relative inline-block'>
      <Float
        show={show}
        placement='bottom-start'
        offset={5}
        shift={6}
        flip={10}
        portal
        enter='transition duration-200 ease-out'
        enterFrom='opacity-0 -translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition duration-150 ease-in'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 -translate-y-1'
      >
        <Popover.Button as='div'>
          {label && (
            <label htmlFor={id} className={labelFormClasses}>
              {label}
            </label>
          )}
          <div className='relative'>
            <input
              id={id}
              type='text'
              readOnly
              className={clsx('cursor-pointer pr-20', formClasses, {
                'border-red-500 border-2': error
              })}
              {...props}
              value={inputValue}
              onClick={toggle}
            />
            <div className='flex gap-2 absolute top-0 right-0 px-3 py-2'>
              {clearable && inputValue && (
                <XMarkIcon
                  onClick={e => {
                    if (onChange) onChange([])

                    e.stopPropagation()
                  }}
                  className='cursor-pointer h-6 w-6 text-gray-400'
                />
              )}
              <CalendarDaysIcon
                onClick={toggle}
                className='cursor-pointer h-6 w-6 text-gray-400'
              />
            </div>
          </div>
          {helperText && (
            <label className='text-xs text-red-500'>{helperText}</label>
          )}
        </Popover.Button>
        <Popover.Panel
          static
          className='bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-10'
        >
          <div className='flex bg-white shadow-lg rounded-xl'>
            <Menu onClick={setDates} />
            <div className='flex flex-col'>
              <div className='flex divide-x'>
                <DateView
                  dates={dates}
                  headerDate={left}
                  onChange={handleChange}
                  onDecrement={decrement}
                  start
                  minDate={minDate}
                  maxDate={maxDate}
                />
                <DateView
                  dates={dates}
                  headerDate={right}
                  onChange={handleChange}
                  onIncrement={increment}
                  end
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </div>

              {/* FOOTER */}
              <div className='flex items-center justify-between px-6 py-4'>
                <div className='flex items-center'>
                  <input
                    type='text'
                    className='flex items-center w-32 px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none'
                    placeholder='18 / 02 / 2021'
                    value={dates[0] ? format(dates[0], formatDisplay) : ''}
                  />
                  <div className='p-1'>
                    <svg
                      className='w-6 h-6 text-gray-900 stroke-current'
                      fill='none'
                    >
                      <path
                        d='M6.738 12.012h10.5m-4.476 4.25l4.5-4.25-4.5-4.25'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <input
                    type='text'
                    className='flex items-center w-32 px-4 py-2 text-sm text-gray-900 rounded-lg bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-600 focus:outline-none'
                    placeholder='11 / 03 / 2021'
                    value={dates[1] ? format(dates[1], formatDisplay) : ''}
                  />
                </div>
                <div className='flex items-center space-x-2'>
                  <button
                    className='px-4 py-2 text-sm rounded-lg bg-gray-50 focus:outline-none hover:bg-gray-100'
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='px-4 py-2 text-sm text-white bg-blue-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 hover:bg-blue-700'
                    onClick={() => handleChangeInput()}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default Daterangepicker
