import { ReactElement } from 'react'
import Divider from 'components/Divider'
import PriorityLabel from 'components/Priority/PriorityLabel'
import StatusTag from 'components/Status/StatusTag'
import { Priority as PriorityEnum } from 'types/priority'
import { Status as StatusEnum } from 'types/status'

const DemoCommon = (): ReactElement => {
  return (
    <div>
      <Divider title="<PriorityLabel/>" />

      <div className="flex gap-2 items-end mb-4">
        <PriorityLabel value={PriorityEnum.LOW} variant="caption" />
        <PriorityLabel value={PriorityEnum.MEDIUM} variant="caption" />
        <PriorityLabel value={PriorityEnum.HIGH} variant="caption" />
        <PriorityLabel value={PriorityEnum.URGENT} variant="caption" />
      </div>

      <div className="flex gap-2 items-end">
        <PriorityLabel value={PriorityEnum.LOW} />
        <PriorityLabel value={PriorityEnum.MEDIUM} />
        <PriorityLabel value={PriorityEnum.HIGH} />
        <PriorityLabel value={PriorityEnum.URGENT} />
      </div>

      <Divider title="<StatusTag/>" />

      <div className="flex gap-2 items-end mb-4">
        <StatusTag value={StatusEnum.ACTIVE} />
        <StatusTag value={StatusEnum.INACTIVE} />
        <StatusTag value={StatusEnum.LOCKED} />
      </div>

      <div className="flex gap-2 items-end">
        <StatusTag value={StatusEnum.ACTIVE} variant="body2" />
        <StatusTag value={StatusEnum.INACTIVE} variant="body2" />
        <StatusTag value={StatusEnum.LOCKED} variant="body2" />
      </div>
    </div>
  )
}

export default DemoCommon
