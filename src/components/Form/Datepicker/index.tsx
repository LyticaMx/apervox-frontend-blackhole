import { useState, useMemo, ReactElement, useEffect, useRef } from 'react'
import clsx from 'clsx'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  XMarkIcon
} from '@heroicons/react/20/solid'
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isValid,
  parseISO
} from 'date-fns'
import { useOnClickOutside } from 'usehooks-ts'

import { formClasses, labelFormClasses } from 'utils/classes'

import DateView from './Date'
import MonthView from './Month'
import RequiredMarker from '../RequiredMarker'

type DatepickerType = 'date' | 'month' | 'year'
export interface Props {
  label?: string
  formatDisplay: string
  name?: string
  id?: string
  clearable?: boolean
  required?: boolean
  value: any
  onChange: (element: any) => any
  error?: boolean
  helperText?: string
  placeholder?: string
  minDate?: string
  maxDate?: string
  requiredMarker?: boolean
  disabled?: boolean
}

const Datepicker = ({
  formatDisplay,
  id,
  label,
  helperText,
  error,
  value,
  onChange,
  clearable,
  minDate,
  maxDate,
  requiredMarker,
  disabled,
  ...props
}: Props): ReactElement => {
  const ref = useRef(null)
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [type, setType] = useState<DatepickerType>('date')

  const handleClickOutside = (): void => {
    setShowDatepicker(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  const decrement = (): void => {
    switch (type) {
      case 'date':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1))
        break
      case 'month':
        setDatepickerHeaderDate((prev) => subYears(prev, 1))
        break
      case 'year':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1))
        break
    }
  }

  const increment = (): void => {
    switch (type) {
      case 'date':
        setDatepickerHeaderDate((prev) => addMonths(prev, 1))
        break
      case 'month':
        setDatepickerHeaderDate((prev) => addYears(prev, 1))
        break
      case 'year':
        setDatepickerHeaderDate((prev) => subMonths(prev, 1))
        break
    }
  }

  const setDateValue = (date: number) => () => {
    const newDate = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date
    )

    onChange(newDate)
    setShowDatepicker(false)
  }
  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    )
    setType('date')
  }

  const toggleDatepicker = (): void => {
    if (!disabled) setShowDatepicker((prev) => !prev)
  }

  const showMonthPicker = (): void => setType('month')

  const showYearPicker = (): void => setType('date')

  const inputValue = useMemo(() => {
    if (!selectedDate) return ''
    return format(selectedDate, formatDisplay)
  }, [selectedDate, formatDisplay])

  useEffect(() => {
    if (typeof value === 'string') {
      const parsed = parseISO(value)
      if (isValid(parsed)) {
        setSelectedDate(parsed)
        setDatepickerHeaderDate(parsed)
      } else setSelectedDate(undefined)
    } else if (value instanceof Date) {
      setSelectedDate(value)
      setDatepickerHeaderDate(value)
    } else {
      setSelectedDate(undefined)
      setDatepickerHeaderDate(new Date())
    }
  }, [value])

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelFormClasses}>
          {label} {requiredMarker && <RequiredMarker />}
        </label>
      )}
      <div className="relative" ref={ref}>
        <input type="hidden" name="date" />
        <input
          id={id}
          type="text"
          readOnly
          className={clsx(
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            formClasses,
            {
              'border-red-500 border-2': error
            }
          )}
          {...props}
          disabled={disabled}
          value={inputValue}
          onClick={toggleDatepicker}
        />
        {helperText && (
          <label className="text-xs text-red-500">{helperText}</label>
        )}
        <div className="flex gap-2 absolute top-0 right-0 px-3 py-2">
          {clearable && selectedDate && (
            <XMarkIcon
              onClick={() => onChange(undefined)}
              className="cursor-pointer h-6 w-6 text-gray-400"
            />
          )}
          <CalendarDaysIcon
            onClick={toggleDatepicker}
            className={clsx(
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              'h-6 w-6 text-gray-400'
            )}
          />
        </div>
        {showDatepicker && (
          <div className="bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0 z-10 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <div>
                <button
                  type="button"
                  className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                  onClick={decrement}
                >
                  <ChevronLeftIcon className="h-6 w-6 text-gray-500 inline-flex" />
                </button>
              </div>
              {type === 'date' && (
                <div
                  onClick={showMonthPicker}
                  className="text-sm rounded-lg text-gray-900  bg-white font-semibold py-2.5 px-5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <p className="text-center">
                    {format(datepickerHeaderDate, 'MMMM yyyy')}
                  </p>
                </div>
              )}
              {type === 'month' && (
                <div
                  onClick={showYearPicker}
                  className="text-sm rounded-lg text-gray-900  bg-white font-semibold py-2.5 px-5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  <p className="text-center">
                    {format(datepickerHeaderDate, 'yyyy')}
                  </p>
                </div>
              )}
              <div>
                <button
                  type="button"
                  className="transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full"
                  onClick={increment}
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-500 inline-flex" />
                </button>
              </div>
            </div>
            {type === 'date' && (
              <DateView
                headerDate={datepickerHeaderDate}
                selectedDate={selectedDate}
                setDateValue={setDateValue}
                minDate={minDate}
                maxDate={maxDate}
              />
            )}
            {type === 'month' && (
              <MonthView
                headerDate={datepickerHeaderDate}
                selectedDate={selectedDate}
                setMonthValue={setMonthValue}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Datepicker.defaultProps = {
  formatDisplay: 'yyyy-MM-dd',
  placeholder: 'Seleccionar fecha',
  clearable: false
}

export default Datepicker
