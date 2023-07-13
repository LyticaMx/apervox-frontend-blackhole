import { ReactElement, ReactNode } from 'react'

import IconButton from 'components/Button/IconButton'
import Tooltip from 'components/Tooltip'

interface Props {
  content: ReactNode
  children: ReactNode
  onClick: (e?: any) => void
}

const TargetCardAction = ({
  content,
  children,
  onClick
}: Props): ReactElement => {
  return (
    <Tooltip
      content={content}
      floatProps={{ offset: 10, arrow: true }}
      classNames={{
        panel:
          'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
        arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
      }}
      placement="top"
    >
      <IconButton onClick={onClick}>{children}</IconButton>
    </Tooltip>
  )
}

export default TargetCardAction
