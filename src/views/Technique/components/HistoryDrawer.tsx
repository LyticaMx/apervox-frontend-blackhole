import { generalMessages } from 'globalMessages'
import { useFormatMessage } from 'hooks/useIntl'
import { ReactElement, useEffect } from 'react'
import { targetHistoryMessages } from '../messages'
import { useIntl } from 'react-intl'
import { useSpecificModelAudits } from 'context/Audit'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import Accordion from 'components/Accordion'
import Pagination from 'components/Table/Pagination'
import NoData from 'components/NoData'
import { getTargetChanges } from './helper'

const HistoryDrawer = (): ReactElement => {
  const getGeneralMessage = useFormatMessage(generalMessages)
  const getMessage = useFormatMessage(targetHistoryMessages)
  const { formatMessage } = useIntl()
  const { id, data: history, actions, pagination } = useSpecificModelAudits()

  useEffect(() => {
    if (!id) return
    actions?.getData({ page: 1 })
  }, [id])

  return (
    <Drawer
      open={Boolean(id)}
      onClose={() => actions?.setModelId()}
      placement="right"
      className="bg-background-secondary"
    >
      <div className="w-80 h-full flex flex-col px-2">
        <Typography variant="title" style="bold" className="uppercase">
          {getMessage('title')}
        </Typography>

        <Typography
          variant="body1"
          className="uppercase text-primary-500"
          noWrap
        >
          {getMessage('subtitle')}
        </Typography>

        <p className="text-sm leading-tight mt-2 mb-4">
          {getMessage('message')}
        </p>

        {history.length > 0 ? (
          <div>
            {history.map((historyItem, index) => (
              <Accordion
                key={index}
                useCustomTitle
                title={
                  <div className="flex justify-between w-full pr-2">
                    <Typography variant="caption">
                      {targetHistoryMessages[historyItem.action]
                        ? getMessage(historyItem.action)
                        : historyItem.action}
                    </Typography>
                    <Typography variant="caption">
                      {format(new Date(historyItem.createdAt), 'dd/MM/yyyy')}
                    </Typography>
                  </div>
                }
                classNames={{
                  button:
                    'bg-white mt-1 rounded-md items-center rounded-b-none',
                  chevronIcon: 'text-primary-500'
                }}
              >
                <div className="bg-white p-2 rounded-b-md">
                  <div className="flex justify-between text-primary-500 mb-1">
                    <Typography variant="body2">{`${getGeneralMessage(
                      'user'
                    )}: ${historyItem.username}`}</Typography>
                    <Typography
                      variant="caption"
                      className="bg-primary-50  rounded-md flex items-center px-2"
                    >
                      {format(
                        new Date(historyItem.createdAt),
                        'dd/MM/yyyy HH:mm'
                      )}
                    </Typography>
                  </div>

                  <Typography variant="caption">
                    {getTargetChanges(
                      formatMessage,
                      historyItem.action,
                      historyItem.oldData,
                      historyItem.newData
                    )}
                  </Typography>
                </div>
              </Accordion>
            ))}
            <Pagination
              onPageChange={(page) => actions?.getData({ page: page + 1 })}
              currentPage={pagination.page}
              pageSize={pagination.limit}
              totalCount={pagination.totalRecords}
              manualLimit={{
                options: pagination.limitOptions ?? [15],
                onChangeLimit: (page, limit) =>
                  actions?.getData({ page: page + 1, limit })
              }}
            />
          </div>
        ) : (
          <div className="bg-white rounded-sm">
            <NoData />
          </div>
        )}
      </div>
    </Drawer>
  )
}

export default HistoryDrawer
