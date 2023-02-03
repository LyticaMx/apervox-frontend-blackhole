import { ElementType, MouseEvent, ReactElement, ReactNode } from 'react'
import { Popover as PopoverHl } from '@headlessui/react'
import { Float, FloatProps } from '@headlessui-float/react'

interface Props {
  content: ReactNode
  children: ReactNode
  floatProps?: Omit<FloatProps, 'children'>
  as?: ElementType
  arrow?: boolean
  className?: string
  classNames?: {
    button?: string
    panel?: string
    arrow?: string
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
  arrow = false,
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
        enter="transition duration-200 ease-out"
        enterFrom="scale-95 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition duration-150 ease-in"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-95 opacity-0"
        tailwindcssOriginClass
        arrow={arrow}
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
          {(arrow || floatProps?.arrow) && (
            <Float.Arrow
              className={
                classNames?.arrow ??
                'absolute bg-white w-5 h-5 rotate-45 border border-gray-200'
              }
            />
          )}
          {content}
        </PopoverHl.Panel>
      </Float>
    </PopoverHl>
  )
}

export default Popover
