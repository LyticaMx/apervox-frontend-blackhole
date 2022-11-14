import { Fragment, ReactElement, useMemo, useState } from 'react'
import clsx from 'clsx'
import { Combobox } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { formClasses, labelFormClasses } from 'utils/classes'

type Item = Record<string, any>

interface Props {
  label?: string
  items: Item[]
  placeholder?: string
  textField: string
  valueField: string
  value: string | number | undefined
  onChange: (value: any) => void
  noFoundText: string
}
const defaultProps: Props = {
  items: [],
  textField: 'text',
  valueField: 'value',
  value: undefined,
  onChange: () => {},
  noFoundText: 'Nothing found.'
}

const Autocomplete = ({
  label,
  items,
  placeholder,
  textField,
  valueField,
  value,
  onChange,
  noFoundText
}: Props): ReactElement => {
  const [query, setQuery] = useState('')

  const itemSelected = useMemo(() => {
    if (!value) return undefined

    return items.find(item => item[valueField] === value)
  }, [value])

  const filtered = useMemo(() => {
    if (query === '') return items

    return items.filter((item: any) =>
      `${item[textField] as string}`
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    )
  }, [query])

  return (
    <Combobox
      value={itemSelected}
      onChange={item => onChange(item[valueField])}
    >
      <Float
        as='div'
        className='relative'
        placement='bottom-start'
        offset={5}
        shift={6}
        flip={10}
        floatingAs={Fragment}
      >
        <div>
          {label && (
            <Combobox.Label className={labelFormClasses}>
              {label}
            </Combobox.Label>
          )}
          <div className='relative'>
            <Combobox.Input
              className={formClasses}
              placeholder={placeholder}
              displayValue={(item: any) => (item ? item[textField] : '')}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </div>
        </div>

        <Combobox.Options className='w-full overflow-y-scroll max-h-52 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none'>
          {filtered.length === 0 && query !== '' ? (
            <div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
              {noFoundText}
            </div>
          ) : (
            filtered.map((item: any) => (
              <Combobox.Option
                key={item[valueField]}
                className='relative cursor-default select-none py-2 pr-10 pl-4 hover:bg-blue-100 hover:text-blue-900 text-gray-900'
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx('block truncate', {
                        'font-medium': selected,
                        'font-normal': !selected
                      })}
                    >
                      {item[textField]}
                    </span>
                    {selected ? (
                      <span
                        className={
                          'absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600'
                        }
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Float>
    </Combobox>
  )
}

Autocomplete.defaultProps = defaultProps

export default Autocomplete
