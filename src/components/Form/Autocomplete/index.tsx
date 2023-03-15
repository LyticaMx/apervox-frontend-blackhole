import { Fragment, ReactElement, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { Combobox } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { formClasses, labelFormClasses } from 'utils/classes'

type Item = Record<string, any>

export interface Props {
  label?: string
  items: Item[]
  placeholder?: string
  textField: string
  valueField: string
  className?: string
  value: string | number | undefined
  addOption?: boolean
  onChange: (value: any) => void
  onQueryChange?: (value: any) => void
  noFoundText: ReactElement | string
  decoratorField?: string
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
  decoratorField,
  value,
  onChange,
  onQueryChange,
  noFoundText,
  className,
  addOption
}: Props): ReactElement => {
  const [query, setQuery] = useState('')

  const itemSelected = useMemo(() => {
    if (!value) return undefined

    let selected = items.find((item) => item[valueField] === value)

    if (addOption && typeof selected === 'undefined') {
      selected = {
        [valueField]: value,
        [textField]: value
      }
    }

    return selected
  }, [value])

  const filtered = useMemo(() => {
    if (query === '') return items

    return items.filter((item: any) =>
      `${item[textField] as string}`
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    )
  }, [query, items])

  useEffect(() => {
    if (onQueryChange) onQueryChange(query)
  }, [query])

  return (
    <Combobox
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
            <Combobox.Label className={labelFormClasses}>
              {label}
            </Combobox.Label>
          )}
          <div className="relative">
            <Combobox.Input
              className={clsx(
                formClasses,
                decoratorField &&
                  itemSelected?.[textField] === query &&
                  itemSelected?.[decoratorField]
                  ? 'pl-7'
                  : '',
                className
              )}
              placeholder={placeholder}
              displayValue={(item: any) => (item ? item[textField] : '')}
              onChange={(event) => setQuery(event.target.value)}
            />

            {decoratorField &&
              itemSelected?.[decoratorField] &&
              itemSelected[textField] === query && (
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 max-w-[24px] overflow-hidden">
                  {itemSelected[decoratorField]}
                </span>
              )}
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
        </div>

        <Combobox.Options className="w-full overflow-y-scroll max-h-52 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
          {filtered.length === 0 && query !== '' ? (
            addOption ? (
              <Combobox.Option
                value={{ [valueField]: query, [textField]: query }}
                className="relative cursor-default select-none py-2 pr-10 pl-4 hover:bg-blue-100 hover:text-blue-900 text-gray-900"
              >
                {query}
              </Combobox.Option>
            ) : (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                {noFoundText}
              </div>
            )
          ) : (
            filtered.map((item: any) => (
              <Combobox.Option
                key={item[valueField]}
                className="relative cursor-default select-none py-2 pr-10 pl-4 hover:bg-blue-100 hover:text-blue-900 text-gray-900"
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={clsx('block truncate', {
                        'font-medium': selected,
                        'font-normal': !selected,
                        'flex items-center gap-1': decoratorField
                      })}
                    >
                      {decoratorField && <span>{item[decoratorField]}</span>}
                      {item[textField]}
                    </span>
                    {selected ? (
                      <span
                        className={
                          'absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600'
                        }
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
