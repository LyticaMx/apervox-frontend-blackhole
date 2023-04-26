import { ReactElement, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Dialog from 'components/Dialog'
import Button from 'components/Button'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { workGroupsDisableDialogMessages } from '../messages'
import { useWorkGroups } from 'context/WorkGroups'
import Switch from 'components/Form/Switch'
import useToast from 'hooks/useToast'

interface Props {
  ids: string[]
  currentStatus?: boolean
  onConfirm?: () => void
  onClose?: (event?: any) => void
  resolve: (value: boolean | PromiseLike<boolean>) => void
}

const DisableDialog = ({
  ids,
  onClose = () => {},
  onConfirm = () => {},
  resolve
}: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupsDisableDialogMessages)
  const getGlobalMessage = useGlobalMessage()
  const { actions } = useWorkGroups()
  const [currentStatus, setCurrentStatus] = useState<boolean>(false)
  const toast = useToast()

  const handleDisable = async (): Promise<void> => {
    try {
      const updated = Boolean(
        await actions?.toggleDisableWorkGroups(ids, currentStatus)
      )

      resolve(updated)

      if (updated) {
        onConfirm()
        await actions?.getWorkGroups({ page: 1 })
        toast.success(
          getMessage('success', { status: currentStatus, total: ids.length })
        )
        return
      }
    } catch {
      resolve(false)
    }
  }

  return (
    <Dialog open={ids.length > 0} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />

          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {getMessage('title', { status: currentStatus, total: ids.length })}
          </h3>

          <Switch value={currentStatus} onChange={setCurrentStatus} />

          <p className="text-sm text-gray-500 mt-1">
            {getMessage('message', {
              status: currentStatus,
              total: ids.length
            })}
          </p>
        </div>
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="primary" onClick={handleDisable}>
          {getGlobalMessage('accept', 'actionsMessages')}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default DisableDialog
