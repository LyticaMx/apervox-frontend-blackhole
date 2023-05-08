import clsx from 'clsx'
import { ReactElement, useState, useRef } from 'react'
import { Popover } from '@headlessui/react'
import { Float } from '@headlessui-float/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { useOnClickOutside } from 'usehooks-ts'

interface Action {
  label: string
  disabled?: boolean
  className?: string
  onClick: () => void
}

interface Props {
  actions: Action[]
  disabled?: boolean
}

const FloatingActions = ({
  actions,
  disabled = false
}: Props): ReactElement => {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  const toggle = (): void => {
    setShow(!show)
  }

  const handleClickOutside = (): void => {
    setShow(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <Popover className="inline-block" ref={ref}>
      <Float
        show={show}
        placement="bottom-start"
        offset={5}
        shift={6}
        flip={10}
        portal
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150 ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <Popover.Button
          disabled={disabled}
          className="gap-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={toggle}
        >
          <EllipsisVerticalIcon className="w-6 h-6 text-secondary-gray" />
        </Popover.Button>
        <Popover.Panel
          static
          className="bg-white border border-gray-100 rounded-md shadow-lg focus:outline-none z-10 py-1"
        >
          {actions.map((action) => (
            <button
              className={clsx(
                action.className,
                'hover:bg-gray-100 cursor-pointer py-1 px-4 text-sm block w-full text-left disabled:text-gray-300'
              )}
              onClick={(e) => {
                e.stopPropagation()
                action.onClick()
              }}
              disabled={action.disabled}
              key={action.label}
            >
              {action.label}
            </button>
          ))}
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default FloatingActions
