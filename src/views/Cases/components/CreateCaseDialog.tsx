import { ReactElement, useEffect } from 'react'
import Dialog from 'components/Dialog'
import { PlusIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import TextField from 'components/Form/Textfield'
import Button from 'components/Button'
import { useIntl } from 'react-intl'
import { casesMessages, createCaseDialogMessages } from '../messages'
import { actionsMessages, formMessages } from 'globalMessages'
import { useCases } from 'context/Cases'
import { useFormik } from 'formik'
import { AsyncPaginate } from 'react-select-async-paginate'
import Label from 'components/Label'
import { useAsyncSelect } from 'hooks/useAsyncSelect'
import * as yup from 'yup'

interface Props {
  open: boolean
  onClose: () => void
  onAccept: () => Promise<void>
}

interface FormValues {
  name: string
  users: any[]
  pins: any[]
}

const CreateCaseDialog = (props: Props): ReactElement => {
  const { open, onClose, onAccept } = props
  const { formatMessage } = useIntl()
  const { actions } = useCases()
  const { loadOptions: loadPins, resetPaginate: resetPinsPaginate } =
    useAsyncSelect({
      api: {
        endpoint: 'pins',
        method: 'get'
      },
      label: 'number',
      value: 'id',
      extraParams: {
        only_available: false
      }
    })
  const { loadOptions: loadUsers, resetPaginate: resetUsersPaginate } =
    useAsyncSelect({
      api: {
        endpoint: 'users/get-all-users',
        method: 'get'
      },
      value: 'id',
      customLabel: (item) =>
        `${String(item.profile.first_name)} ${String(
          item.profile.fathers_name
        )}`
    })

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required))
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      users: [],
      pins: []
    },
    validationSchema,
    onSubmit: async (values) => {
      const created = await actions?.createCase(
        values.name,
        values.users.map((user) => user.value),
        values.pins.map((pin) => pin.value)
      )
      if (created) {
        await onAccept()
        onClose()
      }
    }
  })

  useEffect(() => {
    if (open) formik.resetForm()
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} size="sm" overflow="visible">
      <div className="px-5">
        <div className="mb-5 px-4 flex flex-col items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <PlusIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
          </div>
          <Typography variant="title" style="semibold">
            {formatMessage(createCaseDialogMessages.createCase)}
          </Typography>
          <Typography variant="body2">
            {formatMessage(createCaseDialogMessages.linkedCreate)}
          </Typography>
          <form
            className="w-full mt-4"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <div className="text-left w-full">
              <TextField
                id="name"
                name="name"
                label={formatMessage(formMessages.name)}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.errors.name && formik.touched.name)}
                helperText={
                  formik.errors.name && formik.touched.name
                    ? formik.errors.name
                    : ''
                }
              />
            </div>
            <div className="text-left w-full mt-4">
              <Label id="users">{formatMessage(casesMessages.linkUser)}</Label>
              <AsyncPaginate
                id="users"
                value={formik.values.users}
                onChange={async (value) =>
                  await formik.setFieldValue('users', value)
                }
                loadOptions={loadUsers}
                isMulti
                closeMenuOnSelect={false}
                onMenuClose={resetUsersPaginate}
                placeholder={formatMessage(casesMessages.linkUsersPlaceholder)}
              />
            </div>
            <div className="text-left w-full mt-4">
              <Label id="pins">{formatMessage(casesMessages.linkPins)}</Label>
              <AsyncPaginate
                id="pins"
                value={formik.values.pins}
                onChange={async (value) =>
                  await formik.setFieldValue('pins', value)
                }
                loadOptions={loadPins}
                isMulti
                closeMenuOnSelect={false}
                onMenuClose={resetPinsPaginate}
                placeholder={formatMessage(casesMessages.linkPinsPlaceholder)}
              />
            </div>
            <Button
              color="indigo"
              variant="contained"
              className="mx-auto mt-6 !w-60"
              type="submit"
            >
              {formatMessage(actionsMessages.create)}
            </Button>
          </form>
        </div>
      </div>
    </Dialog>
  )
}

export default CreateCaseDialog
