import {
  NoSymbolIcon,
  RectangleGroupIcon,
  TrashIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import Card from 'components/Card'
import Typography from 'components/Typography'
import { format, parseISO } from 'date-fns'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { ReactElement } from 'react'
import { Role } from 'types/auth'
import { rolesCardMessages } from '../messages'
import ActionTooltip from './Tooltip'

// interface Role {
//   id: string
//   name: string
//   created_at: string
//   user_name: string
//   total_users: number
// }

interface Props {
  data: Role
  onHistory: (item?: Role) => void
  onBlock: (item?: Role) => void
  onDelete: (item?: Role) => void
  onClick: (item?: Role) => void
}
const RoleCard = ({
  data,
  onHistory,
  onBlock,
  onDelete,
  onClick
}: Props): ReactElement => {
  const getMessage = useFormatMessage(rolesCardMessages)
  const getGlobalMessage = useGlobalMessage()

  const formatDate = (createAt?: string): string => {
    if (!createAt) return ''

    return format(parseISO(createAt), 'dd/MM/yyyy - hh:ss:mm')
  }

  return (
    <Card onClick={() => onClick(data)} className="cursor-pointer">
      <Typography variant="subtitle" style="semibold">
        {data.name}
      </Typography>
      <p className="text-sm">
        <span className="font-semibold">{getMessage('createdAt')}:</span>{' '}
        {formatDate(data.created_at)}
      </p>
      <p className="text-sm">
        <span className="font-semibold">{getMessage('createdBy')}:</span>{' '}
        {data.created_by ?? ''}
      </p>
      <p className="text-sm mt-1">
        <UsersIcon className="h-6 w-6 text-primary mr-1 inline bg-background-secondary p-1 rounded-md" />{' '}
        {data.users?.length ?? 0} {getMessage('totalUsers')}
      </p>
      <div className="flex justify-end gap-2 mt-2">
        <ActionTooltip content={getGlobalMessage('history', 'generalMessages')}>
          <RectangleGroupIcon
            className="h-5 w-5 text-muted hover:text-primary cursor-pointer"
            onClick={() => onHistory(data)}
          />
        </ActionTooltip>
        <ActionTooltip
          content={getGlobalMessage(
            data.status ? 'disable' : 'enable',
            'actionsMessages'
          )}
        >
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
