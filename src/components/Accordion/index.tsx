import { ReactElement, ReactNode, ComponentProps } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface Props {
  title: ReactNode
  icon?: (props: ComponentProps<'svg'>) => JSX.Element
  children: ReactNode
  defaultOpen?: boolean
  useCustomTitle?: boolean
  classNames?: {
    button?: string
    icon?: string
    children?: string
    chevronIcon?: string
    container?: string
  }
}

const defaultButtonClass = 'bg-gray-50 hover:bg-gray-100 rounded-md'

const Accordion = ({
  icon: Icon,
  title,
  children,
  defaultOpen,
  classNames,
  useCustomTitle = false
}: Props): ReactElement => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className={classNames?.container}>
          <Disclosure.Button
            className={clsx(
              'flex w-full justify-between px-2 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring',
              classNames?.button ?? defaultButtonClass
            )}
          >
            {useCustomTitle ? (
              title
            ) : (
              <div className="flex">
                {Icon && <Icon className={classNames?.icon} />}
                <p className={clsx({ 'pl-3.5': !!Icon })}>{title}</p>
              </div>
            )}

            <ChevronUpIcon
              className={clsx(
                'h-5 w-5',
                !open && 'rotate-180 transform',
                classNames?.chevronIcon ?? ''
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={clsx(classNames?.children ?? '')}>
            {children}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default Accordion
