import { ReactElement, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { pathRoute } from 'router/routes'
import { useFormatMessage } from 'hooks/useIntl'
import { useSpeakers } from 'context/Speakers'

import Card from 'components/Card'
import Table from 'components/Table'
import Radio from 'components/Form/Radio'

import { callsByMessages } from '../messages'
import SelectField from 'components/Form/Select'
import Title from 'components/Title'

const CallsBy = (): ReactElement => {
  const { calls, callsPagination, actions } = useSpeakers()
  const history = useHistory()
  const getMessage = useFormatMessage(callsByMessages)

  const columns = useMemo(
    () => [
      {
        header: getMessage('date'),
        accessorKey: 'date'
      },
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
        accessorKey: 'id_call',
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

  const pagination = {
    currentPage: callsPagination.page - 1,
    totalRecords: callsPagination.totalRecords,
    onChange: (page: number) => {
      actions?.getCallsByAlerts({ page: page + 1 })
    }
  }

  const handleChange = async (by: string): Promise<any> => {
    actions?.getCallsByAlerts({
      calls: by,
      page: 1
    })
  }
  return (
    <Card className="mt-5">
      <div className="sm:flex">
        <div className="sm:flex-auto">
          <Title variant="card">{getMessage('title')}</Title>
          <div className="flex gap-3 my-4">
            <Radio
              label={getMessage('speakers')}
              value="SPEAKER"
              name="call"
              checked={callsPagination.calls === 'SPEAKER'}
              onChange={() => {
                handleChange('SPEAKER')
              }}
            />
            <Radio
              label={getMessage('alerts')}
              value="ALERT"
              name="call"
              checked={callsPagination.calls === 'ALERT'}
              onChange={() => {
                handleChange('ALERT')
              }}
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none w-40">
          <SelectField
            label={getMessage('orderBy')}
            value={callsPagination.order_by}
            onChange={(value) => {
              actions?.getCallsByAlerts({ order_by: value })
            }}
            items={items}
          />
        </div>
      </div>
      <Table data={calls} columns={columns} manualPagination={pagination} />
    </Card>
  )
}

export default CallsBy
