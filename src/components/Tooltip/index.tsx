import { ElementType, ReactElement, ReactNode, useState } from 'react'
import Popover from 'components/Popover'
import { Placement } from '@floating-ui/dom'

interface Props {
  children: ReactNode
  content: ReactNode
  as?: ElementType
  placement?: Placement
  className?: string
  classNames?: {
    button?: string
    panel?: string
  }
}

const Tooltip = ({
  children,
  content,
  as = 'div',
  placement,
  className,
  classNames
}: Props): ReactElement => {
  const [show, setShow] = useState(false)

  const props = {
    className,
    floatProps: {
      placement,
      offset: 2,
      show
    },
    classNames: {
      ...classNames,
      panel: 'bg-gray-500 text-white py-1 px-2 rounded-sm text-sm'
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
