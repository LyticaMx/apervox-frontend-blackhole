import { ReactElement } from 'react'

import { useAuth } from 'context/Auth'
import { useRoles } from 'context/Roles'

import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
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
  const { actions: authActions } = useAuth()
  const toast = useToast()

  const getMessage = useFormatMessage(rolesMessages)
  const getDeleteMessage = useFormatMessage(rolesDeleteMessages)
  const getGlobalMessage = useGlobalMessage()

  const handleDelete = async ({
    password
  }: {
    password: string
  }): Promise<void> => {
    try {
      const isCorrect = (await authActions?.verifyPassword(password)) ?? false
      if (!isCorrect) {
        toast.danger(getGlobalMessage('incorrectPassword', 'generalMessages'))

        return
      }

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
