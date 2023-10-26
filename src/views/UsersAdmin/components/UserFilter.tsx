import { ReactElement } from 'react'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { usersMessages } from '../messages'
import { useUsers } from 'context/Users'
import { useAbility } from 'context/Ability'

interface Props {
  toggleOpen: () => void
}

const UserFilter = ({ toggleOpen }: Props): ReactElement => {
  const getMessage = useFormatMessage(usersMessages)
  const getGeneralMessage = useFormatMessage(generalMessages)
  const ability = useAbility()
  const { actions, dateFilter, searchFilter } = useUsers()
  const filterItems = [
    {
      name: 'names',
      label: getGeneralMessage('name')
    },
    {
      name: 'last_name',
      label: getGeneralMessage('surnames')
    },
    {
      name: 'username',
      label: getGeneralMessage('user')
    },
    {
      name: 'group_name',
      label: getGeneralMessage('groups')
    },
    {
      name: 'role_name',
      label: getGeneralMessage('profile')
    },
    {
      name: 'created_by',
      label: getGeneralMessage('registeredBy')
    }
  ]

  return (
    <ViewFilter
      fields={filterItems}
      initialValues={{
        dateRange: {
          start_time: dateFilter.start_time,
          end_time: dateFilter.end_time
        },
        search: searchFilter.query,
        fields: searchFilter.filters
      }}
      action={{
        label: getMessage('button'),
        onClick: toggleOpen,
        disabled: ability.cannot('create', 'users')
      }}
      download={async (document, quantity) =>
        await actions?.exportTable(document, quantity)
      }
      onChange={(data) =>
        actions?.getUsers({
          start_time: data.dateRange[0],
          end_time: data.dateRange[1],
          clearDates: data.clearDates,
          filters: data.filterByField.fields,
          query: data.filterByField.search,
          page: 1
        })
      }
    />
  )
}

export default UserFilter
