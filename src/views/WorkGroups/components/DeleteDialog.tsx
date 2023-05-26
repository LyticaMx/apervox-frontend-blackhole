import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { workGroupsDeleteDialogMessages } from '../messages'
import { useWorkGroups } from 'context/WorkGroups'
import { useAuth } from 'context/Auth'
import useToast from 'hooks/useToast'
import DeleteDialogTemplate from 'components/DeleteDialog'
import { useSettings } from 'context/Settings'

interface Props {
  ids: string[]
  selectedGroups?: Number
  onConfirm?: () => void
  onClose?: (event?: any) => void
  resolve: (value: boolean | PromiseLike<boolean>) => void
}

const DeleteDialog = ({
  ids,
  onConfirm = () => {},
  onClose = () => {},
  resolve
}: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsDeleteDialogMessages)
  const { actions } = useWorkGroups()
  const { actions: authActions } = useAuth()
  const { settings } = useSettings()
  const { launchToast } = useToast()

  const handleDelete = async (password: string): Promise<void> => {
    try {
      const isValidPassword = settings.doubleValidation
        ? await authActions?.verifyPassword(password)
        : true
      if (!isValidPassword) resolve(false)
      let deleted = false
      if (ids.length === 1) {
        deleted = (await actions?.deleteWorkGroup(ids[0])) ?? false
      } else {
        deleted = (await actions?.deleteWorkGroups(ids)) ?? false
      }
      if (!deleted) return

      launchToast({
        type: 'Success',
        title: getMessage('successDelete', { groups: ids.length })
      })

      await actions?.getWorkGroups({ page: 1 }, true)
      resolve(true)
      onConfirm()
    } catch {
      resolve(false)
    }
  }

  return (
    <DeleteDialogTemplate
      title={getMessage('title')}
      confirmation={getMessage('passwordConfirmMessage', {
        selectedGroups: ids.length
      })}
      question={getMessage('message', {
        selectedGroups: ids.length
      })}
      open={ids.length > 0}
      onAccept={async ({ password }) => await handleDelete(password)}
      onClose={onClose}
    />
  )
}

export default DeleteDialog
