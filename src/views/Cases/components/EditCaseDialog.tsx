import { ReactElement } from 'react'
import Dialog from 'components/Dialog'
import { PencilIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import TextField from 'components/Form/Textfield'
import Button from 'components/Button'
import Checkbox from 'components/Form/Checkbox'
import { useIntl } from 'react-intl'
import { casesMessages, editCaseDialogMessages } from '../messages'
import { actionsMessages, formMessages } from 'globalMessages'
import { Pin, User } from 'types/case'
import { useFormik } from 'formik'
import Label from 'components/Label'
import { AsyncPaginate } from 'react-select-async-paginate'
import { useAsyncSelect } from 'hooks/useAsyncSelect'
import * as yup from 'yup'
import { useCases } from 'context/Cases'

interface Props {
  open: boolean
  onAccept: () => Promise<void>
  onClose: () => void
  caseId: string
  name: string
  users: User[]
  pins: Pin[]
}

interface FormValues {
  name: string
  users: any[]
  pins: any[]
  store: boolean
  userResponsability: boolean
}

const EditCaseDialog = (props: Props): ReactElement => {
  const { open, onAccept, onClose, caseId, name, pins, users } = props
  const { formatMessage } = useIntl()
  const { actions } = useCases()
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
        )} ${String(item.profile.mothers_name)}`
    })
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

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required))
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      name,
      pins: pins.map((pin) => ({ value: pin.id, label: pin.number })),
      users: users.map((user) => ({ value: user.id, label: user.fullName })),
      store: false,
      userResponsability: false
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const updated = await actions?.updateCase(
        caseId,
        values.store,
        values.name,
        values.users.map((user) => user.value),
        values.pins.map((pin) => pin.value)
      )
      if (updated) {
        await onAccept()
        onClose()
      }
    }
  })

  return (
    <Dialog open={open} onClose={onClose} size="sm" overflow="visible">
      <div className="px-5">
        <div className="mb-5 px-4 flex flex-col items-center text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
            <PencilIcon
              className="h-6 w-6 text-orange-600"
              aria-hidden="true"
            />
          </div>
          <Typography variant="title" style="semibold">
            {formatMessage(editCaseDialogMessages.editCase)}
          </Typography>
          <Typography variant="body2">
            {formatMessage(editCaseDialogMessages.linkedEdit)}
          </Typography>
          <form
            className="w-full  text-left mt-4 mb-3"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
          >
            <div className="w-full">
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
            <div className="w-full mt-4">
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
            <div className="w-full mt-4">
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
            <div className="mt-4 w-full">
              <Checkbox
                id="store"
                name="store"
                label={formatMessage(editCaseDialogMessages.archiveCase)}
                color="red"
                checked={formik.values.store}
                onChange={formik.handleChange}
              />
              <Checkbox
                id="userResponsability"
                name="userResponsability"
                label={formatMessage(actionsMessages.userAcceptAction)}
                checked={formik.values.userResponsability}
                onChange={formik.handleChange}
              />
            </div>
            <Button
              type="submit"
              color="indigo"
              variant="contained"
              className="mx-auto mt-6 !w-60"
              disabled={!formik.values.userResponsability}
            >
              {formatMessage(actionsMessages.edit)}
            </Button>
          </form>
          <hr className="w-full" />
          <Button
            color="indigo"
            variant="contained"
            className="mx-auto mt-3 !w-60"
          >
            {formatMessage(actionsMessages.generateReport)}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default EditCaseDialog
