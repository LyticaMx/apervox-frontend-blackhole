import { ReactElement } from 'react'

import { useFormatMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { messages, tableMessages } from '../messages'

import { useToggle } from 'usehooks-ts'
import CreateOverflowLineDrawer from './CreateOverflowLineDrawer'
import { formatTotal } from 'utils/formatTotal'
import { useOverflowLine } from 'context/OverflowLines'
import { omit } from 'lodash'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const getTableMessage = useFormatMessage(tableMessages)
  const [open, toggle] = useToggle(false)

  const { totals, dateFilter, searchFilter, actions } = useOverflowLine()
  const ability = useAbility()
  const counters = omit(totals, 'all')

  const items = [
    { label: getTableMessage('derivation'), name: 'phone' },
    { label: getTableMessage('company'), name: 'carrier' },
    { label: getTableMessage('technique'), name: 'technique' },
    { label: getMessage('medium'), name: 'medium' },
    { label: getMessage('registeredBy'), name: 'created_by' },
    { label: getMessage('target'), name: 'target' }
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
          download={(document, full) => actions?.exportTable(document, full)}
          action={{
            label: getMessage('button'),
            onClick: () => toggle(),
            disabled:
              ability.cannot(ACTION.CREATE, SUBJECT.OVERFLOW_LINES) ||
              ability.cannot(ACTION.READ, SUBJECT.ACQUISITION_MEDIUMS)
          }}
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
