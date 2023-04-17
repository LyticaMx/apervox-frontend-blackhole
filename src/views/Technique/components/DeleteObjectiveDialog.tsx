import { ReactElement } from 'react'

import { InformationCircleIcon } from '@heroicons/react/24/outline'

import Dialog from 'components/Dialog'
import Button from 'components/Button'
import Typography from 'components/Typography'
import { useGlobalMessage } from 'hooks/useIntl'
import { useIntl } from 'react-intl'
import { deleteObjectiveDialogMessages } from '../messages'

interface Props {
  open: boolean
  objectivePhone: string
  onClose?: (event?: any) => void
  onAccept?: () => void
}

const DeleteObjectiveDialog = ({
  open = true,
  objectivePhone,
  onClose = () => {},
  onAccept = () => {}
}: Props): ReactElement => {
  const getGlobalMessage = useGlobalMessage()
  const { formatMessage } = useIntl()

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-indigo-500 m-auto mb-2" />
          <Typography variant="subtitle" style="semibold">
            {formatMessage(deleteObjectiveDialogMessages.deleteObjective)}
          </Typography>
          <Typography className="mt-1 mb-2">
            {formatMessage(deleteObjectiveDialogMessages.wantToRemove, {
              objectivePhone
            })}
          </Typography>
        </div>
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="indigo" onClick={onAccept}>
          {getGlobalMessage('accept', 'actionsMessages')}
        </Button>

        <Button variant="contained" color="secondary" onClick={onClose}>
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default DeleteObjectiveDialog