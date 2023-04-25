import { ReactElement, useMemo } from 'react'
import { Listbox } from '@headlessui/react'
import Radio from 'components/Form/Radio'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useToggle } from 'hooks/useToggle'
import Checkbox from 'components/Form/Checkbox'

interface Option {
  name: string
  value: string
}

interface Props<T> {
  title: string
  name: string
  value: T
  onChange: (value: T) => void
  multiple?: boolean
  options: Option[]
  maxDisplayedChars?: number
}

const StaticFilter = <T extends string | string[]>(
  props: Props<T>
): ReactElement => {
  const { options, maxDisplayedChars = 10 } = props
  const [isOpenList, toggleList] = useToggle(false)

  const displayedValue = useMemo(() => {
    if (!props.value) return ''

    const label =
      props.options.find((item) => {
        if (typeof props.value === 'string') return item.value === props.value
        return props.value.includes(item.value)
      })?.name ?? ''

    return `${
      label.length > 10 ? `${label.substring(0, maxDisplayedChars)}...` : label
    }${
      props.value.length > 1 && props.multiple
        ? ` + ${props.value.length - 1}`
        : ''
    }`
  }, [props.value, props.options, maxDisplayedChars])

  return (
    <Listbox
      value={props.value}
      onChange={props.onChange}
      multiple={props.multiple}
    >
      <Listbox.Button
        className="flex items-center justify-between w-full bg-gray-50 transition-colors hover:bg-gray-100 text-sm font-medium p-2 rounded-md"
        onClick={toggleList}
      >
        {({ open }) => (
          <>
            {props.title}{' '}
            <span className="text-primary flex items-center">
              {displayedValue}{' '}
              <ChevronDownIcon
                className={clsx(
                  'w-5 h-5 ml-1 text-secondary transform',
                  open && 'rotate-180'
                )}
              />
            </span>
          </>
        )}
      </Listbox.Button>
      <Listbox.Options className="ml-3" static>
        {isOpenList &&
          options.map((option) => (
            <Listbox.Option
              key={`${props.name}-${option.value}`}
              value={option.value}
              className="text-xs text-gray-900 font-medium first:mt-1"
            >
              {props.multiple ? (
                <Checkbox
                  checked={props.value.includes(option.value)}
                  label={option.name}
                  value={option.value}
                  onClick={(e) => e?.stopPropagation()}
                  onChange={() => {}}
                />
              ) : (
                <Radio
                  checked={option.value === props.value}
                  label={option.name}
                  value={option.value}
                  onChange={() => {}}
                />
              )}
            </Listbox.Option>
          ))}
      </Listbox.Options>
    </Listbox>
  )
}

export default StaticFilter
