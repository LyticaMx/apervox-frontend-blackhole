import { ReactElement, useEffect } from 'react'

import { useUsers } from 'context/Users'

import ListUsers from './components/ListUsers'
import UsersRequests from './components/UsersRequests'
import AdminMenu from 'components/AdminMenu'
import Summary from './components/Summary'

const Users = (): ReactElement => {
  const { actions } = useUsers()

  const getAll = (): void => {
    actions?.getSummary()
    actions?.getUsers()
    actions?.getRequests()
  }

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div>
      <AdminMenu />
      <Summary />

      <UsersRequests />
      <ListUsers />
    </div>
  )
}

export default Users
