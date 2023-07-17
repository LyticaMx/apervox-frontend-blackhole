import { useOverflowLine } from 'context/OverflowLines'
import useToast from 'hooks/useToast'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { disableDialogMessages } from '../messages'
import Dialog from 'components/Dialog'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Switch from 'components/Form/Switch'
import Button from 'components/Button'
import { actionsMessages } from 'globalMessages'
import { OverflowLine } from 'types/overflowLine'

interface Props {
  open: boolean
  data: OverflowLine | null
  ids: string[]
  onClose?: () => void
  onSuccess?: () => void
}

const DisableOverflowLineDialog = (props: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useOverflowLine()
  const [currentStatus, setCurrentStatus] = useState<boolean>(
    props.data?.status ?? true
  )
  const toast = useToast()

  const selected = useMemo(
    () => (props.ids.length ? props.ids.length : 1),
    [props.ids]
  )

  const handleDisable = async (): Promise<void> => {
    try {
      const ids = props.data ? [props.data.id ?? ''] : props.ids

      const updated = await actions?.updateMany(ids, { status: currentStatus })

      if (updated) {
        await actions?.get({ page: 1 })
        toast.success(
          formatMessage(disableDialogMessages.success, {
            selected,
            status: currentStatus
          })
        )
        props.onSuccess?.()
      }
    } catch {}
  }

  useEffect(() => {
    setCurrentStatus(props.data?.status ?? false)
  }, [props.data])

  return (
    <Dialog open={props.open} onClose={props.onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />

          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {formatMessage(disableDialogMessages.overflowTitle, { selected })}
          </h3>

          <Switch
            value={currentStatus}
            onChange={setCurrentStatus}
            color="primary"
          />

          <p className="text-sm text-gray-500 mt-1">
            {formatMessage(disableDialogMessages.message, {
              selected,
              status: currentStatus
            })}
          </p>
        </div>
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="tonal" color="secondary" onClick={props.onClose}>
          {formatMessage(actionsMessages.cancel)}
        </Button>
        <Button variant="contained" color="primary" onClick={handleDisable}>
          {formatMessage(actionsMessages.accept)}
        </Button>
      </div>
    </Dialog>
  )
}

export default DisableOverflowLineDialog
