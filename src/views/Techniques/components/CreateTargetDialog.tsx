import { ReactElement } from 'react'

import Dialog from 'components/Dialog'
import Typography from 'components/Typography'
import TargetForm, { FormValues } from './TargetForm'
import { useIntl } from 'react-intl'
import { createTargetDialogMessages } from '../messages'

interface Props {
  open?: boolean
  selected?: Number
  onClose?: (event?: any) => void
  onAccept?: (target: FormValues) => void
}

const CreateTargetDialog = ({
  open = true,
  onClose = () => {},
  onAccept
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <Dialog open={open} onClose={onClose} size="md" padding="none">
      <div className="bg-white px-8 py-5">
        <Typography variant="title" style="bold" className="uppercase">
          {formatMessage(createTargetDialogMessages.addTarget)}
        </Typography>
        <Typography className="leading-tight my-2">
          {formatMessage(createTargetDialogMessages.selectTargetType)}
        </Typography>
        <TargetForm onSubmit={onAccept as any} />
      </div>
    </Dialog>
  )
}

export default CreateTargetDialog
