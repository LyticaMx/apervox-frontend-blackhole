import { ReactElement } from 'react'
import { format } from 'date-fns'
import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { useWorkGroups } from 'context/WorkGroups'

import Table from 'components/Table'
import Tag from 'components/Tag'
import { generalMessages } from 'globalMessages'
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

interface Props {
  handleClickOnHistory: (id: string) => void
}

const WorkGroupList = ({ handleClickOnHistory }: Props): ReactElement => {
  const getMessage = useFormatMessage(generalMessages)
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
      header: getMessage('users')
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
      }
    },
    {
      accessorKey: 'status',
      header: getMessage('status'),
      cell: ({ getValue }) => {
        const status = getValue<Status>()

        return <StatusTag value={status} />
      }
    },
    {
      accessorKey: 'id',
      header: getMessage('action'),
      cell: ({ getValue, cell }) => {
        const id = getValue<string>()
        const isActive = cell.row.original.status === 'active'

        return (
          <div className="flex pt-1">
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
                value={true}
                onChange={(x) => console.log(`onDisableGroup(${id})`, x)}
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
              <TrashIcon
                className="h-5 w-5 mx-1 text-muted hover:text-primary cursor-pointer"
                onClick={() => console.log(`onDeleteGroup(${id})`)}
              />
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
      onRowClicked={(row) => {
        console.log(`onSelectWorkGroup(${row.id})`)

        actions?.selectWorkGroup(row)
      }}
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
          name: 'Eliminar',
          action: (items) => {
            console.log(
              `onDeleteWorkGroups(${items.map((workgroup) => workgroup.id)})`
            )
          },
          Icon: TrashIcon
        },
        {
          name: 'Deshabilitar',
          action: (items) => {
            console.log(
              `onDisableWorkGroups(${items.map((workgroup) => workgroup.id)})`
            )
          },
          Icon: NoSymbolIcon
        }
      ]}
    />
  )
}

export default WorkGroupList
