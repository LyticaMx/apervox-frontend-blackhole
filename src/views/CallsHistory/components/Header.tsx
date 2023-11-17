import { ReactElement } from 'react'

import Title from 'components/Title'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { useFormatMessage } from 'hooks/useIntl'

import { messages } from '../messages'
import { useCallHistory } from 'context/CallHistory'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const {
    dateFilter,
    searchFilter,
    actions: callHistoryActions,
    counters,
    total
  } = useCallHistory()

  const items = [
    { label: getMessage('source'), name: 'source' },
    { label: getMessage('phoneLine'), name: 'overflow_line_phone' },
    { label: getMessage('target'), name: 'target_phone' },
    { label: getMessage('operator'), name: 'carrier' },
    { label: getMessage('technique'), name: 'technique' },
    { label: getMessage('workBy'), name: 'working_by' },
    { label: getMessage('label'), name: 'label' }
  ]

  return (
    <div className="flex justify-between mb-4">
      <div>
        <Title className="uppercase">{getMessage('title')}</Title>
        <div className="flex gap-2">
          <ViewCounter count={total}>{getMessage('totalEvents')}</ViewCounter>
          <ViewCounter count={counters.unclassified}>
            {getMessage('unclassified')}
          </ViewCounter>
          <ViewCounter count={counters.notRelevant}>
            {getMessage('noRelevant')}
          </ViewCounter>
          <ViewCounter count={counters.relevant}>
            {getMessage('relevant')}
          </ViewCounter>
          <ViewCounter count={counters.withTranscription}>
            {getMessage('withTranscription')}
          </ViewCounter>
        </div>
      </div>
      <ViewFilter
        fields={items}
        download={(document, quantity) =>
          callHistoryActions?.exportTable(document, quantity)
        }
        initialValues={{
          dateRange: {
            start_time: dateFilter.start_time,
            end_time: dateFilter.end_time
          },
          search: searchFilter.query,
          fields: searchFilter.filters
        }}
        onChange={(data) =>
          callHistoryActions?.getData({
            start_time: data.dateRange[0],
            end_time: data.dateRange[1],
            clearDates: data.clearDates,
            filters: data.filterByField.fields,
            query: data.filterByField.search,
            page: 1
          })
        }
      />
    </div>
  )
}

export default Header
