import { ReactElement, useEffect, useState } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { useToggle } from 'usehooks-ts'
import Title from 'components/Title'
import UserFilter from './components/UserFilter'
import UserList from './components/UserList'
import DeleteDialog from './components/DeleteDialog'
import DisableDialog from './components/DisableDialog'
import RemoteLogOffDialog from './components/RemoteLogOffDialog'
import ResetPasswordDialog from './components/ResetPasswordDialog'
import UnlockDialog from './components/UnlockDialog'
import CreateUserDrawer from './components/CreateUserDrawer'
import EditUserDrawer from './components/EditUserDrawer'
import { usersMessages } from './messages'
import NewPasswordDialog from './components/NewPasswordDialog'
import { useUsers } from 'context/Users'
import { formatTotal } from 'utils/formatTotal'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'

interface SynchroDeleteIds {
  ids: string[]
  resolve: ((value: boolean | PromiseLike<boolean>) => void) | null
}

const UsersAdmin = (): ReactElement => {
  const getMessage = useFormatMessage(usersMessages)
  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [disableUsers, setDisableUsers] = useState<{
    ids: string[]
    disabled?: boolean
  }>({
    ids: []
  })
  const [logOutIds, setLogOutIds] = useState<string[]>([])
  const [deleteUsers, setDeleteUsers] = useState<SynchroDeleteIds>({
    ids: [],
    resolve: null
  })
  const [resetPasswordId, setResetPasswordId] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [openUnlockDialog, toggleUnlockDialog] = useToggle(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { totalUsers } = useUsers()
  const { actions: auditActions } = useModuleAudits()

  useEffect(() => {
    auditActions?.genAudit(ModuleAuditsTypes.AuditableModules.USERS)
  }, [])

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">
            {formatTotal(totalUsers, getMessage('subtitle'))}
          </p>
        </div>

        <UserFilter toggleOpen={toggleOpenCreateDrawer} />

        <CreateUserDrawer
          open={openCreateDrawer}
          onCreated={(password) => {
            setNewPassword(password)
            toggleOpenCreateDrawer()
          }}
          onClose={toggleOpenCreateDrawer}
        />

        {!!selectedUser && (
          <EditUserDrawer
            open={!!selectedUser}
            onClose={() => {
              setSelectedUser(null)
            }}
            user={selectedUser}
          />
        )}

        <DeleteDialog
          ids={deleteUsers.ids}
          resolve={deleteUsers.resolve ?? (() => {})}
          onConfirm={() => setDeleteUsers({ ids: [], resolve: null })}
          onClose={() => {
            if (deleteUsers.resolve) deleteUsers.resolve(false)
            setDeleteUsers({ ids: [], resolve: null })
          }}
        />
        <DisableDialog
          ids={disableUsers.ids}
          onClose={() => setDisableUsers({ ids: [] })}
          disabled={disableUsers.disabled}
        />
        <RemoteLogOffDialog ids={logOutIds} onClose={() => setLogOutIds([])} />
        <ResetPasswordDialog
          id={resetPasswordId}
          onClose={() => setResetPasswordId('')}
          onAccept={(password) => {
            setResetPasswordId('')
            setNewPassword(password)
          }}
        />
        <NewPasswordDialog
          newPassword={newPassword}
          onClose={() => setNewPassword('')}
        />
        <UnlockDialog open={openUnlockDialog} onClose={toggleUnlockDialog} />
      </div>

      <div className="mt-2">
        <UserList
          onSelectUser={setSelectedUser}
          onDeleteUser={async (ids) =>
            await new Promise<boolean>((resolve) => {
              setDeleteUsers({ ids, resolve })
            })
          }
          onDisableUser={(ids, status) =>
            setDisableUsers({ ids, disabled: status === 'disabled' })
          }
          onRemoteLogOffUser={setLogOutIds}
          onUnlockUser={toggleUnlockDialog}
          onResetPasswordUser={setResetPasswordId}
        />
      </div>
    </>
  )
}

export default UsersAdmin
