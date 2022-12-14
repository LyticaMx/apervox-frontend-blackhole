import { Fragment, ReactElement, useMemo } from 'react'

import { Listbox } from '@headlessui/react'
import { Float } from '@headlessui-float/react'

import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon
} from '@heroicons/react/20/solid'
import { formClasses, labelFormClasses } from 'utils/classes'
import clsx from 'clsx'

type Item = Record<string, any>

interface Props {
  label?: string
  placeholder?: string
  items: Item[]
  textField: string
  valueField: string
  value: string | number | undefined
  onChange: (value: any) => void
  clearable: boolean
  error?: boolean
  helperText?: string
}

const defaultProps: Props = {
  items: [],
  textField: 'text',
  valueField: 'value',
  value: undefined,
  onChange: () => {},
  clearable: false
}

const SelectField = ({
  label,
  items,
  textField,
  valueField,
  value,
  placeholder,
  onChange,
  clearable,
  error,
  helperText
}: Props): ReactElement => {
  const itemSelected = useMemo(() => {
    if (!value) return undefined

    return items.find((item) => item[valueField] === value)
  }, [value])

  const handleClear = (e: any): void => {
    e.preventDefault()

    onChange(null)
  }
  return (
    <Listbox
      value={itemSelected}
      onChange={(item) => onChange(item[valueField])}
    >
      <Float
        as="div"
        className="relative"
        placement="bottom-start"
        offset={5}
        shift={6}
        flip={10}
        floatingAs={Fragment}
      >
        <div>
          {label && (
            <Listbox.Label className={labelFormClasses}>{label}</Listbox.Label>
          )}
          <Listbox.Button
            className={clsx('min-h-[2.625rem] relative', formClasses, {
              'border-red-500 border-2': error
            })}
          >
            {itemSelected && (
              <span className="block truncate text-left">
                {itemSelected[textField]}
              </span>
            )}
            {!itemSelected && (
              <span className="block truncate text-left text-gray-400">
                {placeholder}
              </span>
            )}
            <span className="flex gap-2 absolute inset-y-0 right-0 items-center pr-2">
              {itemSelected && clearable && (
                <XMarkIcon
                  onClick={handleClear}
                  className="h-5 w-5 text-gray-400 cursor-pointer"
                />
              )}
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400 pointer-events-none"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          {helperText && (
            <label className="text-xs text-red-500">{helperText}</label>
          )}
        </div>
        <Listbox.Options className="w-full overflow-y-scroll max-h-52 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
          {items.map((item, index) => (
            <Listbox.Option
              key={index}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pr-10 pl-4 ${
                  active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                }`
              }
              value={item}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {item[textField]}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Float>
    </Listbox>
  )
}

SelectField.defaultProps = defaultProps

export default SelectField
