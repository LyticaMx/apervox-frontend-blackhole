import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { format } from 'date-fns'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { usersEditMessages } from '../messages'
import UserForm from './UserForm'

interface Props {
  user: any
  open: boolean
  onClose?: () => void
}
const EditUserDrawer = ({ user, open, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(usersEditMessages)
  const { formatMessage } = useIntl()

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      className="bg-background-secondary"
    >
      <div className="w-80 h-full flex flex-col px-2">
        <Typography variant="title" style="bold" className="uppercase">
          {getMessage('title')}
        </Typography>

        <span className="text-sm mb-4 text-gray-400">
          {formatMessage(generalMessages.createdOn, {
            date: format(user.createdOn, 'dd/MM/yyyy - hh:mm')
          })}

          <span className="ml-2">{user.createdBy}</span>
        </span>

        <UserForm
          initialValues={user}
          onSubmit={async (values) => {
            console.log('Update user', values)
          }}
        />
      </div>
    </Drawer>
  )
}

export default EditUserDrawer
