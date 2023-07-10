import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import { actionsMessages } from 'globalMessages'
import { ReactElement, ReactNode } from 'react'
import { useIntl } from 'react-intl'

interface Props {
  onAction: ((confirm: PromiseLike<boolean> | boolean) => void) | null
  title: string
  startDate?: string
  endDate?: string
  icon?: ReactNode
  body?: string
}

const ConfirmationDialog = (props: Props): ReactElement => {
  const { title, body, onAction, icon } = props
  const { formatMessage } = useIntl()

  return (
    <Dialog open={Boolean(onAction)} onClose={() => onAction?.(false)}>
      <div>
        <Typography
          style="semibold"
          variant="subtitle"
          className="inline-flex items-center gap-1"
        >
          {icon}
          {title}
        </Typography>
        <div className="flex items-center justify-center gap-2 my-1">
          <Typography
            variant="body2"
            className="text-primary-500 bg-primary-100 px-1.5 rounded-md"
          >
            {format(new Date(props.endDate ?? 0), 'dd/MM/yyyy')}
          </Typography>
          <ArrowLeftIcon className="w-4 h-4" />
          <Typography
            variant="body2"
            className="text-red-500 bg-red-100 px-1.5 line-through rounded-md"
          >
            {format(new Date(props.startDate ?? 0), 'dd/MM/yyyy')}
          </Typography>
        </div>
        <Typography variant="body2">{body}</Typography>
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
          {formatMessage(actionsMessages.applyChanges)}
        </Button>
      </div>
    </Dialog>
  )
}

export default ConfirmationDialog
