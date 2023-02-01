import { ReactElement, useEffect, useMemo } from 'react'
import { useFormik } from 'formik'
import { PencilIcon } from '@heroicons/react/24/outline'

import Button from 'components/Button'
import Dialog from 'components/Dialog'

import { useFormatMessage } from 'hooks/useIntl'

import { updateMessages } from '../messages'
import Divider from 'components/Divider'
import Switchs from 'components/Form/Switch'
import Typography from 'components/Typography'
import Checkbox from 'components/Form/Checkbox'
import { Role, User } from 'types/user'
import Radio from 'components/Form/Radio'

interface FormValues {
  block: boolean
  role: string
  accept: boolean
}

interface Props {
  data?: User
  open?: boolean
  onClose?: (event?: any) => void
  onSubmit?: (values?: FormValues) => void
}

const UpdateUserDialog = ({
  data,
  open = true,
  onClose = () => {},
  onSubmit = () => {}
}: Props): ReactElement => {
  const getMessage = useFormatMessage(updateMessages)

  const formik = useFormik<FormValues>({
    initialValues: {
      block: false,
      role: '',
      accept: false
    },
    onSubmit
  })

  const valid = useMemo(() => {
    if (!formik.values.accept) return false
    if (formik.values.block) return true

    return formik.values.role
  }, [formik.values])

  useEffect(() => {
    if (open) {
      if (!data) onClose()
      else {
        formik.resetForm({
          values: {
            block: !data.active,
            accept: false,
            role: data.role ?? Role.READER
          }
        })
      }
    }
  }, [open, data])

  return (
    <Dialog open={open} onClose={onClose} size="sm">
      <div className="px-2">
        <div className="mb-5 px-5 flex flex-col items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
            <PencilIcon
              className="h-5 w-5 text-yellow-600"
              aria-hidden="true"
            />
          </div>
          <h1 className="mb-3 font-medium text-black">{getMessage('title')}</h1>
          <p className="text-sm text-gray-400">{getMessage('subtitle')}</p>
        </div>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between gap-5">
            <div className="flex gap-2">
              <Switchs
                size="sm"
                color="blue"
                value={formik.values.block}
                onChange={value => {
                  formik.setFieldValue('block', value)
                }}
              />
              <Typography style="medium" variant="body2">
                {getMessage('ban')}
              </Typography>
            </div>
            <Typography
              style="medium"
              variant="body2"
              className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0"
            >
              {data?.email}
            </Typography>
          </div>
          <Divider margin="none" style="medium" />
          <div>
            <Typography style="medium" variant="body1">
              {getMessage('permissions')}
            </Typography>
            <div className="flex gap-4 flex-wrap py-2">
              <Radio
                name="role"
                disabled={formik.values.block}
                value={Role.READER}
                checked={Role.READER === formik.values.role}
                onChange={() => {
                  formik.setFieldValue('role', Role.READER)
                }}
                label={getMessage('read')}
              />
              <Radio
                name="role"
                disabled={formik.values.block}
                value={Role.WRITER}
                checked={Role.WRITER === formik.values.role}
                onChange={() => {
                  formik.setFieldValue('role', Role.WRITER)
                }}
                label={getMessage('write')}
              />
              <Radio
                name="role"
                disabled={formik.values.block}
                value={Role.ADMIN}
                checked={Role.ADMIN === formik.values.role}
                onChange={() => {
                  formik.setFieldValue('role', Role.ADMIN)
                }}
                label={getMessage('admin')}
              />
            </div>
          </div>
          <Divider margin="none" style="medium" />
          <Checkbox
            className="mt-8"
            name="accept"
            checked={formik.values.accept}
            onChange={formik.handleChange}
            label={getMessage('userAcceptAction')}
          />

          <Button
            type="submit"
            variant="contained"
            className="text-center w-full"
            margin="none"
            color="blue"
            disabled={!valid}
            fullwidth
          >
            {getMessage('edit')}
          </Button>
        </form>
      </div>
    </Dialog>
  )
}

export default UpdateUserDialog
