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
import { workGroupsEditDrawerMessages, workGroupsMessages } from './messages'
import Typography from 'components/Typography'
import { formatTotal } from 'utils/formatTotal'
import { useDrawer } from 'context/Drawer'
import { useIntl } from 'react-intl'

interface SynchroEditIds {
  ids: string[]
  resolve: ((value: boolean | PromiseLike<boolean>) => void) | null
}

const WorkGroups = (): ReactElement => {
  const getMessage = useFormatMessage(workGroupsMessages)
  const [tab, setTab] = useState<string>('users')
  const { actions: drawerActions } = useDrawer()
  const { formatMessage } = useIntl()
  const [openHistoryDrawer, toggleOpenHistoryDrawer] = useToggle(false)
  const [openCreateDrawer, toggleOpenCreateDrawer] = useToggle(false)
  const [disableWorkgroups, setDisableWorkgroups] = useState<SynchroEditIds>({
    ids: [],
    resolve: null
  })
  const [deletedWorkgroups, setDeletedWorkgroups] = useState<SynchroEditIds>({
    ids: [],
    resolve: null
  })
  const {
    actions,
    selected,
    techniquesPagination,
    usersPagination,
    totalWorkGroups
  } = useWorkGroups()

  useEffect(() => {
    actions?.selectWorkGroup()
    actions?.getWorkGroups({}, true)
  }, [])

  useEffect(() => {
    if (selected.id) {
      if (tab === 'users') {
        actions?.getWorkGroupUsers({ page: 1 })
      } else {
        actions?.getWorkGroupTechniques({ page: 1 })
      }
    }
  }, [tab])

  useEffect(() => {
    if (selected.id) {
      setTab('users')
      actions?.getWorkGroupUsers({ page: 1 })
      drawerActions?.handleOpenDrawer({
        body: <EditWorkGroupDrawer actualTab={tab} />,
        type: 'aside',
        title: (
          <Typography variant="title" style="bold" className="uppercase">
            {formatMessage(workGroupsEditDrawerMessages.title)}
          </Typography>
        ),

        config: {
          withoutBackdrop: true,
          onClose: () => actions?.selectWorkGroup()
        }
      })
    } else {
      drawerActions?.handleCloseDrawer()
    }
  }, [selected?.id])

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
          <p className="uppercase">
            {formatTotal(totalWorkGroups, getMessage('subtitle'))}
          </p>
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

        <DeleteDialog
          ids={deletedWorkgroups.ids}
          resolve={deletedWorkgroups.resolve ?? (() => {})}
          onConfirm={() => setDeletedWorkgroups({ ids: [], resolve: null })}
          onClose={() => {
            if (deletedWorkgroups.resolve) deletedWorkgroups.resolve(false)
            setDeletedWorkgroups({ ids: [], resolve: null })
          }}
        />
        <DisableDialog
          ids={disableWorkgroups.ids}
          resolve={disableWorkgroups.resolve ?? (() => {})}
          onConfirm={() => setDisableWorkgroups({ ids: [], resolve: null })}
          onClose={() => {
            if (disableWorkgroups.resolve) disableWorkgroups.resolve(false)
            setDisableWorkgroups({ ids: [], resolve: null })
          }}
        />
      </div>

      <div className="flex gap-4 mt-2 mb-4">
        <WorkGroupList
          handleClickOnHistory={handleGetHistory}
          handleDelete={async (ids) =>
            await new Promise<boolean>((resolve) =>
              setDeletedWorkgroups({
                ids,
                resolve
              })
            )
          }
          handleDisable={async (ids) =>
            await new Promise<boolean>((resolve) =>
              setDisableWorkgroups({ ids, resolve })
            )
          }
        />
      </div>

      {selected.id && (
        <Card className="px-4 py-2">
          <div className="flex items-center justify-between">
            <div>
              <Title className="uppercase">
                {getMessage('assignedSectionTitle', {
                  groupName: selected.name
                })}
              </Title>
              <Typography variant="subtitle">{selected.description}</Typography>
            </div>
          </div>

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
                      {formatTotal(
                        usersPagination.totalRecords,
                        getMessage('assignedUsersSubtitle')
                      )}
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
                      {formatTotal(
                        techniquesPagination.totalRecords,
                        getMessage('assignedTechniquesSubtitle')
                      )}
                    </p>

                    <TechniqueList />
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
