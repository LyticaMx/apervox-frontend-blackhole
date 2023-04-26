import { ReactElement, useEffect, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import { useFormatMessage } from 'hooks/useIntl'
import { useRoles } from 'context/Roles'
import { Role } from 'types/auth'

import Title from 'components/Title'
import ViewFilter from 'components/ViewFilter'

import RoleCard from './components/Card'
import DisableDialog from './components/DisableDialog'
import StoreDrawer from './components/StoreDrawer'
import DeleteDialog from './components/DeleteDialog'
import { rolesMessages } from './messages'
import Pagination from 'components/Table/Pagination'

const Roles = (): ReactElement => {
  const { data, pagination, actions } = useRoles()

  const getMessage = useFormatMessage(rolesMessages)

  const [role, setRole] = useState<Role | undefined>()
  const [open, toggleOpen] = useToggle(false)
  const [deleteDialog, toggleDelete] = useToggle(false)
  const [disabledDialog, toggleDisabled] = useToggle(false)
  const items = [{ label: 'Usuario', name: 'created_by' }]

  useEffect(() => {
    actions?.getData()
  }, [])

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">
            {pagination.totalRecords} {getMessage('subtitle')}
          </p>
        </div>
        <ViewFilter
          fields={items}
          action={{
            label: getMessage('button'),
            onClick: () => {
              setRole(undefined)
              toggleOpen()
            }
          }}
          download={(document) => alert(document)}
          onChange={(data) =>
            actions?.getData({
              start_time: data.dateRange[0],
              end_time: data.dateRange[1],
              filters: data.filterByField.fields,
              query: data.filterByField.search
            })
          }
        />
      </div>

      <div className="grid gap-4 mt-8 xl:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item, index) => (
          <RoleCard
            onClick={() => {
              setRole(item)
              toggleOpen()
            }}
            key={index}
            data={item}
            onBlock={() => {
              setRole(item)
              toggleDisabled()
            }}
            onDelete={() => {
              setRole(item)
              toggleDelete()
            }}
            onHistory={() => {}}
          />
        ))}
      </div>

      <Pagination
        onPageChange={(page) => actions?.getData({ page: page + 1 })}
        currentPage={pagination.page}
        pageSize={pagination.limit}
        totalCount={pagination.totalRecords}
        manualLimit={{
          options: [15, 25, 50, 100],
          onChangeLimit: (page, limit) =>
            actions?.getData({
              page: page + 1,
              limit
            })
        }}
      />

      <StoreDrawer open={open} onClose={toggleOpen} role={role} />
      <DeleteDialog open={deleteDialog} role={role} onClose={toggleDelete} />
      <DisableDialog
        open={disabledDialog}
        role={role}
        onClose={toggleDisabled}
      />
    </div>
  )
}

export default Roles
