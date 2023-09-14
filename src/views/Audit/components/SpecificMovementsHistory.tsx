import { XCircleIcon } from '@heroicons/react/24/outline'
import { SortingState } from '@tanstack/react-table'
import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { Target, User } from '..'
import { Audit as AuditInterface } from 'context/Audit/ModuleAudits/types'
import { messages } from '../messages'

interface Props {
  specificFilter: Target | null
  totalMovements: number
  handleClose: () => void
  handleSelectMovement: (row: AuditInterface) => void
  handleSelectUser: (user: User) => void
}

const SpecificMovementsHistory = (props: Props): ReactElement | null => {
  const {
    specificFilter,
    handleClose,
    totalMovements,
    handleSelectMovement,
    handleSelectUser
  } = props
  const { formatMessage } = useIntl()
  const [sortingState, setSortingState] = useState<SortingState>([])

  const columns = useTableColumns<AuditInterface>(
    () => [
      {
        accessorKey: 'user',
        header: formatMessage(generalMessages.user),
        cell: ({ getValue, row }) => {
          const value = getValue<string>()

          switch (specificFilter?.type) {
            case 'group':
              return (
                <button
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectUser({
                      name: 'Pruebas',
                      surnames: 'Uno',
                      email: 'test@test.com',
                      createdBy: 'SuperAdmin',
                      createdOn: new Date('2023-02-14T18:58:02.626Z'),
                      extension: '150',
                      groups: 'Auditoria, Grupo 4',
                      id: '002',
                      position: 'General',
                      username: 'PUno',
                      userRol: 'Administrador'
                    })
                  }}
                >
                  {value}
                </button>
              )

            case 'user':
            default:
              return value
          }
        }
      },
      {
        accessorKey: 'description',
        header: formatMessage(generalMessages.description),
        cell: ({ getValue, row }) => {
          const value = getValue<string>()

          switch (specificFilter?.type) {
            case 'group':
            case 'user':
            default:
              return value
          }
        }
      },
      /*
      {
        // TODO: Normalizar este
        accessorKey: 'module',
        header: formatMessage(messages.auditedModule),
        ...(specificFilter?.type === 'user'
          ? {
              meta: {
                staticFilters: {
                  options: [
                    {
                      name: formatMessage(generalMessages.statistics),
                      value: 'statistics'
                    },
                    {
                      name: formatMessage(messages.rolesAndPermissions),
                      value: 'roles'
                    },
                    {
                      name: formatMessage(messages.usersControl),
                      value: 'users'
                    },
                    {
                      name: formatMessage(messages.workgroups),
                      value: 'groups'
                    },
                    {
                      name: formatMessage(messages.acquisitionMedium),
                      value: 'media'
                    }
                  ],
                  onChange: () => {},
                  optionsName: formatMessage(messages.auditedModule)
                }
              }
            }
          : {})
      },
      */
      {
        accessorKey: 'createdAt',
        header: formatMessage(generalMessages.date),
        cell: ({ getValue }) =>
          format(new Date(getValue<string>()), 'dd/MM/yyyy')
      },
      {
        accessorKey: 'createdAt',
        header: formatMessage(generalMessages.hour),
        cell: ({ getValue }) => format(new Date(getValue<string>()), 'hh:mm')
      }
    ],
    [specificFilter?.type]
  )

  const title = useMemo(() => {
    switch (specificFilter?.type) {
      case 'group':
        return 'Historial de movimientos del grupo'
      case 'user':
        return 'Historial de movimientos del usuario'
      case 'line':
        return 'Historial de movimientos de línea'
      case 'ti':
        return 'Historial de movimientos de técnica'
      default:
        return 'Historial de movimientos específico'
    }
  }, [specificFilter?.type])

  if (!specificFilter) return null

  return (
    <div className="mt-2 bg-white shadow-sm shadow-gray-300 rounded px-2 pt-2 relative">
      <button
        className="absolute top-2 right-2 text-secondary-gray hover:text-primary"
        onClick={handleClose}
      >
        <XCircleIcon className="w-4 h-4" />
      </button>
      <div className="flex justify-between items-end py-2 mb-2">
        <div>
          <Typography
            variant="subtitle"
            className="uppercase text-secondary"
            style="bold"
          >
            {title}
          </Typography>
          <Typography className="uppercase">
            {`${totalMovements} Movimientos auditados registrados`}
          </Typography>
        </div>
        <ViewFilter
          fields={[
            {
              label: formatMessage(generalMessages.user),
              name: 'user'
            },
            {
              label: formatMessage(generalMessages.description),
              name: 'description'
            },
            {
              label: formatMessage(messages.auditedModule),
              name: 'module'
            }
          ]}
          download={() => {}}
        />
      </div>
      <Table
        columns={columns}
        data={[]}
        manualSorting={{
          onSortingChange: setSortingState,
          sorting: sortingState
        }}
        onRowClicked={handleSelectMovement}
        maxHeight={225}
      />
    </div>
  )
}

export default SpecificMovementsHistory
