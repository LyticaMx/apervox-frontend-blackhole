import { Fragment, ReactElement, SVGProps } from 'react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface DorpDownOption {
  title: string
  onClick: () => void
  disabled?: boolean
  icons?: {
    active: (props: SVGProps<SVGSVGElement>) => JSX.Element
    inactive: (props: SVGProps<SVGSVGElement>) => JSX.Element
  }
}

interface Props {
  title: string | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  indicator?: boolean
  options: DorpDownOption[]
  classNames?: {
    button?: string
    title?: string
    iconButton?: string
    activeIcon?: string
    inactiveIcon?: string
  }
}

const DropDownMenu = ({
  title,
  indicator = false,
  options,
  classNames
}: Props): ReactElement => {
  const Icon = title

  return (
    <div className="fixed top-16 w-56 text-right">
      <HeadlessMenu as="div" className="relative inline-block text-left">
        <div>
          <HeadlessMenu.Button
            className={clsx(
              'inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
              typeof title === 'string' ? 'bg-black' : 'border border-gray-300'
            )}
          >
            {typeof title === 'string' ? (
              title
            ) : (
              <Icon className="text-gray-400 h-5 w-5" />
            )}

            {indicator && (
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            )}
          </HeadlessMenu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <HeadlessMenu.Item key={option.title}>
                {({ active }) => (
                  <button
                    className={clsx(
                      'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                      active ? 'bg-blue-500 text-white' : 'text-gray-900',
                      option.disabled && 'text-gray-300'
                    )}
                    onClick={option.onClick}
                    disabled={option.disabled}
                  >
                    {option.icons ? (
                      active ? (
                        <option.icons.active
                          className={clsx(
                            'mr-2 h-5 w-5',
                            classNames?.activeIcon
                          )}
                          aria-hidden="true"
                        />
                      ) : (
                        <option.icons.inactive
                          className={clsx(
                            'mr-2 h-5 w-5',
                            option.disabled ? 'text-gray-300' : 'text-gray-400',
                            classNames?.inactiveIcon
                          )}
                          aria-hidden="true"
                        />
                      )
                    ) : null}
                    {option.title}
                  </button>
                )}
              </HeadlessMenu.Item>
            ))}
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
    </div>
  )
}

export default DropDownMenu
