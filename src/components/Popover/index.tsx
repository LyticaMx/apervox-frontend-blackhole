import { ElementType, MouseEvent, ReactElement, ReactNode } from 'react'
import { Popover as PopoverHl } from '@headlessui/react'
import { Float, FloatProps } from '@headlessui-float/react'

interface Props {
  content: ReactNode
  children: ReactNode
  floatProps?: Omit<FloatProps, 'children'>
  as?: ElementType
  className?: string
  classNames?: {
    button?: string
    panel?: string
  }

  onMouseEnter?: (e?: MouseEvent) => void
  onMouseLeave?: (e?: MouseEvent) => void
  onClick?: (e?: MouseEvent) => void
}

const Popover = ({
  children,
  content,
  floatProps,
  as = 'div',
  className,
  classNames,
  ...props
}: Props): ReactElement => {
  return (
    <PopoverHl className={className ?? 'inline-flex'}>
      <Float
        offset={5}
        flip
        shift={6}
        enter='transition duration-200 ease-out'
        enterFrom='scale-95 opacity-0'
        enterTo='scale-100 opacity-100'
        leave='transition duration-150 ease-in'
        leaveFrom='scale-100 opacity-100'
        leaveTo='scale-95 opacity-0'
        tailwindcssOriginClass
        {...floatProps}
      >
        <PopoverHl.Button {...props} as={as} className={classNames?.button}>
          {children}
        </PopoverHl.Button>
        <PopoverHl.Panel
          className={
            classNames?.panel ??
            'py-1 px-2 rounded-md shadow-md bg-white border border-gray-200 text-sm max-w-md'
          }
        >
          {content}
        </PopoverHl.Panel>
      </Float>
    </PopoverHl>
  )
}

export default Popover
