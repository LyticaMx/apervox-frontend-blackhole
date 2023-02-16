import { ReactElement } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import Dialog from 'components/Dialog'
import Button from 'components/Button'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { rolesDeleteMessages } from '../messages'

interface Props {
  open?: boolean
  audioName?: string
  groupName?: string
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const DeleteDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(rolesDeleteMessages)
  const getGlobalMessage = useGlobalMessage()

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 m-auto mb-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {getMessage('title')}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{getMessage('message')}</p>
        </div>
      </div>
      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="red" onClick={onAccept}>
          {getGlobalMessage('accept', 'actionsMessages')}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default DeleteDialog
