import { ReactElement } from 'react'

import Dialog from 'components/Dialog'
import { Target } from 'types/technique'
import Typography from 'components/Typography'
import ObjectiveForm from './ObjectiveForm'
import { useIntl } from 'react-intl'
import { createObjectiveDialogMessages } from '../messages'

interface Props {
  open?: boolean
  selected?: Number
  onClose?: (event?: any) => void
  onAccept?: (objective: Partial<Target>) => void
}

const CreateObjectiveDialog = ({
  open = true,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <Dialog open={open} onClose={onClose} size="md" padding="none">
      <div className="bg-white px-8 py-5">
        <Typography variant="title" style="bold" className="uppercase">
          {formatMessage(createObjectiveDialogMessages.addObjective)}
        </Typography>
        <Typography className="leading-tight my-2">
          {formatMessage(createObjectiveDialogMessages.selectObjectiveType)}
        </Typography>
        <ObjectiveForm
          onSubmit={(values: Partial<Target>) => onAccept(values)}
        />
      </div>
    </Dialog>
  )
}

export default CreateObjectiveDialog
