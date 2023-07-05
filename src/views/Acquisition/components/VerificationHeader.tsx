import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import Title from 'components/Title'
import ViewFilter from 'components/ViewFilter'

import { formatTotal } from 'utils/formatTotal'

import { messages } from '../messages'

import { useVerificationLine } from 'context/VerificationLines/useVerificationLine'
import CreateVerificationLineDrawer from './CreateVerificationLineDrawer'
import { generalMessages, platformMessages } from 'globalMessages'

const VerificationHeader = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [open, setOpen] = useState(false)
  const { total, dateFilter, searchFilter, actions } = useVerificationLine()

  useEffect(() => {
    actions?.get({}, true)
  }, [])

  const items = [
    { label: formatMessage(generalMessages.registeredBy), name: 'created_by' },
    { label: formatMessage(platformMessages.phoneNumber), name: 'phone' }
  ]

  return (
    <div className="flex justify-between mb-4">
      <div>
        <Title className="uppercase">
          {formatMessage(messages.verificationLines)}
        </Title>
        <p className="uppercase">
          {formatTotal(total, formatMessage(messages.subtitle))}
        </p>
      </div>
      <ViewFilter
        fields={items}
        action={{
          label: formatMessage(messages.button),
          onClick: () => {
            setOpen(true)
          }
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

      <CreateVerificationLineDrawer
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}

export default VerificationHeader
