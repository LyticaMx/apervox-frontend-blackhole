import { ReactElement, useEffect, useState } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { useToggle } from 'usehooks-ts'
import Title from 'components/Title'
import Card from 'components/Card'
import Tabs from 'components/Tabs'
import { useWorkGroups } from 'context/WorkGroups'
import WorkGroupFilter from './components/WorkGroupFilter'
import DeleteDialog from './components/DeleteDialog'
import DisableDialog from './components/DisableDialog'
import WorkGroupList from './components/WorkGroupList'
import AssociatedUserList from './components/AssociatedUserList'
import AssociatedTechniqueList from './components/AssociatedTechniqueList'
import CreateWorkGroupDrawer from './components/CreateWorkGroupDrawer'
import { workGroupsMessages } from './messages'

const WorkGroups = (): ReactElement => {
  const getMessage = useFormatMessage(workGroupsMessages)
  const [tab, setTab] = useState<string>('users')
  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [openDeleteDialog, toggleDeleteDialog] = useToggle(false)
  const [openDisableDialog, toggleDisableDialog] = useToggle(false)
  const { actions, selected, associatedUsers, associatedTechniques } =
    useWorkGroups()

  useEffect(() => {
    actions?.getUsers()
    actions?.getTechniques()
    actions?.getWorkGroups()
  }, [])

  useEffect(() => {
    if (tab === 'users') {
      actions?.getWorkGroupUsers(selected.id)
    } else {
      actions?.getWorkGroupTechniques(selected.id)
    }
  }, [tab])

  useEffect(() => {
    if (selected.id) actions?.getWorkGroupUsers(selected.id)
  }, [selected])

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
        <WorkGroupList />
      </div>

      {selected.id && (
        <Card className="px-4 py-2">
          <Title className="uppercase">
            {getMessage('assignedSectionTitle')}
          </Title>

          <Tabs
            tabs={[
              {
                id: 'users',
                name: 'Usuarios asignados',
                component: (
                  <div className="py-2">
                    <p className="uppercase mb-2">
                      {associatedUsers.length}{' '}
                      {getMessage('assignedUsersSubtitle')}
                    </p>

                    <AssociatedUserList />
                  </div>
                )
              },
              {
                id: 'techniques',
                name: 'Técnicas Asignadas',
                component: (
                  <div className="py-2">
                    <p className="uppercase mb-2">
                      {associatedTechniques.length}{' '}
                      {getMessage('assignedTechniquesSubtitle')}
                    </p>

                    <AssociatedTechniqueList />
                  </div>
                )
              }
            ]}
            defaultTab={tab}
            onChangeTab={(newTab) => setTab(newTab)}
          />
        </Card>
      )}
    </>
  )
}

export default WorkGroups
