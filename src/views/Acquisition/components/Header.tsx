import { ReactElement } from 'react'

import { useFormatMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { messages } from '../messages'

import { useToggle } from 'usehooks-ts'
import CreateOverflowLineDrawer from './CreateOverflowLineDrawer'
import { formatTotal } from 'utils/formatTotal'
import { useOverflowLine } from 'context/OverflowLines'
import { omit } from 'lodash'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const [open, toggle] = useToggle(false)

  const { totals, dateFilter, searchFilter, actions } = useOverflowLine()
  const counters = omit(totals, 'all')

  const items = [
    { label: getMessage('registeredBy'), name: 'created_by' },
    { label: getMessage('target'), name: 'phone' }
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
          download={(document) => alert(document)}
          action={{ label: getMessage('button'), onClick: () => toggle() }}
          onChange={(data) => {
            actions?.get({
              start_time: data.dateRange[0],
              end_time: data.dateRange[1],
              filters: data.filterByField.fields,
              query: data.filterByField.search,
              clearDates: data.clearDates,
              page: 1
            })
          }}
          initialValues={{
            dateRange: {
              start_time: dateFilter.start_time,
              end_time: dateFilter.end_time
            },
            search: searchFilter.query,
            fields: searchFilter.filters
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
