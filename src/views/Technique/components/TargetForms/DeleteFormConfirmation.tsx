import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Typography from 'components/Typography'
import { actionsMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { targetMetaFormMessages } from 'views/Technique/messages'

interface Props {
  onAction: ((value: boolean | PromiseLike<boolean>) => void) | null
}

const DeleteFormConfirmation = (props: Props): ReactElement => {
  const { onAction } = props
  const { formatMessage } = useIntl()

  return (
    <Dialog open={Boolean(onAction)} onClose={() => onAction?.(false)}>
      <div>
        <Typography
          style="semibold"
          variant="subtitle"
          className="inline-flex items-center gap-1"
        >
          <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
          {formatMessage(targetMetaFormMessages.aboutToDelete)}
        </Typography>
        <Typography variant="body2">
          {formatMessage(targetMetaFormMessages.aboutToDeleteBody)}
        </Typography>
      </div>
      <div className="flex items-center gap-2 justify-end mt-2">
        <Button
          variant="text"
          color="primary"
          onClick={() => onAction?.(false)}
        >
          {formatMessage(actionsMessages.cancel)}
        </Button>
        <Button
          onClick={() => onAction?.(true)}
          className="bg-red-200 !text-red-500 transition-colors hover:!bg-red-500 hover:!text-white"
        >
          {formatMessage(targetMetaFormMessages.deleteForm)}
        </Button>
      </div>
    </Dialog>
  )
}

export default DeleteFormConfirmation
