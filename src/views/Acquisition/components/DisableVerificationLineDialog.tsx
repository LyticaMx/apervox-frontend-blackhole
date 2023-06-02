import useToast from 'hooks/useToast'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import Dialog from 'components/Dialog'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Switch from 'components/Form/Switch'
import Button from 'components/Button'
import { actionsMessages } from 'globalMessages'
import { VerificationLine } from 'types/verificationLine'
import { useVerificationLine } from 'context/VerificationLines'

import { disableDialogMessages } from '../messages'

interface Props {
  open: boolean
  data: VerificationLine | null
  onClose?: () => void
}

const DisableVerificationLineDialog = (props: Props): ReactElement => {
  const { onClose = () => {} } = props
  const { formatMessage } = useIntl()
  const { actions } = useVerificationLine()
  const [currentStatus, setCurrentStatus] = useState<boolean>(
    props.data?.status ?? true
  )
  const toast = useToast()

  const handleDisable = async (): Promise<void> => {
    try {
      const updated = await actions?.toggleStatus(
        props.data?.id ?? '',
        currentStatus
      )

      if (updated) {
        await actions?.get({ page: 1 })
        toast.success(
          formatMessage(disableDialogMessages.success, {
            status: currentStatus
          })
        )
        onClose()
      }
    } catch {}
  }

  useEffect(() => {
    setCurrentStatus(props.data?.status ?? false)
  }, [props.data])

  return (
    <Dialog open={props.open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />

          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {formatMessage(disableDialogMessages.verificationTitle, {
              status: currentStatus
            })}
          </h3>

          <Switch
            value={currentStatus}
            onChange={setCurrentStatus}
            color="primary"
          />

          <p className="text-sm text-gray-500 mt-1">
            {formatMessage(disableDialogMessages.message, {
              status: currentStatus
            })}
          </p>
        </div>
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="primary" onClick={handleDisable}>
          {formatMessage(actionsMessages.accept)}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          {formatMessage(actionsMessages.cancel)}
        </Button>
      </div>
    </Dialog>
  )
}

export default DisableVerificationLineDialog
