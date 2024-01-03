import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { format } from 'date-fns'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { usersEditMessages } from '../messages'
import UserForm from './UserForm'
import { User } from 'types/user'
import { useUsers } from 'context/Users'
import useToast from 'hooks/useToast'

interface Props {
  user: User
  open: boolean
  onClose?: () => void
}
const EditUserDrawer = ({ user, open, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(usersEditMessages)
  const { formatMessage } = useIntl()
  const { actions } = useUsers()
  const { launchToast } = useToast()

  const handleSubmit = async (values): Promise<void> => {
    try {
      const updated = await actions?.updateUser({
        id: user.id,
        username: values.username,
        email: values.email,
        name: values.name,
        lastName: values.lastname,
        position: values.position,
        phone: values.extension,
        groupsIds: values.groups.map((item) => item.value),
        roleId: values.role.value,
        closeSession: values.automaticSessionExpiration
      })
      if (updated) {
        actions?.getUsers()
        onClose?.()
        launchToast({
          type: 'Success',
          title: getMessage('success')
        })
      }
    } catch {}
  }

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
            date: format(new Date(user.createdOn ?? ''), 'dd/MM/yyyy - HH:mm')
          })}

          <span className="ml-2">{user.createdBy}</span>
        </span>

        <UserForm
          initialValues={{
            automaticSessionExpiration: user.closeSession ?? false,
            email: user.email ?? '',
            extension: user.phone ?? '',
            groups:
              user.groups?.map((item) => ({
                value: item.id,
                label: item.name
              })) ?? [],
            lastname: user.lastName ?? '',
            name: user.name ?? '',
            position: user.position ?? '',
            role:
              user.roleId !== ''
                ? { value: user.roleId, label: user.role }
                : null,
            username: user.username ?? ''
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </Drawer>
  )
}

export default EditUserDrawer
