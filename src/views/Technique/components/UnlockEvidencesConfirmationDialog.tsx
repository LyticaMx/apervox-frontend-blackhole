import DeleteDialogTemplate from 'components/DeleteDialog'
import { useEvidences } from 'context/Evidences'
import useToast from 'hooks/useToast'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { unlockEvidencesMessages } from '../messages'

interface Props {
  ids: string[]
  resolve: (value: boolean | PromiseLike<boolean>) => void
  onClose?: () => void
  onConfirm?: () => void
}

const UnlockEvidencesConfirmationDialog = (props: Props): ReactElement => {
  const { ids, resolve, onClose = () => {}, onConfirm = () => {} } = props
  const { formatMessage } = useIntl()
  const { actions } = useEvidences()
  const toast = useToast()

  const open = ids.length > 0

  const handleUnlock = async (): Promise<void> => {
    try {
      const deleted = (await actions?.releaseEvidences(ids)) ?? false

      resolve(deleted)

      if (deleted) {
        onConfirm()
        toast.success(
          formatMessage(unlockEvidencesMessages.success, {
            selected: ids.length
          })
        )
        return
      }
      toast.danger(
        formatMessage(unlockEvidencesMessages.failed, {
          selected: ids.length
        })
      )
    } catch {
      resolve(false)
      toast.danger(
        formatMessage(unlockEvidencesMessages.failed, {
          selected: ids.length
        })
      )
    }
  }

  return (
    <DeleteDialogTemplate
      title={formatMessage(unlockEvidencesMessages.title, {
        selected: ids.length
      })}
      question={formatMessage(unlockEvidencesMessages.message, {
        selected: ids.length
      })}
      confirmation={formatMessage(unlockEvidencesMessages.passwordConfirm, {
        selected: ids.length
      })}
      open={open}
      onAccept={handleUnlock}
      onClose={onClose}
    />
  )
}

export default UnlockEvidencesConfirmationDialog
