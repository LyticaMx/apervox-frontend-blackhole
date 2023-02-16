import {
  DocumentMagnifyingGlassIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import { formMessages, generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { messages, userDrawerMessages } from '../messages'
import { Target, User } from '..'

interface Props {
  user: User | null
  onClose: () => void
  selectUser?: (target: Target) => void
  withBackdrop?: boolean
}

const UserDrawer = (props: Props): ReactElement => {
  const { user, onClose, selectUser, withBackdrop = false } = props
  const { formatMessage } = useIntl()

  return (
    <Drawer
      withoutBackdrop={!withBackdrop}
      placement="right"
      open={!!user}
      onClose={onClose}
      title={
        <div className="flex items-center">
          <UserIcon className="w-12 h-12 p-2 border border-secondary-gray rounded" />
          <div className="ml-2">
            <span className="text-secondary text-lg uppercase font-extrabold block">
              {formatMessage(userDrawerMessages.userData)}
            </span>
            {user && (
              <span className="block text-xs text-secondary opacity-50">
                <span className="font-semibold">
                  {formatMessage(messages.created, {
                    date: (
                      <span className="font-normal">
                        {format(user.createdOn, 'dd/MM/yyyy - hh:mm')}
                      </span>
                    )
                  })}
                  <span className="ml-2">{user.createdBy}</span>
                </span>
              </span>
            )}
          </div>
        </div>
      }
    >
      <div className="w-96">
        {/* Esto se puede automatizar */}
        {user && (
          <>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(formMessages.names)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.name}
            </Typography>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(formMessages.surnames)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.surnames}
            </Typography>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(formMessages.username)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.username}
            </Typography>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(formMessages.email)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.email}
            </Typography>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(generalMessages.groups)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.groups}
            </Typography>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(generalMessages.userRol)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.userRol}
            </Typography>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(formMessages.extension)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.extension}
            </Typography>
            <Typography variant="body2" className="italic mt-3">
              {formatMessage(formMessages.position)}
            </Typography>
            <Typography variant="body2" className="mt-1 ml-2">
              {user.position}
            </Typography>
            {selectUser && (
              <button
                className="mt-8 flex items-center group/item"
                onClick={() =>
                  selectUser({
                    id: user.id,
                    name: user.name,
                    type: 'user'
                  })
                }
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-secondary-gray group-hover/item:text-primary" />
                <p className="ml-2">
                  {formatMessage(userDrawerMessages.userHistory)}
                </p>
              </button>
            )}
          </>
        )}
      </div>
    </Drawer>
  )
}

export default UserDrawer
