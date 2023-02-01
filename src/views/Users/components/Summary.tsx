import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'

import { useUsers } from 'context/Users'

import UsersCard from './UsersCard'

import { usersMessages } from '../messages'

const Summary = (): ReactElement => {
  const { summary } = useUsers()
  const getMessage = useFormatMessage(usersMessages)

  return (
    <div className="mt-6 grid grid-cols-3 shadow ring-1 ring-black ring-opacity-5 md:rounded">
      <UsersCard title={getMessage('totalUsers')}>
        {summary.total_users}
      </UsersCard>

      <UsersCard title={getMessage('usersRequests')}>
        {summary.total_requests}
      </UsersCard>

      <UsersCard title={getMessage('banneds')}>
        {summary.total_blocked}
      </UsersCard>
    </div>
  )
}

export default Summary
