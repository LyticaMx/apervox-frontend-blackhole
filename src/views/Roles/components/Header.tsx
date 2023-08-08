import { ReactElement } from 'react'

import { useFormatMessage } from 'hooks/useIntl'
import { useRoles } from 'context/Roles'

import Title from 'components/Title'
import ViewFilter from 'components/ViewFilter'
import { StaticFilter } from 'components/FilterByField'

import { rolesMessages } from '../messages'
import { useIntl } from 'react-intl'
import { formMessages, generalMessages } from 'globalMessages'

interface Props {
  onAction: () => void
}
const status = { active: true, inactive: false, both: undefined }
const Header = ({ onAction }: Props): ReactElement => {
  const { total, actions, searchFilter, dateFilter, staticFilter } = useRoles()
  const { formatMessage } = useIntl()

  const getMessage = useFormatMessage(rolesMessages)

  const items = [
    { label: formatMessage(formMessages.name), name: 'name' },
    { label: formatMessage(generalMessages.createdBy), name: 'created_by' }
  ]
  const staticFilters: StaticFilter[] = [
    {
      label: getMessage('status'),
      name: 'status',
      options: [
        {
          name: getMessage('active'),
          value: 'active'
        },
        {
          name: getMessage('inactive'),
          value: 'inactive'
        },
        {
          name: getMessage('both'),
          value: 'both'
        }
      ]
    }
  ]

  return (
    <div className="flex justify-between">
      <div>
        <Title className="uppercase">{getMessage('title')}</Title>
        <p className="uppercase">
          {total} {getMessage('subtitle')}
        </p>
      </div>
      <ViewFilter
        fields={items}
        action={{ label: getMessage('button'), onClick: onAction }}
        download={(document) => alert(document)}
        staticFilters={staticFilters}
        initialValues={{
          search: searchFilter.query ?? '',
          fields: searchFilter.filters ?? [],
          dateRange: {
            start_time: dateFilter.start_time,
            end_time: dateFilter.end_time
          },
          staticFilters: {
            status:
              staticFilter.status !== undefined
                ? staticFilter.status
                  ? 'active'
                  : 'inactive'
                : 'both'
          }
        }}
        onChange={(data) => {
          const staticF = data.filterByField.staticFilters

          actions?.getData({
            start_time: data.dateRange[0],
            end_time: data.dateRange[1],
            filters: data.filterByField.fields,
            query: data.filterByField.search,
            status: status[staticF?.status ?? 'both'],
            clearDates: data.clearDates,
            page: 1
          })
        }}
      />
    </div>
  )
}

export default Header
