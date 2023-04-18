import { ReactElement, useState } from 'react'
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

interface SynchroDeleteIds {
  ids: string[]
  resolve: ((value: boolean | PromiseLike<boolean>) => void) | null
}

const UsersAdmin = (): ReactElement => {
  const getMessage = useFormatMessage(usersMessages)
  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [disableIds, setDisableIds] = useState<string[]>([])
  const [logOutIds, setLogOutIds] = useState<string[]>([])
  const [deleteUsers, setDeleteUsers] = useState<SynchroDeleteIds>({
    ids: [],
    resolve: null
  })
  const [resetPasswordId, setResetPasswordId] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [openUnlockDialog, toggleUnlockDialog] = useToggle(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">04 {getMessage('subtitle')}</p>
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
        <DisableDialog ids={disableIds} onClose={() => setDisableIds([])} />
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

      <div className="flex gap-4 mt-2">
        <UserList
          onSelectUser={setSelectedUser}
          onDeleteUser={async (ids) =>
            await new Promise<boolean>((resolve) => {
              setDeleteUsers({ ids, resolve })
            })
          }
          onDisableUser={setDisableIds}
          onRemoteLogOffUser={setLogOutIds}
          onUnlockUser={toggleUnlockDialog}
          onResetPasswordUser={setResetPasswordId}
        />
      </div>
    </>
  )
}

export default UsersAdmin
