import { ElementType, ReactElement, ReactNode, useState } from 'react'
import Popover from 'components/Popover'
import { Placement } from '@floating-ui/dom'
import { FloatProps } from '@headlessui-float/react'

interface Props {
  children: ReactNode
  content: ReactNode
  as?: ElementType
  floatProps?: Omit<FloatProps, 'children'>
  placement?: Placement
  className?: string
  classNames?: {
    button?: string
    panel?: string
    arrow?: string
  }
}

const Tooltip = ({
  children,
  content,
  as = 'div',
  placement,
  className,
  classNames,
  floatProps
}: Props): ReactElement => {
  const [show, setShow] = useState(false)

  const props = {
    className,
    floatProps: {
      offset: 2,
      ...floatProps,
      placement,
      show
    },
    classNames: {
      panel: 'bg-gray-500 text-white py-1 px-2 rounded-sm text-sm',
      ...classNames
    }
  }

  return (
    <Popover
      content={content}
      as={as}
      {...props}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
    </Popover>
  )
}

export default Tooltip
