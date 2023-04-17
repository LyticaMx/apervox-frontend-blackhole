import { ReactElement, useMemo } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Dialog from 'components/Dialog'
import Button from 'components/Button'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { usersRemoteLogOffMessages } from '../messages'
import { useUsers } from 'context/Users'
import useToast from 'hooks/useToast'

interface Props {
  ids: string[]
  onClose?: (event?: any) => void
}

const RemoteLogOffDialog = ({
  ids,
  onClose = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(usersRemoteLogOffMessages)
  const getGlobalMessage = useGlobalMessage()
  const { actions } = useUsers()
  const { launchToast } = useToast()

  const open = useMemo(() => ids.length > 0, [ids.length])

  const handleLogOut = async (): Promise<void> => {
    try {
      let loggedOut = false
      if (ids.length === 1) {
        loggedOut = Boolean(await actions?.closeSession(ids[0]))
      } else {
        loggedOut = Boolean(await actions?.closeMultipleSessions(ids))
      }

      if (loggedOut) {
        onClose()
        launchToast({
          type: 'Success',
          title: getMessage('success')
        })
      }
    } catch {}
  }

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="text-center sm:mt-0">
          <InformationCircleIcon className="h-6 w-6 text-primary m-auto mb-2" />

          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {getMessage('title', { selectedUsers: ids.length })}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {getMessage('message', { selectedUsers: ids.length })}
          </p>
        </div>
      </div>

      <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
        <Button variant="contained" color="primary" onClick={handleLogOut}>
          {getGlobalMessage('accept', 'actionsMessages')}
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          {getGlobalMessage('cancel', 'actionsMessages')}
        </Button>
      </div>
    </Dialog>
  )
}

export default RemoteLogOffDialog
