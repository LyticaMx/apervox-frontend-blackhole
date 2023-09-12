import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Dialog from 'components/Dialog'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { transcriptionTabMessages } from '../messages'
import Button from 'components/Button'
import { actionsMessages } from 'globalMessages'

interface Props {
  open: boolean
  onAccept: () => void
  onClose: () => void
}

const DeleteRegionDialog = (props: Props): ReactElement => {
  const { open, onAccept, onClose } = props
  const { formatMessage } = useIntl()

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-600 m-auto mb-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {formatMessage(transcriptionTabMessages.deleteTranscriptionRegion)}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {formatMessage(
              transcriptionTabMessages.deleteTranscriptionRegionQuestion
            )}
          </p>
        </div>
        <div className="px-4 sm:flex gap-2 justify-center">
          <Button variant="text" color="primary" onClick={onClose}>
            {formatMessage(actionsMessages.cancel)}
          </Button>
          <Button
            onClick={onAccept ?? (() => {})}
            className="bg-red-200 !text-red-500 transition-colors hover:!bg-red-500 hover:!text-white"
          >
            {formatMessage(actionsMessages.accept)}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export { DeleteRegionDialog }
