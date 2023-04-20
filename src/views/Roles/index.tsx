import DeleteDialog from 'components/DeleteDialog'
import Title from 'components/Title'
import ViewFilter from 'components/ViewFilter'
import { useRoles } from 'context/Roles'

import { useFormatMessage } from 'hooks/useIntl'
import { ReactElement, useEffect } from 'react'
import { useToggle } from 'usehooks-ts'
import RoleCard from './components/Card'

import DisableDialog from './components/DisableDialog'
import StoreDrawer from './components/StoreDrawer'
import { rolesMessages, rolesDeleteMessages } from './messages'

const Roles = (): ReactElement => {
  const { roles, actions } = useRoles()
  const getMessage = useFormatMessage(rolesMessages)
  const getDeleteMessage = useFormatMessage(rolesDeleteMessages)
  const [open, toggleOpen] = useToggle(false)
  const [openDialog, toggleOpenDialog] = useToggle(false)
  const [openDisabledDialog, toggleOpenDisabledDialog] = useToggle(false)
  const items = [
    { label: 'Numero de usuarios', name: 'numero_usuarios' },
    { label: 'Usuario', name: 'usuario' }
  ]

  useEffect(() => {
    actions?.getRoles()
  }, [])

  const handleDelete = ({ password }: { password: string }): void => {
    console.log(password)
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title className="uppercase">{getMessage('title')}</Title>
          <p className="uppercase">04 {getMessage('subtitle')}</p>
        </div>
        <ViewFilter
          fields={items}
          action={{ label: getMessage('button'), onClick: toggleOpen }}
          download={(document) => alert(document)}
        />
      </div>

      <div className="grid gap-4 mt-8 xl:mt-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {roles.map((item, index) => (
          <RoleCard
            key={index}
            data={item}
            onBlock={() => toggleOpenDisabledDialog()}
            onDelete={() => toggleOpenDialog()}
            onHistory={() => {}}
          />
        ))}
      </div>

      <StoreDrawer open={open} onClose={toggleOpen} />
      <DeleteDialog
        title={getDeleteMessage('title')}
        question={getDeleteMessage('message')}
        confirmation={getDeleteMessage('confirm')}
        open={openDialog}
        onAccept={handleDelete}
        onClose={toggleOpenDialog}
      />
      <DisableDialog
        open={openDisabledDialog}
        onClose={toggleOpenDisabledDialog}
      />
    </div>
  )
}

export default Roles
