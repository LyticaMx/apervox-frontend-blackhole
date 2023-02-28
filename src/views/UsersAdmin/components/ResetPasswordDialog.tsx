import { ReactElement } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Dialog from 'components/Dialog'
import Button from 'components/Button'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { usersResetPasswordMessages } from '../messages'

interface Props {
  open?: boolean
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const ResetPasswordDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(usersResetPasswordMessages)
  const getGlobalMessage = useGlobalMessage()

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />

          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {getMessage('title')}
          </h3>

          <p className="text-sm text-gray-500 mt-1">{getMessage('message')}</p>
        </div>
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="primary" onClick={onAccept}>
          {getGlobalMessage('accept', 'actionsMessages')}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default ResetPasswordDialog
