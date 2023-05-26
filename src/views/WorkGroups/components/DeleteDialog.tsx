import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { workGroupsDeleteDialogMessages } from '../messages'
import { useWorkGroups } from 'context/WorkGroups'
import useToast from 'hooks/useToast'
import DeleteDialogTemplate from 'components/DeleteDialog'

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
  const { launchToast } = useToast()

  const handleDelete = async (): Promise<void> => {
    try {
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
      onAccept={handleDelete}
      onClose={onClose}
    />
  )
}

export default DeleteDialog
