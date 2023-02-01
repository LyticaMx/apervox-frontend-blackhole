import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Checkbox from 'components/Form/Checkbox'
import Typography from 'components/Typography'
import { useCases } from 'context/Cases'
import { actionsMessages, generalMessages } from 'globalMessages'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { kickOutUserDialogMessages } from '../messages'

interface Props {
  open: boolean
  onClose: () => void
  userId: string
  fullName: string
}

const KickOutUserDialog = (props: Props): ReactElement => {
  const { open, userId, fullName, onClose } = props
  const { actions } = useCases()
  const [acceptResponsability, setAcceptResponsability] =
    useState<boolean>(false)
  const { formatMessage } = useIntl()

  const unlinkUser = async (): Promise<void> => {
    const updated = await actions?.linkUser(userId, false)
    if (updated) onClose()
  }

  useEffect(() => {
    if (open) setAcceptResponsability(false)
  }, [open])

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
              {formatMessage(kickOutUserDialogMessages.kickOut, {
                user: fullName
              })}
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              {formatMessage(generalMessages.userLinkedAction)}
            </Typography>
            <Checkbox
              checked={acceptResponsability}
              onChange={(e) => setAcceptResponsability(e.target.checked)}
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
                disabled={!acceptResponsability}
                onClick={unlinkUser}
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

export default KickOutUserDialog
