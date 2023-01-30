import { ReactElement, useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import Table from 'components/Table'

import { callsMessages } from '../messages'
import SelectField from 'components/Form/Select'
import { useFormatMessage } from 'hooks/useIntl'
import { pathRoute } from 'router/routes'
import Switchs from 'components/Form/Switch'
import { useControlGroups } from 'context/ControlGroups'

const CallsSection = (): ReactElement => {
  const { calls, callsPagination, actions } = useControlGroups()
  const history = useHistory()

  const getMessage = useFormatMessage(callsMessages)

  const pagination = useMemo(
    () => ({
      currentPage: callsPagination.page - 1,
      totalRecords: callsPagination.totalRecords,
      onChange: (page: number) => {
        actions?.getCalls({ page: page + 1 })
      }
    }),
    [callsPagination]
  )

  const columns = useMemo(
    () => [
      {
        header: getMessage('date'),
        accessorKey: 'date'
      },
      {
        header: getMessage('hour'),
        accessorKey: 'time'
      },
      {
        header: 'PIN',
        accessorKey: 'pin'
      },
      {
        header: getMessage('tableReceptor'),
        accessorKey: 'receptor'
      },
      {
        header: getMessage('tableDuration'),
        accessorKey: 'duration'
      },
      {
        header: getMessage('tableSimilarity'),
        accessorKey: 'similarity',
        cell: info => <span>{info.getValue() * 100} %</span>
      },
      {
        header: ' ',
        accessorKey: 'call_id',
        cell: info => (
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
      { value: 'DATE', text: getMessage('hour') },
      { value: 'PIN', text: 'PIN' },
      { value: 'RECEPTION_NUMBER', text: getMessage('receiver') },
      { value: 'DURATION', text: getMessage('duration') },
      { value: 'SIMILARITY', text: getMessage('similarity') }
    ],
    []
  )

  const handleChange = (params): void => {
    actions?.getCalls(params)
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 mt-10">
      <div className="sm:flex">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {getMessage('title')}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{getMessage('subtitle')}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <SelectField
            label={getMessage('orderBy')}
            value={callsPagination.orderBy}
            onChange={value => {
              handleChange({ order_by: value })
            }}
            items={items}
          />
          <p className="text-sm mt-2 text-gray-700 flex gap-1">
            <Switchs
              value={callsPagination.otherPin}
              onChange={value => {
                handleChange({ other_pin: value })
              }}
              color="blue"
              size="sm"
            />{' '}
            Filtrar PINS ajenos
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <Table
              data={calls}
              columns={columns}
              manualPagination={pagination}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallsSection
