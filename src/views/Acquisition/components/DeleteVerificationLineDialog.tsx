import DeleteDialog from 'components/DeleteDialog'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { deleteVerificationLineMessages } from '../messages'
import { useVerificationLine } from 'context/VerificationLines'
import useToast from 'hooks/useToast'

interface Props {
  ids: string[]
  resolve: (value: boolean | PromiseLike<boolean>) => void
  onClose?: (event?: any) => void
  onConfirm?: () => void
}

const DeleteVerificationLineDialog = ({
  onClose = () => {},
  onConfirm = () => {},
  ids,
  resolve
}: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions: verificationLineActions } = useVerificationLine()
  const toast = useToast()
  const open = ids.length > 0

  const handleDelete = async (): Promise<void> => {
    try {
      let deleted = false

      if (ids.length === 1) {
        deleted = (await verificationLineActions?.deleteOne(ids[0])) ?? false
      } else {
        deleted = (await verificationLineActions?.deleteMany(ids)) ?? false
      }

      if (!deleted) return

      toast.success(
        formatMessage(deleteVerificationLineMessages.success, {
          selectedLines: ids.length
        })
      )

      await verificationLineActions?.get({ page: 1 }, true)
      resolve(true)
      onConfirm()
    } catch {
      resolve(false)
      onClose()
    }
  }

  return (
    <DeleteDialog
      open={open}
      onAccept={handleDelete}
      title={formatMessage(deleteVerificationLineMessages.title, {
        selectedLines: ids.length
      })}
      question={formatMessage(deleteVerificationLineMessages.message, {
        selectedLines: ids.length
      })}
      confirmation={formatMessage(
        deleteVerificationLineMessages.passwordConfirm,
        {
          selectedLines: ids.length
        }
      )}
      onClose={onClose}
    />
  )
}

export default DeleteVerificationLineDialog
