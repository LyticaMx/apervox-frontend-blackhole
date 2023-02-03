import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Typography from 'components/Typography'
import { generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { forgotPasswordMessages } from '../mesages'

interface Props {
  open: boolean
  onClose: () => void
}

const ForgotPasswordDialog = (props: Props): ReactElement => {
  const { open, onClose } = props
  const { formatMessage } = useIntl()

  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <div className="flex justify-center items-center flex-col">
        <InformationCircleIcon className="w-5 h-5 text-indigo-500" />
        <Typography style="semibold" className="mt-2 text-center">
          {formatMessage(forgotPasswordMessages.title)}
        </Typography>
        <Typography className="mt-2 text-center">
          {formatMessage(forgotPasswordMessages.description)}
        </Typography>
        <Button
          onClick={onClose}
          color="indigo"
          variant="contained"
          className="mt-4"
        >
          {formatMessage(generalMessages.understand)}
        </Button>
      </div>
    </Dialog>
  )
}

export default ForgotPasswordDialog
