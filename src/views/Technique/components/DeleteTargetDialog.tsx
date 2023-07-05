import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { deleteTargetDialogMessages } from '../messages'
import DeleteDialog from 'components/DeleteDialog'

interface Props {
  open: boolean
  selected?: number
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const DeleteTargetDialog = ({
  open = true,
  selected = 1,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <DeleteDialog
      open={open}
      title={formatMessage(deleteTargetDialogMessages.title, { selected })}
      onAccept={onAccept}
      onClose={onClose}
      question={formatMessage(deleteTargetDialogMessages.message, {
        selected
      })}
      confirmation={formatMessage(deleteTargetDialogMessages.confirm)}
    />
  )
}

export default DeleteTargetDialog
