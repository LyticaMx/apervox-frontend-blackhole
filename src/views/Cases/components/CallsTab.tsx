import SelectField from 'components/Form/Select'
import Table from 'components/Table'
import Typography from 'components/Typography'
import { actionsMessages, generalMessages } from 'globalMessages'
import { ReactElement, useEffect } from 'react'
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline'
import { useIntl } from 'react-intl'
import { callsTabMessages } from '../messages'
import { useCases } from 'context/Cases'
import { useHistory } from 'react-router-dom'
import { pathRoute } from 'router/routes'
import { CallsParams } from 'types/case'

const CallsTab = (): ReactElement => {
  const { caseDetail, actions } = useCases()
  const { formatMessage } = useIntl()
  const history = useHistory()

  const fetchCalls = async (params?: CallsParams): Promise<void> => {
    await actions?.getCalls(params)
  }

  useEffect(() => {
    fetchCalls()
  }, [caseDetail?.id])

  return (
    <div className="pt-3">
      <div className="flex justify-between items-center">
        <Typography>{formatMessage(callsTabMessages.title)}</Typography>
        <div className="flex items-center">
          <div className="w-60 mr-4">
            <SelectField
              label={formatMessage(actionsMessages.filter)}
              value={caseDetail.callsPagination.alert}
              onChange={async (val) => await fetchCalls({ alert: val })}
              items={[
                {
                  value: 1,
                  text: formatMessage(callsTabMessages.withoutAlert)
                },
                {
                  value: 2,
                  text: formatMessage(callsTabMessages.withAlert)
                },
                { value: 3, text: formatMessage(callsTabMessages.all) }
              ]}
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Table
          columns={[
            {
              header: ' ',
              accessorKey: 'notification',
              cell: ({ getValue }) =>
                getValue() ? (
                  <BellIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <BellSlashIcon className="w-5 h-5 text-gray-400" />
                )
            },
            {
              header: formatMessage(generalMessages.date),
              accessorKey: 'date'
            },
            {
              header: formatMessage(generalMessages.hour),
              accessorKey: 'hour'
            },
            {
              header: 'PIN',
              accessorKey: 'pin'
            },
            {
              header: formatMessage(generalMessages.receiver),
              accessorKey: 'receiver'
            },
            {
              header: formatMessage(generalMessages.duration),
              accessorKey: 'duration'
            },
            {
              header: ' ',
              accessorKey: 'id',
              cell: ({ getValue }) => (
                <button
                  className="text-blue-500 font-bold"
                  onClick={() =>
                    history.push(pathRoute.calls.detail, { id: getValue() })
                  }
                >
                  {formatMessage(generalMessages.details)}
                </button>
              )
            }
          ]}
          data={caseDetail?.listOfCalls ?? []}
          manualPagination={{
            currentPage: caseDetail.callsPagination.page
              ? caseDetail.callsPagination.page - 1
              : 0,
            totalRecords: caseDetail.callsPagination.totalRecords,
            onChange: async (newPage) => await fetchCalls({ page: newPage + 1 })
          }}
          manualSorting={{
            sorting: caseDetail.callsPagination.sort,
            onSortingChange: async (sort) => await fetchCalls({ sort })
          }}
        />
      </div>
    </div>
  )
}

export default CallsTab
