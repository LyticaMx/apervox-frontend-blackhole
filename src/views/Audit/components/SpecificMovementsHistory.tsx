import { XCircleIcon } from '@heroicons/react/24/outline'
import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Target, User } from '..'
import { messages } from '../messages'
import { useSpecificUserAudits } from 'context/Audit'
import { formatTotal } from 'utils/formatTotal'

interface Props {
  specificFilter: Target | null
  handleClose: () => void
  handleSelectMovement: (row: Record<string, any>) => void
  handleSelectUser: (user: User) => void
}

type GenericAudit = Record<string, any>

const SpecificMovementsHistory = (props: Props): ReactElement | null => {
  const {
    specificFilter,
    handleClose,
    handleSelectMovement,
    handleSelectUser
  } = props
  const { formatMessage } = useIntl()
  const userAudits = useSpecificUserAudits()

  const columns = useTableColumns<GenericAudit>(
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

  const audits = useMemo(() => {
    if (!specificFilter) return null
    switch (specificFilter.type) {
      case 'user':
        return {
          getData: userAudits.actions?.getData ?? (() => {}),
          data: userAudits.data,
          pagination: userAudits.pagination,
          dateFilter: userAudits.dateFilter,
          searchFilter: userAudits.searchFilter,
          total: userAudits.total
        }
      default:
        return null
    }
  }, [specificFilter?.type])

  useEffect(() => {
    if (!specificFilter || !audits) return
    audits.getData({ page: 1 }, true)
  }, [audits])

  if (!specificFilter || !audits) return null

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
            {formatTotal(audits.total, 'Movimientos auditados registrados')}
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
        data={audits.data}
        manualSorting={{
          onSortingChange: (sort) => audits.getData({ sort }),
          sorting: audits.pagination.sort
        }}
        manualLimit={{
          options: [15, 25, 50, 100],
          onChangeLimit: (page, limit) =>
            audits.getData({ page: page + 1, limit })
        }}
        onRowClicked={handleSelectMovement}
        maxHeight={225}
        pageSize={audits.pagination.limit}
        manualPagination={{
          currentPage: audits.pagination.page,
          totalRecords: audits.pagination.totalRecords,
          onChange: (page) => audits.getData({ page: page + 1 })
        }}
      />
    </div>
  )
}

export default SpecificMovementsHistory
