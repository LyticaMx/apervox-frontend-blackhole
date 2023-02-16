import Title from 'components/Title'
import ViewFilter from 'components/ViewFilter'
import { useFormatMessage } from 'hooks/useIntl'
import { ReactElement } from 'react'
import { useToggle } from 'usehooks-ts'
import RoleCard from './components/Card'
import DeleteDialog from './components/DeleteDialog'
import DisableDialog from './components/DisableDialog'
import StoreDrawer from './components/StoreDrawer'
import { rolesMessages } from './messages'

const Roles = (): ReactElement => {
  const getMessage = useFormatMessage(rolesMessages)
  const [open, toggleOpen] = useToggle(false)
  const [openDialog, toggleOpenDialog] = useToggle(false)
  const [openDisabledDialog, toggleOpenDisabledDialog] = useToggle(false)
  const items = [
    { label: 'Numero de usuarios', name: 'numero_usuarios' },
    { label: 'Usuario', name: 'usuario' }
  ]

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">04 {getMessage('subtitle')}</p>
        </div>
        <ViewFilter fields={items} onAction={toggleOpen} />
      </div>

      <div className="grid gap-4 mt-8 xl:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RoleCard
          data={{
            id: '',
            name: 'Vinculación',
            created_at: '25/11/2022 - 10:00:00',
            user_name: 'Efrain Cuadras',
            total_users: 5
          }}
          onBlock={() => toggleOpenDisabledDialog()}
          onDelete={() => toggleOpenDialog()}
          onHistory={() => {}}
        />
      </div>

      <StoreDrawer open={open} onClose={toggleOpen} />
      <DeleteDialog open={openDialog} onClose={toggleOpenDialog} />
      <DisableDialog
        open={openDisabledDialog}
        onClose={toggleOpenDisabledDialog}
      />
    </div>
  )
}

export default Roles
