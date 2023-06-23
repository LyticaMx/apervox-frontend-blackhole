import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { techniquesDeleteDialogMessages } from '../messages'
import DeleteDialog from 'components/DeleteDialog'
import { useTechniques } from 'context/Techniques'
import useToast from 'hooks/useToast'

interface Props {
  ids: string[]
  resolve: (value: boolean | PromiseLike<boolean>) => void
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const DeleteTechinqueDialog = ({
  ids,
  resolve,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(techniquesDeleteDialogMessages)
  const { actions } = useTechniques()
  const { launchToast } = useToast()

  const open = ids.length > 0

  const handleDelete = async (): Promise<void> => {
    try {
      let deleted = false
      if (ids.length === 1) {
        deleted = Boolean(await actions?.deleteOne(ids[0]))
      } else {
        deleted = Boolean(await actions?.deleteMany(ids))
      }

      if (deleted) {
        resolve(true)
        onAccept()
        launchToast({
          title: getMessage('success', { selected: ids.length }),
          type: 'Success'
        })
        await actions?.get({ page: 1 }, true)
        return
      }
    } catch {
      resolve(false)
    }
  }

  return (
    <DeleteDialog
      title={getMessage('title', { selected: ids.length })}
      confirmation={getMessage('passwordConfirm', {
        selected: ids.length
      })}
      question={getMessage('message')}
      open={open}
      onAccept={handleDelete}
      onClose={onClose}
    />
  )
}

export default DeleteTechinqueDialog
