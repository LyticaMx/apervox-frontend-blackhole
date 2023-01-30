import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'

import Table from 'components/Table'
import Card from 'components/Card'
import { listPinsMessages as messages } from '../messages'
import { useSpeakers } from 'context/Speakers'

const ListPins = (): ReactElement => {
  const { pins, pinsPagination, actions } = useSpeakers()
  const intl = useIntl()

  const getMessage = (key: string): string => intl.formatMessage(messages[key])

  const columns = useMemo(
    () => [
      {
        header: 'PIN',
        accessorKey: 'pin'
      },
      {
        header: getMessage('tableTotalPins'),
        accessorKey: 'count'
      }
    ],
    []
  )

  const pagination = {
    currentPage: pinsPagination.page - 1,
    totalRecords: pinsPagination.totalRecords,
    onChange: (page: number) => {
      actions?.getListPins({ page: page + 1 })
    }
  }

  const showSubtitle = Boolean(pinsPagination.max_value)

  return (
    <Card>
      <h1 className="text-md font-semibold text-gray-900">
        {getMessage('title')}
      </h1>
      {showSubtitle && (
        <p className="flex gap-3 mt-1 mb-2 text-sm text-gray-500">
          {getMessage('subtitle')}{' '}
          <span>
            {pinsPagination.min_value} - {pinsPagination.max_value}
          </span>
        </p>
      )}

      <div className="w-full mt-2">
        <Table
          data={pins}
          columns={columns}
          manualPagination={pagination}
          pageSize={pinsPagination.limit}
        />
      </div>
    </Card>
  )
}

export default ListPins
