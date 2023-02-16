import {
  NoSymbolIcon,
  RectangleGroupIcon,
  TrashIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import Card from 'components/Card'
import Typography from 'components/Typography'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { ReactElement } from 'react'
import { rolesCardMessages } from '../messages'
import ActionTooltip from './Tooltip'

interface Role {
  id: string
  name: string
  created_at: string
  user_name: string
  total_users: number
}

interface Props {
  data: Role
  onHistory: (item?: Role) => void
  onBlock: (item?: Role) => void
  onDelete: (item?: Role) => void
}
const RoleCard = ({
  data,
  onHistory,
  onBlock,
  onDelete
}: Props): ReactElement => {
  const getMessage = useFormatMessage(rolesCardMessages)
  const getGlobalMessage = useGlobalMessage()
  return (
    <Card>
      <Typography variant="subtitle" style="semibold">
        {data.name}
      </Typography>
      <p className="text-sm">
        <span className="font-semibold">{getMessage('createdAt')}:</span>{' '}
        {data.created_at}
      </p>
      <p className="text-sm">
        <span className="font-semibold">{getMessage('createdBy')}:</span>{' '}
        {data.user_name}
      </p>
      <p className="text-sm mt-1">
        <UsersIcon className="h-6 w-6 text-primary mr-1 inline bg-background-secondary p-1 rounded-md" />{' '}
        {data.total_users} {getMessage('totalUsers')}
      </p>
      <div className="flex justify-end gap-2 mt-2">
        <ActionTooltip content={getGlobalMessage('history', 'generalMessages')}>
          <RectangleGroupIcon
            className="h-5 w-5 text-muted hover:text-primary cursor-pointer"
            onClick={() => onHistory(data)}
          />
        </ActionTooltip>
        <ActionTooltip content={getGlobalMessage('disable', 'actionsMessages')}>
          <NoSymbolIcon
            className="h-5 w-5 text-muted hover:text-primary cursor-pointer"
            onClick={() => onBlock(data)}
          />
        </ActionTooltip>
        <ActionTooltip content={getGlobalMessage('delete', 'actionsMessages')}>
          <TrashIcon
            className="h-5 w-5 text-muted hover:text-primary cursor-pointer"
            onClick={() => onDelete(data)}
          />
        </ActionTooltip>
      </div>
    </Card>
  )
}

export default RoleCard
