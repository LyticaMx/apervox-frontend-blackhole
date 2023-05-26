import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { usersDeleteMessages } from '../messages'
import { useUsers } from 'context/Users'
import useToast from 'hooks/useToast'
import DeleteDialogTemplate from 'components/DeleteDialog'

interface Props {
  ids: string[]
  resolve: (value: boolean | PromiseLike<boolean>) => void
  onClose?: (event?: any) => void
  onConfirm?: () => void
}

const DeleteDialog = ({
  onClose = () => {},
  onConfirm = () => {},
  ids,
  resolve
}: Props): ReactElement => {
  const getMessage = useFormatMessage(usersDeleteMessages)
  const { actions } = useUsers()
  const { launchToast } = useToast()

  const open = ids.length > 0

  const handleDelete = async (): Promise<void> => {
    try {
      let deleted = false
      if (ids.length === 1) {
        deleted = Boolean(await actions?.deleteUser(ids[0]))
      } else {
        deleted = Boolean(await actions?.deleteUsers(ids))
      }

      resolve(deleted)

      if (deleted) {
        onConfirm()
        launchToast({
          title: getMessage('success', { users: ids.length }),
          type: 'Success'
        })
        await actions?.getUsers({ page: 1 }, true)
        return
      }
    } catch {
      resolve(false)
    }
  }

  return (
    <DeleteDialogTemplate
      title={getMessage('title', { selectedUsers: ids.length })}
      confirmation={getMessage('passwordConfirm', {
        selectedUsers: ids.length
      })}
      question={getMessage('message', {
        selectedUsers: ids.length
      })}
      open={open}
      onAccept={handleDelete}
      onClose={onClose}
    />
  )
}

export default DeleteDialog
