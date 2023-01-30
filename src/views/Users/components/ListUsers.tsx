import { ReactElement, useMemo, useState } from 'react'
import { useFormatMessage } from 'hooks/useIntl'

import Card from 'components/Card'
import Table from 'components/Table'
import Title from 'components/Title'

import { listUsersMessages } from '../messages'
import clsx from 'clsx'
import UpdateUserDialog from './UpdateDialog'
import { useToggle } from 'hooks/useToggle'
import { Profile, User } from 'types/user'
import { useUsers } from 'context/Users'

const ListUsers = (): ReactElement => {
  const { users, usersPagination, actions } = useUsers()
  const getMessage = useFormatMessage(listUsersMessages)
  const [updateOpen, updateToggle] = useToggle(false)
  const [user, setUser] = useState<User | undefined>()

  const handleClick = (row): void => {
    setUser(row)
    updateToggle()
  }

  const handleClose = (): void => {
    updateToggle()

    setTimeout(() => {
      setUser(undefined)
    }, 300)
  }

  const handleSubmit = async (data): Promise<void> => {
    if (user) {
      await actions?.updateUser({
        active: !data.block,
        user_id: user.id,
        role: data.role
      })
      updateToggle()
    }
  }

  const manualPagination = useMemo(
    () => ({
      currentPage: usersPagination.page - 1,
      totalRecords: usersPagination.totalRecords,
      onChange: (page: number) => {
        actions?.getUsers({ page: page + 1 })
      }
    }),
    [usersPagination]
  )

  const columns = useMemo(
    () => [
      {
        header: ' ',
        accessorKey: 'active',
        cell: (info) => {
          const active = info.getValue()

          return (
            <div
              className={clsx('w-2.5 h-2.5 rounded-full', {
                'bg-red-500': !active,
                'bg-green-500': active
              })}
            />
          )
        }
      },
      {
        header: getMessage('tableDateRequest'),
        accessorKey: 'date'
      },
      {
        header: getMessage('tableTimeRequest'),
        accessorKey: 'hours'
      },
      {
        header: getMessage('username'),
        accessorKey: 'profile',
        cell: (info) => {
          const profile: Profile = info.getValue()

          return `${profile?.first_name} ${profile?.fathers_name} ${profile?.mothers_name}`
        }
      },
      {
        header: getMessage('email'),
        accessorKey: 'email'
      },
      {
        header: ' ',
        cell: (info) => {
          return (
            <button
              className="text-blue-500 font-bold"
              onClick={() => handleClick(info.row.original)}
            >
              Administrar
            </button>
          )
        }
      }
    ],
    []
  )
  return (
    <Card className="mt-5">
      <Title variant="card">{getMessage('users')}</Title>

      <div className="w-full mt-2">
        <Table
          data={users}
          columns={columns}
          manualPagination={manualPagination}
          pageSize={usersPagination.limit}
        />
      </div>

      <UpdateUserDialog
        open={updateOpen}
        onClose={handleClose}
        data={user}
        onSubmit={(data) => {
          handleSubmit(data)
        }}
      />
    </Card>
  )
}

export default ListUsers
