import { ReactElement } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Dialog from 'components/Dialog'
import { useIntl } from 'react-intl'
import { quarantineDialogMessages } from '../messages'
import Button from 'components/Button'
import { actionsMessages } from 'globalMessages'
import { useOverflowLine } from 'context/OverflowLines'
import useToast from 'hooks/useToast'

interface Props {
  id: string
  phone: string
  release: boolean
  onClose: () => void
  onSuccess: () => void
}

const QuarantineDialog = (props: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useOverflowLine()
  const toast = useToast()
  const open = props.id !== ''

  const toggleQuarantine = async (): Promise<void> => {
    try {
      const updated = await actions?.updateQuarantine(props.id, props.release)

      if (updated) {
        toast.success(
          formatMessage(quarantineDialogMessages.success, {
            status: props.release ? 'free' : 'none'
          })
        )
        await actions?.get()
        props.onSuccess()
      }
    } catch {}
  }

  return (
    <Dialog open={open} size="md" padding="none" onClose={props.onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-3">
            {formatMessage(quarantineDialogMessages.title, {
              status: props.release ? 'quarantine' : 'other'
            })}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatMessage(quarantineDialogMessages.question, {
              status: props.release ? 'quarantine' : 'other',
              phone: props.phone
            })}
          </p>
        </div>
      </div>
      <div className="px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="tonal" color="secondary" onClick={props.onClose}>
          {formatMessage(actionsMessages.cancel)}
        </Button>
        <Button variant="contained" color="primary" onClick={toggleQuarantine}>
          {formatMessage(actionsMessages.accept)}
        </Button>
      </div>
    </Dialog>
  )
}

export default QuarantineDialog
