import { ReactElement, useEffect } from 'react'
import { useFormik } from 'formik'
import { format, parseISO } from 'date-fns'

import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { useRoles } from 'context/Roles'
import { Role } from 'types/auth'

import Button from 'components/Button'
import Drawer from 'components/Drawer'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'

import AccordionModules from './Accordion'
import { rolesDrawerMessages } from '../messages'
import { scopes } from '../constants'

interface Props {
  open: boolean
  role?: Role
  onClose?: () => void
}
interface FormValues {
  name: string
}
const StoreDrawer = ({ open, role, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(rolesDrawerMessages)
  const getGlobalMessage = useGlobalMessage()
  const { actions } = useRoles()

  const formik = useFormik<FormValues>({
    initialValues: {
      name: ''
    },
    onSubmit: async (values) => {
      console.log(role)
      if (role) {
        await actions?.updateRole({
          id: role.id,
          name: values.name
        })
      } else {
        await actions?.createRole({
          name: values.name,
          users: [],
          scopes: []
        })
      }
      await actions?.getRoles()
      if (onClose) onClose()
    }
  })

  const formatDate = (date?: string): string => {
    if (!date) return ''

    return format(parseISO(date), 'dd/MM/yyyy - hh:ss:mm')
  }

  useEffect(() => {
    if (open && role) {
      formik.resetForm({ values: { name: role.name } })
    }
  }, [open, role])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      className="bg-background-secondary"
    >
      <form
        className="w-80 h-full flex flex-col "
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-2">
          <Typography variant="title" style="bold" className="uppercase">
            {getMessage(role ? 'titleUpdate' : 'title')}
          </Typography>
          <p className="text-sm leading-tight mb-2">
            {getMessage(role ? 'messageUpdate' : 'message')}
          </p>

          {role && (
            <>
              <p className="text-xs text-muted">
                <span className="font-medium mr-1.5">
                  {getGlobalMessage('created', 'generalMessages')}:
                </span>{' '}
                {formatDate(role?.created_at)}{' '}
                <span className="ml-1">{role.created_by}</span>
              </p>
              <p className="text-xs text-muted mb-2">
                <span className="font-medium mr-1.5">
                  {getGlobalMessage('updated', 'generalMessages')}:
                </span>{' '}
                {formatDate(role?.updated_at)}{' '}
                <span className="ml-1">{role.updated_by}</span>
              </p>
            </>
          )}
        </div>
        <div className="overflow-y-auto min-h-0 flex-1 basis-auto py-2 px-1">
          <span className="text-sm italic">{getMessage('name')}</span>
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          <h4 className="text-primary mt-4 mb-2 uppercase">
            {getMessage('modules')}
          </h4>

          <AccordionModules items={scopes} />

          <h4 className="text-primary mt-4 mb-2 uppercase">
            {getGlobalMessage('users', 'generalMessages')}
          </h4>
          <p className="text-sm italic">{getMessage('usersMessage')}</p>

          <p className="text-sm italic">
            {getGlobalMessage('users', 'generalMessages')}
          </p>
          <TextField />
        </div>
        <div className="text-right mt-4">
          <Button variant="contained" color="primary" type="submit">
            {getGlobalMessage('save', 'actionsMessages')}
          </Button>
        </div>
      </form>
    </Drawer>
  )
}

export default StoreDrawer
