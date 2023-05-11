import DeleteDialog from 'components/DeleteDialog'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { deleteVerificationLineMessages } from '../messages'

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
  const open = ids.length > 0

  return (
    <DeleteDialog
      open={open}
      onAccept={async ({ password }) => {}}
      title={formatMessage(deleteVerificationLineMessages.title)}
      question={formatMessage(deleteVerificationLineMessages.message)}
      confirmation={formatMessage(
        deleteVerificationLineMessages.passwordConfirm
      )}
      onClose={onClose}
    />
  )
}

export default DeleteVerificationLineDialog
