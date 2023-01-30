import { ReactElement, useState } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'
import { useIntl } from 'react-intl'
import { reactivateCaseDialogMessages } from '../messages'
import { actionsMessages, generalMessages } from 'globalMessages'
import { useCases } from 'context/Cases'

interface Props {
  open: boolean
  caseId: string
  name: string
  onAccept: () => Promise<void>
  onClose: () => void
}

const ReactivateCaseDialog = (props: Props): ReactElement => {
  const { open, caseId, name, onAccept, onClose } = props
  const [acceptResoponsability, setAcceptResoponsability] =
    useState<boolean>(false)
  const { formatMessage } = useIntl()
  const { actions } = useCases()

  const reactivateCase = async (): Promise<void> => {
    const updated = await actions?.updateCase(caseId, false)
    if (updated) {
      setAcceptResoponsability(false)
      onAccept()
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} size="md" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm-items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="h6- w-6 text-red-600"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
            <Typography variant="title">
              {formatMessage(reactivateCaseDialogMessages.reactivateCase, {
                caseName: name
              })}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {formatMessage(generalMessages.userLinkedAction)}
            </Typography>
            <Checkbox
              checked={acceptResoponsability}
              onChange={(e) => setAcceptResoponsability(e.target.checked)}
              label={formatMessage(actionsMessages.userAcceptAction)}
              className="my-2"
            />
            <div className="flex">
              <Button
                className="mr-4 border border-slate-200"
                onClick={onClose}
              >
                {formatMessage(actionsMessages.cancel)}
              </Button>
              <Button
                variant="contained"
                color="red"
                disabled={!acceptResoponsability}
                onClick={reactivateCase}
              >
                {formatMessage(actionsMessages.accept)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ReactivateCaseDialog
