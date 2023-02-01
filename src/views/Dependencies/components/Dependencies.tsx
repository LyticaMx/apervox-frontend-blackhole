import { ReactElement, useMemo, useState } from 'react'
import { format } from 'date-fns'

import { useFormatMessage } from 'hooks/useIntl'

import Card from 'components/Card'
import Table from 'components/Table'
import Title from 'components/Title'
import StoreDependencyDialog from './StoreDialog'
import UpdateDependencyDialog from './UpdateDialog'
import DeleteDependencyDialog from './DeleteDialog'

import Button from 'components/Button'
import { listDependenciesMessages } from '../messages'
import { useToggle } from 'hooks/useToggle'
import { useDependencies } from 'context/Dependencies'
import { Dependency } from 'types/dependency'

const ListDependencies = (): ReactElement => {
  const { dependencies, dependenciesPagination, actions } = useDependencies()
  const getMessage = useFormatMessage(listDependenciesMessages)
  const [storeOpen, toggleStore] = useToggle(false)
  const [updateOpen, toggleUpdate] = useToggle(false)
  const [deleteOpen, toggleDelete] = useToggle(false)
  const [dependency, setDependency] = useState<Dependency | undefined>()

  const handleUpdate = (row): void => {
    setDependency(row)
    toggleUpdate()
  }
  const handleDelete = (row): void => {
    setDependency(row)
    toggleDelete()
  }

  const handleCloseUpdate = (): void => {
    toggleUpdate()
    setTimeout(() => {
      setDependency(undefined)
    }, 300)
  }
  const handleCloseDelete = (): void => {
    toggleDelete()
    setTimeout(() => {
      setDependency(undefined)
    }, 300)
  }

  const handleSubmitStore = async (values): Promise<void> => {
    const res = await actions?.storeDependency({
      name: values.name,
      users_ids: values.ids
    })

    if (res) {
      toggleStore()
    }
  }
  const handleSubmitUpdate = async (values): Promise<void> => {
    if (dependency) {
      const res = await actions?.updateDependency({
        dependency_id: dependency?.id,
        name: values.name,
        users_ids: values.ids
      })

      if (res) {
        toggleUpdate()
      }
    }
  }

  const handleAcceptDelete = async (): Promise<void> => {
    if (dependency) {
      const res = await actions?.deleteDependency(dependency.id)

      if (res) {
        toggleDelete()
      }
    }
  }

  const handleClick = (row): void => {
    actions?.setDependency(row)
  }

  const manualPagination = useMemo(
    () => ({
      currentPage: dependenciesPagination.page - 1,
      totalRecords: dependenciesPagination.totalRecords,
      onChange: (page: number) => {
        actions?.getDependencies({ page: page + 1 })
      }
    }),
    [dependenciesPagination]
  )

  const columns = useMemo(
    () => [
      {
        header: getMessage('tableName'),
        accessorKey: 'name'
      },
      {
        header: getMessage('tableTotalUsers'),
        accessorKey: 'users',
        cell: (info) => {
          const value = info.getValue()

          return <div className="text-center">{value.length}</div>
        }
      },
      {
        header: getMessage('tableCreatedAt'),
        accessorKey: 'created_at',
        cell: (info) => {
          const date = new Date(info.getValue())

          return <span>{format(date, 'dd/MM/yyyy')}</span>
        }
      },
      {
        header: ' ',
        cell: (info) => (
          <div className="flex justify-around">
            <button
              className="text-blue-500 font-bold"
              onClick={(e) => {
                handleUpdate(info.row.original)
                e.stopPropagation()
              }}
            >
              {getMessage('edit')}
            </button>
            <button
              className="text-red-500 font-bold"
              onClick={(e) => {
                handleDelete(info.row.original)
                e.stopPropagation()
              }}
            >
              {getMessage('delete')}
            </button>
          </div>
        )
      }
    ],
    []
  )

  return (
    <Card className="mt-5">
      <div className="flex justify-between">
        <Title variant="card">{getMessage('title')}</Title>
        <Button variant="contained" color="blue" onClick={() => toggleStore()}>
          {getMessage('addDepndency')}
        </Button>
      </div>

      <div className="w-full mt-2">
        <Table
          data={dependencies}
          columns={columns}
          manualPagination={manualPagination}
          onRowClicked={handleClick}
        />
      </div>

      <StoreDependencyDialog
        open={storeOpen}
        onClose={toggleStore}
        onSubmit={handleSubmitStore}
      />
      <UpdateDependencyDialog
        open={updateOpen}
        onClose={handleCloseUpdate}
        data={dependency}
        onSubmit={handleSubmitUpdate}
      />
      <DeleteDependencyDialog
        open={deleteOpen}
        onClose={handleCloseDelete}
        onAccept={handleAcceptDelete}
      />
    </Card>
  )
}

export default ListDependencies
