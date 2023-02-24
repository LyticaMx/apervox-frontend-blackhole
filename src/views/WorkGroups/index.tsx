import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { useToggle } from 'usehooks-ts'
import Title from 'components/Title'
import WorkGroupFilter from './components/WorkGroupFilter'
import DeleteDialog from './components/DeleteDialog'
import DisableDialog from './components/DisableDialog'
// import UserList from './components/UserList'
// import RemoteLogOffDialog from './components/RemoteLogOffDialog'
// import ResetPasswordDialog from './components/ResetPasswordDialog'
// import UnlockDialog from './components/UnlockDialog'
import CreateWorkGroupDrawer from './components/CreateWorkGroupDrawer'
// import EditUserDrawer from './components/EditUserDrawer'
import { workGroupsMessages } from './messages'

const WorkGroups = (): ReactElement => {
  const getMessage = useFormatMessage(workGroupsMessages)
  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [openDeleteDialog, toggleDeleteDialog] = useToggle(true)
  const [openDisableDialog, toggleDisableDialog] = useToggle(true)
  // const [selectedUser, setSelectedUser] = useState<any>(null)
  // const [totalSelectedUsers, setTotalSelectedUsers] = useState<Number>(1)

  return (
    <>
      <div className="flex justify-between">
        <div>
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">04 {getMessage('subtitle')}</p>
        </div>

        <WorkGroupFilter toggleOpen={toggleOpenCreateDrawer} />

        <CreateWorkGroupDrawer
          open={openCreateDrawer}
          onClose={toggleOpenCreateDrawer}
        />

        <DeleteDialog open={openDeleteDialog} onClose={toggleDeleteDialog} />
        <DisableDialog open={openDisableDialog} onClose={toggleDisableDialog} />

        {/* {!!selectedUser && (
          <EditUserDrawer
            open={!!selectedUser}
            onClose={() => {
              setSelectedUser(null)
            }}
            user={selectedUser}
          />
        )} */}
      </div>

      <div className="flex gap-4 mt-2">
        {/* <UserList
          onSelectUser={setSelectedUser}
          setTotalSelectedUsers={setTotalSelectedUsers}
          onDeleteUser={toggleDeleteDialog}
          onDisableUser={toggleDisableDialog}
          onRemoteLogOffUser={toggleRemoteLogOffDialog}
          onUnlockUser={toggleUnlockDialog}
          onResetPasswordUser={toggleResetPasswordDialog}
        /> */}
      </div>
    </>
  )
}

export default WorkGroups
