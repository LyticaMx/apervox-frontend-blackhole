import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import GoBackButton from 'components/GoBackButton'
import { generalMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { format } from 'date-fns'
import { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { auditableActions, messages } from './messages'
import { useLoginAudits } from 'context/Audit'
import { Audit } from 'context/Audit/types'

const FailedLoginAttemps = (): ReactElement => {
  const { formatMessage } = useIntl()
  const {
    data,
    searchFilter,
    dateFilter,
    actions: auditActions,
    pagination
  } = useLoginAudits()

  const columns = useTableColumns<Audit>(() => [
    {
      accessorKey: 'name',
      header: formatMessage(generalMessages.user),
      cell: ({ getValue }) => (
        <span className="text-primary">{getValue<string>()}</span>
      )
    },
    {
      accessorKey: 'action',
      header: formatMessage(generalMessages.description),
      cell: ({ getValue }) => {
        const action = getValue<string>()
        return auditableActions[action]
          ? formatMessage(auditableActions[action])
          : action
      }
    },
    {
      id: 'date',
      accessorKey: 'createdAt',
      header: formatMessage(generalMessages.date),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'dd/MM/yyyy')
    },
    {
      id: 'hour',
      accessorKey: 'createdAt',
      header: formatMessage(generalMessages.hour),
      cell: ({ getValue }) => format(new Date(getValue<string>()), 'hh:mm')
    }
  ])

  useEffect(() => {
    auditActions?.getData({ page: 1 }, true)
  }, [])

  return (
    <div>
      <GoBackButton route={pathRoute.audit.general} />
      <div className="flex items-center justify-between">
        <Typography
          variant="title"
          style="bold"
          className="uppercase text-secondary"
        >
          {formatMessage(messages.title)}
        </Typography>
        <ViewFilter
          fields={[
            {
              label: formatMessage(generalMessages.user),
              name: 'name'
            }
          ]}
          initialValues={{
            search: searchFilter.query ?? '',
            fields: searchFilter.filters ?? [],
            dateRange: {
              start_time: dateFilter.start_time,
              end_time: dateFilter.end_time
            }
          }}
          onChange={(data) =>
            auditActions?.getData({
              start_time: data.dateRange[0],
              end_time: data.dateRange[1],
              filters: data.filterByField.fields,
              query: data.filterByField.search,
              clearDates: data.clearDates,
              page: 1
            })
          }
        />
      </div>
      <div className="flex gap-4">
        <Link to={pathRoute.audit.failedLoginAttemps}>
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base"
          >
            {formatMessage(messages.loginFailedAttemps)}
          </Typography>
        </Link>

        <Link to={pathRoute.audit.blockedUsers}>
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base"
          >
            {formatMessage(messages.blockedUsers)}
          </Typography>
        </Link>
      </div>
      <div className="mt-2">
        <Table
          columns={columns}
          data={data}
          manualSorting={{
            onSortingChange: (sort) => auditActions?.getData({ sort }),
            sorting: pagination.sort
          }}
          manualLimit={{
            options: [15, 25, 50, 100],
            onChangeLimit: (page, limit) =>
              auditActions?.getData({ page: page + 1, limit })
          }}
          pageSize={pagination.limit}
          manualPagination={{
            currentPage: pagination.page,
            totalRecords: pagination.totalRecords,
            onChange: (page) => auditActions?.getData({ page: page + 1 })
          }}
        />
      </div>
    </div>
  )
}

export default FailedLoginAttemps
