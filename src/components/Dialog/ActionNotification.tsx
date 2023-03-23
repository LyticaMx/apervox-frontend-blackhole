import { ReactElement } from 'react'

import { InformationCircleIcon } from '@heroicons/react/24/outline'

import Dialog from 'components/Dialog'
import Button from 'components/Button'
import Typography from 'components/Typography'

import { useGlobalMessage } from 'hooks/useIntl'

interface Props {
  open: boolean
  title: string
  onAccept?: () => void
}

const ActionNotification = ({
  open,
  title,
  onAccept = () => {}
}: Props): ReactElement => {
  const getGlobalMessage = useGlobalMessage()

  return (
    <Dialog open={open} onClose={() => {}} size="md" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-indigo-600 m-auto mb-2" />
          <Typography variant="subtitle" style="semibold">
            {title}
          </Typography>

          <Typography className="mt-1 mb-2">
            El registro se eliminará definitivamente y quedará registrado para
            ser auditada esta acción.
          </Typography>
        </div>
      </div>

      <div className="flex px-4 pb-8 gap-2  justify-center">
        <Button variant="contained" color="indigo" onClick={onAccept}>
          {getGlobalMessage('accept', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default ActionNotification
