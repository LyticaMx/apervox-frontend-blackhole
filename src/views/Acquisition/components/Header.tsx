import { ReactElement } from 'react'

import { useFormatMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { messages, statusMessages } from '../messages'

import { useToggle } from 'usehooks-ts'
import CreateOverflowLineDrawer from './CreateOverflowLineDrawer'
import { formatTotal } from 'utils/formatTotal'
import { useOverflowLine } from 'context/OverflowLines'
import { get, omit } from 'lodash'
import { StaticFilter } from 'components/FilterByField'
import { useIntl } from 'react-intl'

const Header = (): ReactElement => {
  const { formatMessage } = useIntl()
  const getMessage = useFormatMessage(messages)
  const [open, toggle] = useToggle(false)

  const { totals, actions } = useOverflowLine()
  const counters = omit(totals, 'all')

  const items = [
    { label: getMessage('registeredBy'), name: 'created_by' },
    { label: getMessage('target'), name: 'phone' }
  ]

  const staticFilters: StaticFilter[] = [
    {
      label: getMessage('status'),
      name: 'line_status',
      options: [
        {
          name: formatMessage(statusMessages.all),
          value: 'all'
        },
        {
          name: formatMessage(statusMessages.assigned),
          value: 'assigned'
        },
        {
          name: formatMessage(statusMessages.available),
          value: 'available'
        },
        {
          name: formatMessage(statusMessages.quarantine),
          value: 'quarantine'
        },
        {
          name: formatMessage(statusMessages.maintenance),
          value: 'maintenance'
        }
      ]
    }
  ]

  return (
    <div className=" mb-4">
      <div className="flex justify-between">
        <div className="mb-3">
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">
            {formatTotal(totals.all, getMessage('subtitle'))}
          </p>
        </div>
        <ViewFilter
          fields={items}
          staticFilters={staticFilters}
          download={(document) => alert(document)}
          action={{ label: getMessage('button'), onClick: () => toggle() }}
          onChange={(data) => {
            const staticF = data.filterByField.staticFilters
            const lineStatus = get(staticF, 'line_status', 'all')

            actions?.get({
              start_time: data.dateRange[0],
              end_time: data.dateRange[1],
              filters: data.filterByField.fields,
              query: data.filterByField.search,
              clearDates: data.clearDates,
              line_status: lineStatus === 'all' ? undefined : lineStatus
            })
          }}
        />
      </div>
      <div className="flex gap-2">
        {Object.entries(counters).map(([key, value]) => (
          <ViewCounter count={value} key={key}>
            {getMessage(key)}
          </ViewCounter>
        ))}
      </div>

      <CreateOverflowLineDrawer open={open} onClose={toggle} />
    </div>
  )
}

export default Header
