import { ReactElement } from 'react'

import { useRoles } from 'context/Roles'

import { useFormatMessage } from 'hooks/useIntl'
import useToast from 'hooks/useToast'
import { Role } from 'types/auth'
import Dialog from 'components/DeleteDialog'

import { rolesMessages, rolesDeleteMessages } from '../messages'

interface Props {
  open: boolean
  role?: Role
  onClose: () => void
}

const DeleteDialog = ({ open, role, onClose }: Props): ReactElement => {
  const { actions } = useRoles()
  const toast = useToast()

  const getMessage = useFormatMessage(rolesMessages)
  const getDeleteMessage = useFormatMessage(rolesDeleteMessages)

  const handleDelete = async (): Promise<void> => {
    try {
      if (role) await actions?.delete(role.id)

      toast.success(getMessage('deleteSuccess'))
      await actions?.getData()
      onClose()
    } catch {}
  }

  return (
    <Dialog
      title={getDeleteMessage('title')}
      question={getDeleteMessage('message')}
      confirmation={getDeleteMessage('confirm')}
      open={open}
      onAccept={handleDelete}
      onClose={onClose}
    />
  )
}

export default DeleteDialog
