import { ReactElement, useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

import Dialog from 'components/Dialog'
import Button from 'components/Button'
import Switch from 'components/Form/Switch'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { rolesDisableMessages } from '../messages'
import { useRoles } from 'context/Roles'
import { Role } from 'types/auth'
import useToast from 'hooks/useToast'

interface Props {
  open?: boolean
  role?: Role
  onClose?: (event?: any) => void
}

const DisableDialog = ({
  open = true,
  role,
  onClose = () => {}
}: Props): ReactElement => {
  const { actions } = useRoles()
  const getMessage = useFormatMessage(rolesDisableMessages)
  const getGlobalMessage = useGlobalMessage()
  const toast = useToast()
  const [enabled, setEnabled] = useState<boolean>(true)

  const handleAccept = async (): Promise<void> => {
    try {
      if (role) await actions?.toggleDisable(role.id, enabled)
      toast.success(getMessage('success', { enabled }))
      await actions?.getRoles()
      onClose()
    } catch {}
  }

  useEffect(() => {
    if (open && role) {
      setEnabled(role.status)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {getMessage('title', { enabled: role?.status ?? true })}
          </h3>
          <p className="text-sm text-gray-500 mb-2">
            {getMessage('message', { enabled: role?.status ?? true })}
          </p>
          <div className="flex justify-center items-center text-sm gap-2 my-4">
            <span>{getGlobalMessage('disable', 'actionsMessages')}</span>
            <Switch
              color="indigo"
              size="sm"
              value={enabled}
              onChange={setEnabled}
            />
            <span>{getGlobalMessage('enable', 'actionsMessages')}</span>
          </div>
        </div>
      </div>
      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="primary" onClick={handleAccept}>
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
