import { Fragment, ReactElement, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { useOnClickOutside } from 'usehooks-ts'

import { Combobox } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import Chip, { Props as ChipProps } from 'components/Tag'
import { labelFormClasses } from 'utils/classes'
import { useGlobalMessage } from 'hooks/useIntl'
import RequiredMarker from '../RequiredMarker'

type Item = Record<string, any>

export enum ActionSelect {
  Deselect = 0,
  Select = 1
}

interface Detail {
  type: ActionSelect
  item: string | number
}

export interface Props {
  label?: string
  items: Item[]
  textField?: string
  valueField?: string
  value?: string | number
  selected: Array<string | number>
  onChange: (newValue: any, detail: Detail) => void
  noFoundText?: string
  onNewOption?: (option: string) => void
  chipProps?: Partial<ChipProps>
  requiredMarker?: boolean
}

const MultiChipSelect = ({
  label,
  items = [],
  textField = 'text',
  valueField = 'value',
  selected = [],
  onChange = () => {},
  noFoundText = 'Nothing found.',
  onNewOption,
  chipProps,
  requiredMarker
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
  }, [query, selected, items])

  const handleChange = (item): void => {
    setQuery('')
    let newSelected: Array<string | number> = []

    let type: ActionSelect = 0

    if (onNewOption && typeof item === 'string') {
      onNewOption(item)
      return
    }

    if (selected.includes(item[valueField])) {
      newSelected = selected.filter((value) => value !== item[valueField])
      type = 0
    } else {
      newSelected = [...selected, item[valueField]]
      type = 1
    }

    onChange(newSelected, { type, item: item[valueField] })
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
                {requiredMarker && <RequiredMarker />}
              </Combobox.Label>
            )}
            <div className="relative">
              <div className="relative">
                <div
                  className={clsx(
                    show && 'border-2 border-blue-500',
                    'w-full rounded-md border border-gray-200 bg-gray-50 flex flex-wrap gap-2 p-1'
                  )}
                >
                  {selected.map((item) => {
                    const itemSelected = items.find(
                      (listItem) => listItem[valueField] === item
                    )

                    if (!itemSelected) return <></>

                    return (
                      <Chip
                        key={item}
                        variant="body2"
                        label={itemSelected[textField]}
                        removeAction={() => {
                          const newSelected = selected.filter(
                            (value) => value !== item
                          )
                          onChange(newSelected, { type: 0, item })
                        }}
                        {...chipProps}
                      />
                    )
                  })}
                  <Combobox.Input
                    className={clsx(
                      !selected.length ? 'w-full' : 'w-auto',
                      'block w-full appearance-none px-3 py-1 text-gray-900 bg-gray-50 placeholder-gray-400 border-none focus:border-none focus:ring-0 sm:text-sm'
                    )}
                    style={{ minWidth: 150 }}
                    placeholder={
                      !selected.length
                        ? `${getMessage('search', 'actionsMessages')}...`
                        : ''
                    }
                    displayValue={(item: any) => (item ? item[textField] : '')}
                    onChange={(event) => setQuery(event.target.value)}
                    onClick={() => {
                      setShow(true)
                    }}
                  />
                </div>
              </div>
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
              onNewOption ? (
                <Combobox.Option
                  className="relative cursor-default select-none py-2 pr-10 pl-4 hover:bg-blue-100 hover:text-blue-900 text-gray-900"
                  value={query}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={clsx('block truncate', {
                          'font-medium': selected,
                          'font-normal': !selected
                        })}
                      >
                        {query}
                      </span>
                    </>
                  )}
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

export default MultiChipSelect
