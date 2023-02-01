import { ReactElement, useEffect, useMemo, useState } from 'react'
import { Menu } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import USFlag from 'assets/Icons/estados-unidos.png'
import MXFlag from 'assets/Icons/mexico.png'
import { useLanguage } from 'context/Language'
import clsx from 'clsx'

type Alignment = 'start' | 'end'
type Side = 'top' | 'right' | 'bottom' | 'left'
type AlignedPlacement = `${Side}-${Alignment}`
type Placement = Side | AlignedPlacement
interface Props {
  className?: string
  placement?: Placement
  expanded?: boolean
}

const SelectLocale = ({
  className,
  placement,
  expanded = true
}: Props): ReactElement => {
  const { localeI18n, actions } = useLanguage()

  const [locale, setlocale] = useState('es')

  useEffect(() => {
    setlocale(localeI18n === 'es-mx' ? 'es' : localeI18n)
  }, [localeI18n])

  const items = [
    { flag: MXFlag, value: 'es', text: 'Español' },
    { flag: USFlag, value: 'en', text: 'English' }
  ]

  const handleClick = (value): void => {
    actions?.changeLocale(value)
  }
  const isSelected = (value): boolean => locale === value

  const itemSelected = useMemo(
    () => items.find((item) => item.value === locale),
    [items, locale]
  )

  return (
    <Menu>
      <Float
        placement={placement}
        offset={4}
        flip
        shift={6}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-150 ease-in"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
        tailwindcssOriginClass
      >
        <Menu.Button
          className={clsx(
            'gap-2 inline-flex text-sm border-none rounded-lg items-center justify-center px-4 py-2 font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 h-max w-max group relative',
            className
          )}
        >
          {itemSelected ? (
            <>
              <img
                src={itemSelected.flag}
                className={clsx(
                  'h-5 w-5 transition-all duration-500',
                  !expanded && 'scale-150 translate-x-8'
                )}
              />
              <span
                className={clsx(
                  'transition-all duration-300',
                  expanded ? 'opacity-100' : 'opacity-0'
                )}
              >
                {itemSelected.text}
              </span>
              {!expanded && (
                <div className="absolute transition-all duration-500 ease-in left-full top-2 ml-1 max-w-0 overflow-hidden group-hover:max-w-xl bg-gray-200 rounded flex-shrink-0 whitespace-nowrap">
                  <span className="px-2">{itemSelected.text}</span>
                </div>
              )}
            </>
          ) : (
            <span>Seleccionar</span>
          )}
          {expanded && <ChevronDownIcon className="h-5 w-5" />}
        </Menu.Button>
        <Menu.Items className="overflow-y-scroll max-h-52 w-48 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden focus:outline-none">
          {items.map((item, index) => (
            <Menu.Item key={index}>
              <button
                className="relative select-none py-2 pr-10 pl-4 text-gray-900 text-sm w-full flex items-center hover:bg-gray-100"
                onClick={() => handleClick(item.value)}
              >
                <img src={item.flag} className="h-5 w-5 mr-3" />
                {item.text}
                {isSelected(item.value) ? (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-500">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Float>
    </Menu>
  )
}

export default SelectLocale
