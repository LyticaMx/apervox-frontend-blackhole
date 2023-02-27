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

const UsersAdmin = (): ReactElement => {
  const getMessage = useFormatMessage(usersMessages)
  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [openDeleteDialog, toggleDeleteDialog] = useToggle(false)
  const [openDisableDialog, toggleDisableDialog] = useToggle(false)
  const [openRemoteLogOffDialog, toggleRemoteLogOffDialog] = useToggle(false)
  const [openResetPasswordDialog, toggleResetPasswordDialog] = useToggle(false)
  const [openUnlockDialog, toggleUnlockDialog] = useToggle(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [totalSelectedUsers, setTotalSelectedUsers] = useState<Number>(1)

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
          selectedUsers={totalSelectedUsers}
          open={openDeleteDialog}
          onClose={toggleDeleteDialog}
        />
        <DisableDialog
          selectedUsers={totalSelectedUsers}
          open={openDisableDialog}
          onClose={toggleDisableDialog}
        />
        <RemoteLogOffDialog
          selectedUsers={totalSelectedUsers}
          open={openRemoteLogOffDialog}
          onClose={toggleRemoteLogOffDialog}
        />
        <ResetPasswordDialog
          open={openResetPasswordDialog}
          onClose={toggleResetPasswordDialog}
        />
        <UnlockDialog open={openUnlockDialog} onClose={toggleUnlockDialog} />
      </div>

      <div className="flex gap-4 mt-2">
        <UserList
          onSelectUser={setSelectedUser}
          setTotalSelectedUsers={setTotalSelectedUsers}
          onDeleteUser={toggleDeleteDialog}
          onDisableUser={toggleDisableDialog}
          onRemoteLogOffUser={toggleRemoteLogOffDialog}
          onUnlockUser={toggleUnlockDialog}
          onResetPasswordUser={toggleResetPasswordDialog}
        />
      </div>
    </>
  )
}

export default UsersAdmin
