import { ReactElement, useEffect, useState } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { useToggle } from 'usehooks-ts'
import Title from 'components/Title'
import Card from 'components/Card'
import Tabs from 'components/Tabs'
import TechniqueList from './components/TechniqueList'
import { useWorkGroups } from 'context/WorkGroups'
import WorkGroupFilter from './components/WorkGroupFilter'
import DeleteDialog from './components/DeleteDialog'
import DisableDialog from './components/DisableDialog'
import WorkGroupList from './components/WorkGroupList'
import AssociatedUserList from './components/AssociatedUserList'
import CreateWorkGroupDrawer from './components/CreateWorkGroupDrawer'
import EditWorkGroupDrawer from './components/EditWorkGroupDrawer'
import HistoryDrawer from './components/HistoryDrawer'
import { workGroupsMessages } from './messages'
import Typography from 'components/Typography'

const WorkGroups = (): ReactElement => {
  const getMessage = useFormatMessage(workGroupsMessages)
  const [tab, setTab] = useState<string>('users')
  const [openHistoryDrawer, toggleOpenHistoryDrawer] = useToggle(false)
  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [openEditDrawer, toggleOpenEditDrawer] = useToggle(false)
  const [openDeleteDialog, toggleDeleteDialog] = useToggle(false)
  const [openDisableDialog, toggleDisableDialog] = useToggle(false)
  const { actions, selected, associatedUsers, associatedTechniques } =
    useWorkGroups()

  useEffect(() => {
    actions?.getWorkGroups()
  }, [])

  useEffect(() => {
    if (tab === 'users') {
      actions?.getWorkGroupUsers(selected.id ?? '')
    } else {
      actions?.getWorkGroupTechniques(selected.id ?? '')
    }
  }, [tab])

  useEffect(() => {
    if (selected.id) {
      setTab('users')
      actions?.getWorkGroupUsers(selected.id)

      // toggleOpenEditDrawer()
    }
  }, [selected])

  useEffect(() => {
    openCreateDrawer && actions?.selectWorkGroup()
  }, [openCreateDrawer])

  const handleGetHistory = (id: string): void => {
    toggleOpenHistoryDrawer()

    actions?.getHistory(id)
  }

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

        <HistoryDrawer
          open={openHistoryDrawer}
          onClose={toggleOpenHistoryDrawer}
        />

        <DeleteDialog open={openDeleteDialog} onClose={toggleDeleteDialog} />
        <DisableDialog open={openDisableDialog} onClose={toggleDisableDialog} />

        <EditWorkGroupDrawer
          open={openEditDrawer}
          onClose={toggleOpenEditDrawer}
        />
      </div>

      <div className="flex gap-4 mt-2 mb-4">
        <WorkGroupList handleClickOnHistory={handleGetHistory} />
      </div>

      {selected.id && (
        <Card className="px-4 py-2">
          <Title className="uppercase">
            {getMessage('assignedSectionTitle', { groupName: selected.name })}
          </Title>
          <Typography variant="subtitle">{selected.description}</Typography>

          <Tabs
            actualTab={tab}
            defaultTab={tab}
            onChangeTab={(newTab) => setTab(newTab)}
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

                    <TechniqueList data={associatedTechniques} />
                  </div>
                )
              }
            ]}
          />
        </Card>
      )}
    </>
  )
}

export default WorkGroups
