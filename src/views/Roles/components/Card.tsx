import { ReactElement } from 'react'
import { format, parseISO } from 'date-fns'
import {
  NoSymbolIcon,
  RectangleGroupIcon,
  TrashIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { Role } from 'types/auth'

import Card from 'components/Card'
import Typography from 'components/Typography'

import ActionTooltip from './Tooltip'
import { rolesCardMessages } from '../messages'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

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
  const ability = useAbility()

  const formatDate = (createAt?: string): string => {
    if (!createAt) return ''

    return format(parseISO(createAt), 'dd/MM/yyyy - HH:mm:ss')
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
          <button
            onClick={() => onHistory(data)}
            disabled={ability.cannot(ACTION.READ, SUBJECT.AUDITS)}
            className=" text-muted enabled:hover:text-primary cursor-pointer"
          >
            <RectangleGroupIcon className="h-5 w-5" />
          </button>
        </ActionTooltip>
        <ActionTooltip
          content={getGlobalMessage(
            data.status ? 'disable' : 'enable',
            'actionsMessages'
          )}
        >
          <button
            onClick={() => onBlock(data)}
            disabled={ability.cannot(ACTION.UPDATE, SUBJECT.ROLES)}
            className="text-muted enabled:hover:text-primary cursor-pointer"
          >
            <NoSymbolIcon className="h-5 w-5" />
          </button>
        </ActionTooltip>
        <ActionTooltip content={getGlobalMessage('delete', 'actionsMessages')}>
          <button
            className="text-muted enabled:hover:text-primary cursor-pointer"
            onClick={() => onDelete(data)}
            disabled={ability.cannot(ACTION.DELETE, SUBJECT.ROLES)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </ActionTooltip>
      </div>
    </Card>
  )
}

export default RoleCard
