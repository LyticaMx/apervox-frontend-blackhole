import { ReactElement, ReactNode } from 'react'

import Tooltip from 'components/Tooltip'

interface Props {
  children: ReactNode
  content: string
}
const ActionTooltip = (props: Props): ReactElement => {
  return (
    <Tooltip
      content={props.content}
      floatProps={{ offset: 10, arrow: true }}
      classNames={{
        panel:
          'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
        arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
      }}
      placement="top"
    >
      {props.children}
    </Tooltip>
  )
}

export default ActionTooltip
