import { Fragment, ReactElement, ReactNode } from 'react'
import { Dialog as HUIDialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { zIndex } from 'constants/classes'

interface Props {
  title?: string
  children: ReactNode
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
  padding?: 'normal' | 'none'
  overflow?: 'hidden' | 'visible' | 'auto'
  open: boolean
  onClose?: () => void
}

const Dialog = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
  padding = 'normal',
  overflow = 'hidden'
}: Props): ReactElement => {
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl'
  }

  const paddingClasses = {
    none: 'p-0',
    normal: 'p-6'
  }

  const overflowClasses = {
    hidden: 'overflow-hidden',
    visible: 'overflow-visible',
    auto: 'overflow-auto'
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <HUIDialog
        as="div"
        className="relative w-96"
        // eslint-disable-next-line no-unneeded-ternary
        onClose={onClose ? onClose : () => {}}
        style={{
          zIndex: zIndex.dialog
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HUIDialog.Panel
                className={clsx(
                  sizeClasses[size],
                  paddingClasses[padding],
                  overflowClasses[overflow],
                  'w-full bg-white transform rounded-2xl text-left align-middle shadow-xl transition-all'
                )}
              >
                <HUIDialog.Title
                  as="h3"
                  className="text-xl font-bold leading-6 text-gray-900"
                >
                  {title}
                </HUIDialog.Title>
                {children}
              </HUIDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HUIDialog>
    </Transition>
  )
}

export default Dialog
