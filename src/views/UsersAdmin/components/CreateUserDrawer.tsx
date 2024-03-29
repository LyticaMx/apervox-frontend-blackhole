import { ReactElement, useRef } from 'react'
import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { useFormatMessage } from 'hooks/useIntl'
import { usersCreateMessages } from '../messages'
import UserForm, { FormValues } from './UserForm'
import { useUsers } from 'context/Users'
import useToast from 'hooks/useToast'
import { FormikContextType } from 'formik'
import { useDidMountEffect } from 'hooks/useDidMountEffect'

interface Props {
  open: boolean
  onCreated?: (password: string) => void
  onClose?: () => void
}
const CreateUserDrawer = ({
  open,
  onClose,
  onCreated
}: Props): ReactElement => {
  const getMessage = useFormatMessage(usersCreateMessages)
  const { actions } = useUsers()
  const { launchToast } = useToast()
  const formikRef = useRef<FormikContextType<FormValues>>()

  const handleSubmit = async (values, helpers): Promise<void> => {
    try {
      const created = await actions?.createUser({
        username: values.username,
        email: values.email,
        name: values.name,
        lastName: values.lastname,
        position: values.position,
        phone: values.extension,
        groupsIds: values.groups.map((item) => item.value),
        roleId: values.role.value,
        closeSession: values.automaticSessionExpiration
      })
      if (created) {
        actions?.getUsers({}, true)
        onCreated?.(`${values.name.trim().split(' ').join('')}123`)
        launchToast({
          type: 'Success',
          title: getMessage('success')
        })
        helpers.resetForm()
      }
    } catch {
      onClose?.()
    }
  }

  useDidMountEffect(() => {
    if (!open) {
      setTimeout(() => {
        formikRef.current?.resetForm()
      }, 300)
    }
  }, [open])

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement="right"
      className="bg-background-secondary"
    >
      <div className="w-80 h-full flex flex-col px-2">
        <Typography variant="title" style="bold" className="uppercase">
          {getMessage('title')}
        </Typography>
        <p className="text-sm leading-tight mb-4">{getMessage('message')}</p>

        <UserForm onSubmit={handleSubmit} formikRef={formikRef} />
      </div>
    </Drawer>
  )
}

export default CreateUserDrawer
