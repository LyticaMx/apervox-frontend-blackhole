import { ReactElement } from 'react'

import Dialog from 'components/Dialog'
import Button from 'components/Button'

import { CheckIcon } from '@heroicons/react/24/outline'
import { useIntl } from 'react-intl'
import { actionsMessages } from 'globalMessages'
import { embeddingDialogMessages } from '../messages'

interface Props {
  open: boolean
  className?: string
  onAccept: () => void
  onClose?: () => void
}

const EmbeddingDialog = ({ open, onAccept, onClose }: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <Dialog open={open} onClose={onClose} padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
            <CheckIcon
              className="h-6 w-6 text-emerald-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {formatMessage(embeddingDialogMessages.createVoiceprint)}
            </h3>
            <div className="mt-1">
              <p className="text-sm text-gray-500">
                {formatMessage(embeddingDialogMessages.description)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
        <Button
          margin="none"
          variant="contained"
          color="blue"
          onClick={onAccept}
        >
          {formatMessage(actionsMessages.confirm)}
        </Button>
        <Button margin="none" variant="outlined" onClick={onClose}>
          {formatMessage(actionsMessages.cancel)}
        </Button>
      </div>
    </Dialog>
  )
}

export default EmbeddingDialog
