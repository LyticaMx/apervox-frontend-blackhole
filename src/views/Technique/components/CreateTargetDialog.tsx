import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import { Target } from 'types/technique'

import Dialog from 'components/Dialog'
import Typography from 'components/Typography'

import TargetForm from './TargetForm'
import { createTargetDialogMessages } from '../messages'

interface Props {
  open?: boolean
  selected?: Number
  onClose?: (event?: any) => void
  onAccept?: (target: Partial<Target> | Target) => void
}

const CreateTargetDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {}
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
        <TargetForm
          onSubmit={(values: Partial<Target>) => onAccept(values)}
        />
      </div>
    </Dialog>
  )
}

export default CreateTargetDialog
