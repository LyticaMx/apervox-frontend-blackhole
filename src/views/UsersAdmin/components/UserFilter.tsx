import { ReactElement } from 'react'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { usersMessages } from '../messages'
import { useUsers } from 'context/Users'

interface Props {
  toggleOpen: () => void
}

const UserFilter = ({ toggleOpen }: Props): ReactElement => {
  const getMessage = useFormatMessage(usersMessages)
  const getGeneralMessage = useFormatMessage(generalMessages)
  const { actions } = useUsers()

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
      action={{ label: getMessage('button'), onClick: toggleOpen }}
      download={(document) => alert(document)}
      onChange={(data) =>
        actions?.getUsers({
          start_time: data.dateRange[0],
          end_time: data.dateRange[1],
          filters: data.filterByField.fields,
          query: data.filterByField.search
        })
      }
    />
  )
}

export default UserFilter
