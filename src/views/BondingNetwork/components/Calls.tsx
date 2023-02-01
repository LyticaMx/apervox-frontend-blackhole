import { ReactElement, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { useFormatMessage } from 'hooks/useIntl'

import Card from 'components/Card'
import Table from 'components/Table'

import { callsMessages } from '../messages'
import { pathRoute } from 'router/routes'
import Title from 'components/Title'
import SelectField from 'components/Form/Select'
import { useBondingNetwork } from 'context/BondingNetwork'
import { CallsParams } from 'types/bondingNetwork'

const Calls = (): ReactElement => {
  const { calls, callsPagination, actions } = useBondingNetwork()
  const history = useHistory()
  const getMessage = useFormatMessage(callsMessages)

  const handleChange = (value): void => {
    fetchCalls({ order_by: value })
  }

  const items = useMemo(
    () => [
      { value: 'CREATED_AT', text: getMessage('hour') },
      { value: 'PIN', text: 'PIN' },
      { value: 'RECEPTION_NUMBER', text: getMessage('receiver') },
      { value: 'DURATION', text: getMessage('duration') },
      { value: 'ALERT', text: getMessage('alert') }
    ],
    []
  )
  const manualPagination = useMemo(
    () => ({
      currentPage: callsPagination.page - 1,
      totalRecords: callsPagination.totalRecords,
      onChange: (page: number) => {
        fetchCalls({ page: page + 1 })
      }
    }),
    [callsPagination]
  )

  const columns = useMemo(
    () => [
      {
        header: getMessage('hour'),
        accessorKey: 'hours'
      },
      {
        header: 'PIN',
        accessorKey: 'pin'
      },
      {
        header: getMessage('receiver'),
        accessorKey: 'reception_number'
      },
      {
        header: getMessage('duration'),
        accessorKey: 'duration'
      },
      {
        header: ' ',
        accessorKey: 'id',
        cell: (info) => (
          <button
            className="text-blue-500 font-bold"
            onClick={() =>
              history.push(pathRoute.calls.detail, { id: info.getValue() })
            }
          >
            {getMessage('details')}
          </button>
        )
      }
    ],
    []
  )

  const fetchCalls = (filters?: CallsParams): void => actions?.getCalls(filters)

  return (
    <Card>
      <div className="flex mb-4">
        <div className="sm:flex-auto">
          <Title variant="card">{getMessage('title')}</Title>
        </div>
        <div className="basis-40">
          <SelectField
            label={getMessage('orderBy')}
            items={items}
            value={callsPagination.orderBy}
            onChange={handleChange}
          />
        </div>
      </div>

      <Table
        data={calls}
        columns={columns}
        pageSize={callsPagination.limit}
        manualPagination={manualPagination}
      />
    </Card>
  )
}

export default Calls
