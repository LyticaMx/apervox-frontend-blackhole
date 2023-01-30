import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useFormatMessage } from 'hooks/useIntl'

import Card from 'components/Card'
import Table from 'components/Table'
import Title from 'components/Title'

import { dependencyUsersMessages } from '../messages'
import clsx from 'clsx'
import Button from 'components/Button'
import LinkUserDialog from './LinkUserDialog'
import EjectUserDialog from './EjectUserDialog'
import { useToggle } from 'hooks/useToggle'
import { User } from 'types/user'
import { useDependencies } from 'context/Dependencies'

const DependencyUsers = (): ReactElement => {
  const { dependency, actions } = useDependencies()
  const getMessage = useFormatMessage(dependencyUsersMessages)

  const [linkOpen, toggleLink] = useToggle(false)
  const [ejectOpen, toggleEject] = useToggle(false)
  const [user, setUser] = useState<User | undefined>()

  const data = dependency?.users ?? []
  const dependencyName = useMemo(() => dependency?.name ?? '', [dependency])
  const userName = useMemo(() => {
    return user?.email ?? ''
  }, [user])

  useEffect(() => {
    if (!dependency?.users?.length) {
      setUser(undefined)
    }
  }, [dependency])

  const handleClick = (row): void => {
    setUser(row)
    toggleEject()
  }
  const handleClose = (): void => {
    toggleEject()
    setTimeout(() => {
      setUser(undefined)
    }, 300)
  }

  const handleEject = async (): Promise<void> => {
    if (user && dependency) {
      await actions?.ejectUser({
        user_id: user.id,
        dependency_id: dependency.id
      })

      toggleEject()
    }
  }

  const handleLinkUsers = async (ids): Promise<void> => {
    if (dependency) {
      await actions?.linkUsers({
        dependency_id: dependency.id,
        users_ids: ids
      })

      toggleLink()
    }
  }

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
        header: getMessage('tableName'),
        accessorKey: 'user_name'
      },
      {
        header: getMessage('tableEmail'),
        accessorKey: 'email'
      },
      {
        header: ' ',
        cell: (info) => (
          <button
            className="text-blue-500 font-bold"
            onClick={() => {
              handleClick(info.row.original)
            }}
          >
            {getMessage('tableEject')}
          </button>
        )
      }
    ],
    []
  )

  return (
    <Card className="mt-5">
      {dependency && (
        <div className="flex">
          <Title variant="card">{dependency.name}</Title>
          <Button
            variant="contained"
            color="blue"
            className="ml-auto"
            onClick={toggleLink}
          >
            {getMessage('linkUser')}
          </Button>
        </div>
      )}

      <div className="w-full mt-2">
        <Table data={data} columns={columns} />
      </div>

      <LinkUserDialog
        open={linkOpen}
        onClose={toggleLink}
        dependency={dependency}
        onSubmit={handleLinkUsers}
      />
      <EjectUserDialog
        open={ejectOpen}
        onClose={handleClose}
        onAccept={() => {
          handleEject()
        }}
        dependencyName={dependencyName}
        userName={userName}
      />
    </Card>
  )
}

export default DependencyUsers
