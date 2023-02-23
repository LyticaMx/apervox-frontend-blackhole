import { ReactElement } from 'react'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { generalMessages } from 'globalMessages'
import { usersMessages } from '../messages'

interface Props {
  toggleOpen: () => void
}

const UserFilter = ({ toggleOpen }: Props): ReactElement => {
  const getMessage = useFormatMessage(usersMessages)
  const getGeneralMessage = useFormatMessage(generalMessages)

  const filterItems = [
    {
      name: 'id',
      label: 'ID'
    },
    {
      name: 'name',
      label: getGeneralMessage('name')
    },
    {
      name: 'surnames',
      label: getGeneralMessage('surnames')
    },
    {
      name: 'username',
      label: getGeneralMessage('user')
    },
    {
      name: 'groups',
      label: getGeneralMessage('groups')
    },
    {
      name: 'userRol',
      label: getGeneralMessage('profile')
    },
    {
      name: 'createdBy',
      label: getGeneralMessage('registeredBy')
    },
    {
      name: 'session',
      label: getGeneralMessage('session')
    },
    {
      name: 'session',
      label: getGeneralMessage('status')
    },
    {
      name: 'createdOn',
      label: getGeneralMessage('date')
    }
  ]

  return (
    <ViewFilter
      fields={filterItems}
      action={{ label: getMessage('button'), onClick: toggleOpen }}
      download={(document) => alert(document)}
      onChange={(data) => console.log('userViewFilter', data)}
    />
  )
}

export default UserFilter
