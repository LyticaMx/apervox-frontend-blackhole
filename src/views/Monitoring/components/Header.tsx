import { ReactElement } from 'react'

import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'

import Title from 'components/Title'
import Typography from 'components/Typography'
import ViewCounter from 'components/ViewCounter'
import ViewFilter from 'components/ViewFilter'

import { messages } from '../messages'
import { useMonitoring } from 'context/Monitoring'

const Header = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const getGlobalMessage = useGlobalMessage()
  const {
    dateFilter,
    searchFilter,
    actions: liveCallsActions
  } = useMonitoring()

  const items = [
    { label: 'Numero de usuarios', name: 'numero_usuarios' },
    { label: 'Usuario', name: 'usuario' }
  ]

  return (
    <div className="flex justify-between mb-4">
      <div>
        <Title className="uppercase">{getMessage('title')}</Title>
        <div className="flex gap-2">
          <Typography
            variant="subtitle"
            style="semibold"
            className="uppercase text-secondary text-base mr-4"
          >
            11 {getMessage('ongoingCalls')}
          </Typography>

          <ViewCounter count={5}>
            {getGlobalMessage('hangsup', 'platformMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('techniques', 'platformMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('verification', 'generalMessages')}
          </ViewCounter>
          <ViewCounter count={5}>
            {getGlobalMessage('trash', 'generalMessages')}
          </ViewCounter>
        </div>
      </div>
      <ViewFilter
        fields={items}
        download={(document) => alert(document)}
        initialValues={{
          dateRange: {
            start_time: dateFilter.start_time,
            end_time: dateFilter.end_time
          },
          search: searchFilter.query,
          fields: searchFilter.filters
        }}
        onChange={(data) =>
          liveCallsActions?.getData({
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
