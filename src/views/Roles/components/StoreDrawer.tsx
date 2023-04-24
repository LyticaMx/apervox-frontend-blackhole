/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactElement, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
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
import { Module, scopes } from '../constants'
import { Scope } from 'types/scope'
import SelectPaginate from 'components/Form/SelectPaginate'
import { omit } from 'lodash'

interface Props {
  open: boolean
  role?: Role
  onClose?: () => void
}
interface FormValues {
  name: string
  users: any[]
}
const StoreDrawer = ({ open, role, onClose }: Props): ReactElement => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(open)
  const getMessage = useFormatMessage(rolesDrawerMessages)
  const getGlobalMessage = useGlobalMessage()
  const [items, setItems] = useState<Module[]>(scopes)
  const [roleUsers, setRoleUsers] = useState<any[]>([])
  const { actions } = useRoles()

  const validationSchema = yup.object({
    name: yup.string().required(getMessage('required')),
    users: yup.array().required(getMessage('required'))
  })
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      users: []
    },
    validationSchema,
    onSubmit: async (values) => {
      const users = values.users.map((item) => item.value)
      const scopes: Scope[] = items.map((item) => ({
        name: item.id,
        ...item.permissions
      }))

      if (role) {
        await actions?.updateRole({
          id: role.id,
          name: values.name,
          users: {
            connect: users,
            disconnect: roleUsers
              .filter((item) => !users.includes(item.id))
              .map((item) => item.id)
          },
          scopes
        })
      } else {
        await actions?.createRole({
          name: values.name,
          users,
          scopes
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

  const setForm = async (): Promise<void> => {
    try {
      if (role) {
        const scopes = await actions?.getScopes(role.id)

        const aux = items.map((item) => {
          const scope = scopes?.find((value) => value.name === item.id)

          if (!scope) return item

          return {
            ...item,
            permissions: omit(scope, ['name'])
          }
        })

        setItems(aux)

        const users = role.users ?? []
        formik.resetForm({
          values: {
            name: role.name,
            users: users.map((item) => ({
              value: item.id,
              label: item.username
            }))
          }
        })
        setRoleUsers(users)
      } else {
        formik.resetForm({ values: { name: '', users: [] } })
        setItems((prev) =>
          prev.map((item) => ({
            ...item,
            permissions: {
              read: false,
              update: false,
              create: false,
              delete: false,
              export: false
            }
          }))
        )
      }
      setTimeout(() => {
        setOpenDrawer(true)
      }, 300)
    } catch {}
  }

  useEffect(() => {
    if (open) {
      setForm()
    } else {
      setOpenDrawer(open)
    }
  }, [open, role])

  return (
    <Drawer
      open={openDrawer}
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
            error={!!formik.errors.name && !!formik.touched.name}
            helperText={
              !!formik.errors.name && !!formik.touched.name
                ? formik.errors.name
                : ''
            }
          />

          <h4 className="text-primary mt-4 mb-2 uppercase">
            {getMessage('modules')}
          </h4>

          <AccordionModules items={items} onChange={setItems} />

          <h4 className="text-primary mt-4 mb-2 uppercase">
            {getGlobalMessage('users', 'generalMessages')}
          </h4>
          <p className="text-sm italic">{getMessage('usersMessage')}</p>

          <p className="text-sm italic">
            {getGlobalMessage('users', 'generalMessages')}
          </p>
          <TextField />
          <SelectPaginate
            asyncProps={{
              api: {
                endpoint: 'users',
                method: 'get'
              },
              value: 'id',
              label: 'username',
              searchField: 'username'
            }}
            debounceTimeout={300}
            value={formik.values.users}
            onChange={(val) => {
              formik.setFieldValue('users', val)
            }}
          />
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
