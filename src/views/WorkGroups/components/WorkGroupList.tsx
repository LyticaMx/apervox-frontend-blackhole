import { ReactElement } from 'react'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { useWorkGroups } from 'context/WorkGroups'

import Table from 'components/Table'
import Tag from 'components/Tag'
import { workGroupListMessages } from '../messages'
import {
  TrashIcon,
  RectangleGroupIcon,
  NoSymbolIcon
} from '@heroicons/react/24/outline'

import Switch from 'components/Form/Switch'
import Tooltip from 'components/Tooltip'
import StatusTag from 'components/Status/StatusTag'
import { Status } from 'types/status'
import { WorkGroup } from 'types/workgroup'
import * as helpers from './helpers'
import useToast from 'hooks/useToast'

interface Props {
  handleClickOnHistory: (id: string) => void
  handleDelete: (ids: string[]) => Promise<boolean>
  handleDisable: (ids: string[]) => Promise<boolean>
}

const WorkGroupList = ({
  handleClickOnHistory,
  handleDelete,
  handleDisable
}: Props): ReactElement => {
  const getMessage = useFormatMessage(workGroupListMessages)
  const { launchToast } = useToast()
  const { workGroups, actions, workGroupsPagination } = useWorkGroups()

  const columns = useTableColumns<WorkGroup>(() => [
    {
      accessorKey: 'name',
      header: getMessage('name')
    },
    {
      accessorKey: 'description',
      header: getMessage('description')
    },
    {
      accessorKey: 'created_at',
      header: getMessage('registrationDate'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'registered_by',
      header: getMessage('registeredBy')
    },
    {
      accessorKey: 'total_users',
      header: getMessage('users'),
      meta: {
        columnFilters: {
          options: [
            {
              name: getMessage('hasUsers'),
              value: 'yes'
            },
            { name: getMessage('hasNoUsers'), value: 'no' },
            {
              name: getMessage('both'),
              value: 'both'
            }
          ],
          onChange: async (values) =>
            await actions?.getWorkGroups({ hasUsers: values })
        }
      },
      enableSorting: false
    },
    {
      header: getMessage('techniques'),
      cell: () => {
        const techniques = []

        return (
          <div className="flex items-center justify-start">
            {Object.keys(techniques).map((key) => {
              const translations = helpers.getTechniqueStatusI18Key(key)

              return (
                <>
                  <Tooltip
                    content={getMessage(translations.i18Key)}
                    floatProps={{ offset: 10, arrow: true }}
                    classNames={{
                      panel:
                        'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                      arrow:
                        'absolute bg-white w-2 h-2 rounded-full bg-secondary'
                    }}
                    placement="top"
                  >
                    <span className="uppercase">
                      {getMessage(translations.i18AbbreviatedKey)}
                    </span>
                  </Tooltip>
                  <Tag
                    label={`${techniques[key]}`}
                    variant="caption"
                    className="w-6 mx-2"
                    roundedClassName="rounded-md"
                  />
                </>
              )
            })}
          </div>
        )
      },
      enableSorting: false,
      meta: {
        columnFilters: {
          options: [
            {
              name: getMessage('hasTechniques'),
              value: 'yes'
            },
            { name: getMessage('hasNoTechniques'), value: 'no' },
            {
              name: getMessage('both'),
              value: 'both'
            }
          ],
          onChange: async (values) =>
            await actions?.getWorkGroups({ hasTechniques: values })
        }
      }
    },
    {
      accessorKey: 'status',
      header: getMessage('status'),
      cell: ({ getValue }) => {
        const status = getValue<Status>()

        return <StatusTag value={status} />
      },
      meta: {
        columnFilters: {
          options: [
            {
              name: getMessage('enabled'),
              value: 'enabled'
            },
            {
              name: getMessage('disabled'),
              value: 'disabled'
            },
            {
              name: getMessage('both'),
              value: 'both'
            }
          ],
          onChange: async (values) =>
            await actions?.getWorkGroups({ status: values })
        }
      }
    },
    {
      accessorKey: 'id',
      enableSorting: false,
      header: getMessage('action'),
      cell: ({ getValue, cell, table }) => {
        const id = getValue<string>()
        const isActive =
          cell.row.original.status === 'active' ||
          cell.row.original.status === true

        return (
          <div className="flex pt-1" onClick={(e) => e.stopPropagation()}>
            <Tooltip
              content={getMessage(isActive ? 'disable' : 'enable')}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <Switch
                size="sm"
                value={isActive}
                onChange={async (status) => {
                  const updated = await actions?.updateStatusWorkGroup(
                    id,
                    status
                  )
                  if (updated) {
                    launchToast({
                      title: getMessage('updatedGroupStatus', {
                        enabled: status
                      }),
                      type: 'Success'
                    })
                    await actions?.getWorkGroups()
                  }
                }}
                color="blue"
              />
            </Tooltip>

            <Tooltip
              content={getMessage('history')}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <RectangleGroupIcon
                className="h-5 w-5 mx-1 ml-2 text-muted hover:text-primary cursor-pointer"
                onClick={() => {
                  handleClickOnHistory(id)

                  console.log(`onViewHistoryGroup(${id})`)
                }}
              />
            </Tooltip>

            <Tooltip
              content={getMessage('delete')}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <button
                className="mx-1 text-muted hover:text-primary"
                onClick={async () => await handleDelete([id])}
                disabled={
                  table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()
                }
              >
                <TrashIcon className="h-5 w-5  " />
              </button>
            </Tooltip>
          </div>
        )
      }
    }
  ])

  return (
    <Table
      columns={columns}
      data={workGroups}
      className="overflow-x-auto shadow rounded-lg flex-1"
      manualSorting={{
        onSortingChange: (sort) => actions?.getWorkGroups({ sort }),
        sorting: workGroupsPagination.sort
      }}
      onRowClicked={(row) => actions?.selectWorkGroup(row)}
      maxHeight={500}
      pageSize={workGroupsPagination.limit}
      manualPagination={{
        currentPage: workGroupsPagination.page,
        totalRecords: workGroupsPagination.totalRecords,
        onChange: (page) => actions?.getWorkGroups({ page: page + 1 })
      }}
      manualLimit={{
        options: [15, 25, 50, 100],
        onChangeLimit: (page, limit) =>
          actions?.getWorkGroups({ page: page + 1, limit })
      }}
      withCheckbox
      actionsForSelectedItems={[
        {
          name: getMessage('delete'),
          action: async (items) =>
            await handleDelete(items.map((item) => item.id ?? '')),
          Icon: TrashIcon
        },
        {
          name: getMessage('disable'),
          action: async (items) =>
            await handleDisable(items.map((item) => item.id ?? '')),
          Icon: NoSymbolIcon
        }
      ]}
    />
  )
}

export default WorkGroupList
