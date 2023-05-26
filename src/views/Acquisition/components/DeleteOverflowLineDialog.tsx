import DeleteDialog from 'components/DeleteDialog'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { deleteMessages } from '../messages'
import { useOverflowLine } from 'context/OverflowLines'
import useToast from 'hooks/useToast'

interface Props {
  ids: string[]
  onConfirm?: () => void
  onClose?: (event?: any) => void
  resolve: (value: boolean | PromiseLike<boolean>) => void
}

const DeleteOverflowLineDialog = ({
  ids,
  resolve,
  onClose = () => {},
  onConfirm = () => {}
}: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions: overflowLineActions } = useOverflowLine()
  const toast = useToast()
  const open = ids.length > 0

  const handleDelete = async (): Promise<void> => {
    try {
      let deleted = false
      if (ids.length === 1) {
        deleted = (await overflowLineActions?.deleteOne(ids[0])) ?? false
      } else {
        deleted = (await overflowLineActions?.deleteMany(ids)) ?? false
      }

      if (!deleted) return

      toast.success(
        formatMessage(deleteMessages.success, { selectedLines: ids.length })
      )
      await overflowLineActions?.get({ page: 1 }, true)
      resolve(true)
      onConfirm()
    } catch {
      resolve(false)
    }
  }

  return (
    <DeleteDialog
      open={open}
      onAccept={handleDelete}
      title={formatMessage(deleteMessages.title, {
        selectedLines: ids.length
      })}
      question={formatMessage(deleteMessages.message, {
        selectedLines: ids.length
      })}
      confirmation={formatMessage(deleteMessages.passwordConfirm, {
        selectedLines: ids.length
      })}
      onClose={onClose}
    />
  )
}

export default DeleteOverflowLineDialog
