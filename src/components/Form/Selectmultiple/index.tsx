import { Fragment, ReactElement, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { Combobox } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useOnClickOutside } from 'usehooks-ts'

import { formClasses, labelFormClasses } from 'utils/classes'
import { useGlobalMessage } from 'hooks/useIntl'

type Item = Record<string, any>

export interface Props {
  label?: string
  items: Item[]
  textField: string
  valueField: string
  value: string | number | undefined
  selected: Array<string | number>
  onChange: (value: any) => void
  noFoundText: string
}
const defaultProps: Props = {
  items: [],
  textField: 'text',
  valueField: 'value',
  selected: [],
  value: undefined,
  onChange: () => {},
  noFoundText: 'Nothing found.'
}

const Selectmultiple = ({
  label,
  items,
  textField,
  valueField,
  selected,
  onChange,
  noFoundText
}: Props): ReactElement => {
  const ref = useRef(null)
  const getMessage = useGlobalMessage()
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)

  const handleClickOutside = (): void => {
    setShow(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  const filtered = useMemo(() => {
    if (query === '') {
      return items.map((item) => ({
        ...item,
        selected: selected.includes(item[valueField])
      }))
    }

    return items
      .filter((item: any) =>
        `${item[textField] as string}`
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )
      .map((item) => ({
        ...item,
        selected: selected.includes(item[valueField])
      }))
  }, [query, selected])

  const handleChange = (item): void => {
    setQuery('')
    let newSelected: Array<string | number> = []

    if (selected.includes(item[valueField])) {
      newSelected = selected.filter((value) => value !== item[valueField])
    } else {
      newSelected = [...selected, item[valueField]]
    }

    onChange(newSelected)
  }

  return (
    <div ref={ref}>
      <Combobox value={''} onChange={handleChange}>
        <Float
          as="div"
          className="relative"
          placement="bottom-start"
          offset={5}
          shift={6}
          flip={10}
          floatingAs={Fragment}
          show={show}
        >
          <div>
            {label && (
              <Combobox.Label className={labelFormClasses}>
                {label}
              </Combobox.Label>
            )}
            <div className="relative">
              <Combobox.Input
                className={formClasses}
                placeholder={`${getMessage('search', 'actionsMessages')}...`}
                displayValue={(item: any) => (item ? item[textField] : '')}
                onChange={(event) => setQuery(event.target.value)}
                onClick={() => {
                  setShow(true)
                }}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-2"
                onClick={() => {
                  setShow((prev) => !prev)
                }}
              >
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <Combobox.Options
            static
            className="w-full overflow-y-scroll max-h-52 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none"
          >
            {filtered.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                {noFoundText}
              </div>
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
                          'font-normal': !selected
                        })}
                      >
                        {item[textField]}
                      </span>
                      {item.selected ? (
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
      {!!selected.length && (
        <p className="text-sm text-gray-500 mt-1">
          {getMessage('selected', 'generalMessages')}: {selected.length}
        </p>
      )}
    </div>
  )
}

Selectmultiple.defaultProps = defaultProps

export default Selectmultiple
