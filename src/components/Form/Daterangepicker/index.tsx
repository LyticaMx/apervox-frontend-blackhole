import { ReactElement, useState, useMemo, useEffect } from 'react'
import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { addMonths, subMonths, isDate, isBefore, format } from 'date-fns'
import { CalendarDaysIcon, XMarkIcon } from '@heroicons/react/20/solid'

import { labelFormClasses } from 'utils/classes'
import clsx from 'clsx'
import Menu from './Menu'
import DateView from './Date'
import Switch from 'components/Form/Switch'
import SelectField from '../Select'
import RequiredMarker from '../RequiredMarker'
import { useAutoCloseDialog } from 'hooks/useAutoCloseDialog'

export interface Props {
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
  menu?: boolean
  iconPosition?: 'left' | 'right'
  shadow?: boolean
  requiredMarker?: boolean
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
  menu,
  iconPosition = 'left',
  shadow,
  requiredMarker,
  ...props
}: Props): ReactElement => {
  const [DATE, setDate] = useState(new Date())
  const [dates, setDates] = useState<[Date?, Date?]>([])
  const { open: show, popoverRef, setOpen: setShow } = useAutoCloseDialog()

  const toggle = (): void => {
    setShow(!show)
  }
  const [hours, setHours] = useState<boolean>(false)

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

    return value.map((date) => format(date as Date, formatDisplay)).join(' - ')
  }, [value, formatDisplay])

  const left = useMemo(() => DATE, [DATE])
  const right = useMemo(() => addMonths(DATE, 1), [DATE])
  const decrement = (): void => {
    setDate((prev) => subMonths(prev, 1))
  }

  const increment = (): void => {
    setDate((prev) => addMonths(prev, 1))
  }

  const handleChangeInput = (): void => {
    if (onChange) onChange(dates)

    setShow(false)
  }

  useEffect(() => {
    if (show) setDates(value)
  }, [show])

  return (
    <Popover className="relative inline-block">
      <Float
        show={show}
        placement="bottom-start"
        offset={5}
        shift={6}
        flip={10}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button as="div">
          {label && (
            <label htmlFor={id} className={labelFormClasses}>
              {label}
              {requiredMarker && <RequiredMarker />}
            </label>
          )}
          <div className="relative">
            <div className="absolute top-0 left-0 px-3 py-2">
              {iconPosition === 'left' && (
                <CalendarDaysIcon
                  onClick={toggle}
                  className="cursor-pointer h-6 w-6 text-gray-400"
                />
              )}
            </div>
            <input
              id={id}
              type="text"
              readOnly
              className={clsx('cursor-pointer', 'text-field', {
                'pr-20': clearable && iconPosition === 'right',
                'pr-10': clearable && iconPosition === 'left',
                'pl-10': iconPosition === 'left',
                'border-red-500 border-2': error,
                'shadow-blackhole-md': shadow
              })}
              {...props}
              value={inputValue}
              onClick={toggle}
            />
            <div className="flex gap-2 absolute top-0 right-0 px-3 py-2">
              {clearable && inputValue && (
                <XMarkIcon
                  onClick={(e) => {
                    if (onChange) onChange([])

                    e.stopPropagation()
                  }}
                  className="cursor-pointer h-6 w-6 text-gray-400"
                />
              )}
              {iconPosition === 'right' && (
                <CalendarDaysIcon
                  onClick={toggle}
                  className="cursor-pointer h-6 w-6 text-gray-400"
                />
              )}
            </div>
          </div>
          {helperText && (
            <label className="text-xs text-red-500">{helperText}</label>
          )}
        </Popover.Button>
        <Popover.Panel
          static
          className="bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none z-10"
        >
          <div className="flex bg-white shadow-lg rounded-xl" ref={popoverRef}>
            {menu && <Menu onClick={setDates} />}
            <div className="flex flex-col divide-y">
              {/* HEADER */}
              <div className="p-4 flex gap-4 items-end">
                <div className="flex items-end">
                  <div>
                    <span className="text-sm">Desde</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex items-center w-28 px-2 py-1 text-sm text-gray-900 rounded-md border-gray-300 border"
                        placeholder="18 / 02 / 2021"
                        value={dates[0] ? format(dates[0], formatDisplay) : ''}
                        onChange={() => {}}
                      />

                      {hours && (
                        <SelectField
                          className="!min-h-[auto] !py-1 min-w-[5rem]"
                          items={[
                            { text: '00:00', value: '00:00' },
                            { text: '01:00', value: '01:00' }
                          ]}
                          value="01:00"
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-1">
                    <svg
                      className="w-6 h-6 text-gray-900 stroke-current"
                      fill="none"
                    >
                      <path
                        d="M6.738 12.012h10.5m-4.476 4.25l4.5-4.25-4.5-4.25"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm">Hasta</span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex items-center w-28 px-2 py-1 text-sm text-gray-900 rounded-md border-gray-300 border"
                        placeholder="11 / 03 / 2021"
                        value={dates[1] ? format(dates[1], formatDisplay) : ''}
                        onChange={() => {}}
                      />

                      {hours && (
                        <SelectField
                          className="!min-h-[auto] !py-1 min-w-[5rem]"
                          items={[
                            { text: '00:00', value: '00:00' },
                            { text: '01:00', value: '01:00' }
                          ]}
                          value="01:00"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Switch
                    size="sm"
                    value={hours}
                    onChange={setHours}
                    color="blue"
                  />
                  <span className="text-sm">Incluir hora</span>
                </div>
              </div>
              {/* BODY */}
              <div className="flex divide-x">
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
              <div className="flex items-center justify-end px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    className="px-4 py-2 text-sm rounded-lg bg-gray-50 focus:outline-none hover:bg-gray-100"
                    onClick={() => setShow(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm text-white enabled:bg-blue-600 disabled:bg-blue-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 hover:enabled:bg-blue-700"
                    onClick={() => handleChangeInput()}
                    disabled={dates.length !== 2}
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
