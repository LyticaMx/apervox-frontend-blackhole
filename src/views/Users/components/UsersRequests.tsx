import { ReactElement, useMemo, useState } from 'react'
import { useFormatMessage } from 'hooks/useIntl'

import Card from 'components/Card'
import Table from 'components/Table'
import Title from 'components/Title'

import { usersRequestsMessages } from '../messages'
import RequestDialog, { SubmitParams } from './RequestDialog'
import { useToggle } from 'hooks/useToggle'
import { Role, User } from 'types/user'
import { useUsers } from 'context/Users'

const UsersRequests = (): ReactElement => {
  const { usersRequests, requestsPagination, actions } = useUsers()
  const getMessage = useFormatMessage(usersRequestsMessages)
  const [requestOpen, requestToggle] = useToggle(false)
  const [request, setRequest] = useState<User>()

  const manualPagination = useMemo(
    () => ({
      currentPage: requestsPagination.page - 1,
      totalRecords: requestsPagination.totalRecords,
      onChange: (page: number) => {
        actions?.getRequests({ page: page + 1 })
      }
    }),
    [requestsPagination]
  )

  const handelClick = (row): void => {
    setRequest(row)
    requestToggle()
  }
  const handleClose = (): void => {
    requestToggle()
    setTimeout(() => {
      setRequest(undefined)
    }, 300)
  }

  const handleSubmit = async (params: SubmitParams): Promise<void> => {
    if (!params.accept) {
      await actions?.rejectUser(params.user_id)
    }
    if (params.accept) {
      await actions?.acceptUser({
        dependency_id: params.dependency_id,
        user_id: params.user_id,
        role: params.role as Role
      })
    }

    requestToggle()
  }

  const columns = useMemo(
    () => [
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
          const profile = info.getValue()

          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          return `${profile.first_name} ${profile.fathers_name} ${profile.mothers_name}`
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
              onClick={() => handelClick(info.row.original)}
            >
              {getMessage('solve')}
            </button>
          )
        }
      }
    ],
    []
  )

  return (
    <Card className="mt-5">
      <Title variant="card">{getMessage('title')}</Title>

      <div className="w-full mt-2">
        <Table
          data={usersRequests}
          columns={columns}
          manualPagination={manualPagination}
          pageSize={requestsPagination.limit}
        />
      </div>

      <RequestDialog
        open={requestOpen}
        onClose={handleClose}
        data={request}
        onSubmit={(data) => {
          handleSubmit(data)
        }}
      />
    </Card>
  )
}

export default UsersRequests
