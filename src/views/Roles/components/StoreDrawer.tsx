import { ReactElement } from 'react'
import Button from 'components/Button'
import Drawer from 'components/Drawer'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'
import { useFormatMessage, useGlobalMessage } from 'hooks/useIntl'
import { rolesCreateMessages } from '../messages'
import AccordionModules from './Accordion'
import { useFormik } from 'formik'
import { useRoles } from 'context/Roles'

interface Props {
  open: boolean
  onClose?: () => void
}
interface FormValues {
  name: string
}
const StoreDrawer = ({ open, onClose }: Props): ReactElement => {
  const getMessage = useFormatMessage(rolesCreateMessages)
  const getGlobalMessage = useGlobalMessage()
  const { actions } = useRoles()

  const formik = useFormik<FormValues>({
    initialValues: {
      name: ''
    },
    onSubmit: (values) => {
      actions?.createRole({
        name: values.name,
        users: [],
        scopes: []
      })
    }
  })

  const items = [
    {
      id: 'config',
      label: 'Configuración de plataforma',
      checked: true,
      permissions: { create: true, edit: false, delete: false, export: false },
      submodules: [
        { id: 'config-general', checked: true, label: 'Config. general' },
        { id: '', checked: false, label: 'Medios y compañías' },
        { id: '', checked: true, label: 'Estaciones de telecomunicaciones' }
      ]
    },
    {
      id: '',
      label: 'Mi Cuenta',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Estadísticas',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Roles de usuario',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Control de usuarios',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Grupos de trabajo',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Medios de adquisición',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Técnicas',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Monitoreo',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Auditoría',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Redes de vinculación',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Importe y certificación',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Huella de voz',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Evidencias archivadas',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Redes de vinculación',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    },
    {
      id: '',
      label: 'Redes de vinculación',
      checked: false,
      permissions: { create: false, edit: false, delete: false, export: false }
    }
  ]

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
        <Typography variant="title" style="bold" className="uppercase">
          {getMessage('title')}
        </Typography>
        <p className="text-sm leading-tight mb-4">{getMessage('message')}</p>

        <div className="overflow-y-auto min-h-0 flex-1 basis-auto py-2">
          <span className="text-sm italic">{getMessage('name')}</span>
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />

          <h4 className="text-primary mt-4 mb-2 uppercase">
            {getMessage('modules')}
          </h4>

          <AccordionModules items={items} />

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
