import {
  ReactElement,
  ReactNode,
  ComponentProps,
  useRef,
  useEffect
} from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useSidebar } from 'context/Sidebar'

interface Props {
  title: string
  icon: (props: ComponentProps<'svg'>) => JSX.Element
  children: ReactNode
  defaultOpen?: boolean
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
  classNames
}: Props): ReactElement => {
  const { actions, mode, open: expanded } = useSidebar()
  const closeRef = useRef(() => {})

  // Se realiza esto para cerrar los menú desplegables cuando se cambie de modo
  useEffect(() => {
    closeRef.current()
  }, [mode])

  useEffect(() => {
    if (!expanded) closeRef.current()
  }, [expanded])

  const handleExpandMini = (): void => {
    actions?.setOpen(true)
  }

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open, close }) => {
        closeRef.current = close

        return (
          <div
            className={clsx(classNames?.container, 'relative')}
            onClick={handleExpandMini}
          >
            <Disclosure.Button
              className={clsx(
                'flex w-full justify-between px-2 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring relative group',
                classNames?.button ?? defaultButtonClass
              )}
            >
              <div className="flex">
                <Icon
                  className={clsx(
                    classNames?.icon,
                    'transition-all duration-500',
                    !expanded && 'scale-150 translate-x-5'
                  )}
                />
                <p
                  className={clsx(
                    'pl-3.5 transition-opacity duration-500',
                    !expanded && 'opacity-0'
                  )}
                >
                  {title}
                </p>
              </div>
              {expanded && (
                <ChevronUpIcon
                  className={clsx(
                    'h-5 w-5',
                    !open && 'rotate-180 transform',
                    classNames?.chevronIcon ?? ''
                  )}
                />
              )}
              {!expanded && (
                <div className="absolute transition-all duration-500 ease-in left-full top-2 ml-1 max-w-0 overflow-hidden group-hover:max-w-xl bg-gray-200 rounded">
                  <span className="px-2">{title}</span>
                </div>
              )}
            </Disclosure.Button>
            <Transition
              enter={clsx('transition-all duration-500 ease-in')}
              enterFrom="opacity-0 max-h-0"
              enterTo={clsx('opacity-100', expanded ? 'max-h-96' : 'max-h-0')}
              leave={clsx('transition-all duration-500 ease-out')}
              leaveFrom={clsx('opacity-100', expanded ? 'max-h-96' : 'max-h-0')}
              leaveTo="opacity-0 max-h-0"
            >
              <Disclosure.Panel className={clsx(classNames?.children ?? '')}>
                {children}
              </Disclosure.Panel>
            </Transition>
          </div>
        )
      }}
    </Disclosure>
  )
}

export default Accordion
