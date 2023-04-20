import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import PasswordField from 'components/Form/PasswordField'
import { useFormik } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { messages } from './messages'
import * as yup from 'yup'

interface FormValues {
  password: string
}

interface Props {
  open: boolean
  title: string
  question: string
  confirmation: string
  onAccept: (data: FormValues) => void
  onClose?: () => void
}

const DeleteDialog = (props: Props): ReactElement => {
  const {
    open = true,
    title,
    question,
    confirmation,
    onAccept,
    onClose = () => {}
  } = props
  const [accepted, setAccepted] = useState<boolean>(false)
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    password: yup.string().required(formatMessage(formMessages.required))
  })

  const formik = useFormik<FormValues>({
    initialValues: { password: '' },
    onSubmit: (values) => {
      onAccept(values)
    },
    validationSchema
  })

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setAccepted(false)
        formik.resetForm()
        formik.setFieldTouched('password', false)
      }, 300)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="text-center sm:mt-0">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 m-auto mb-2" />
            <h3>{title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {accepted ? confirmation : question}
            </p>
            <div className="text-left">
              {accepted && (
                <PasswordField
                  id="password"
                  name="password"
                  label={formatMessage(formMessages.password)}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.errors.password && formik.touched.password
                  )}
                  helperText={
                    formik.errors.password && formik.touched.password
                      ? formik.errors.password
                      : ''
                  }
                />
              )}
            </div>
          </div>
        </div>
        <div className=" px-4 pb-8 sm:flex gap-2 justify-center">
          <Button
            variant="contained"
            color="red"
            type={accepted ? 'submit' : 'button'}
            onClick={() => {
              if (!accepted) setAccepted(true)
            }}
          >
            {accepted
              ? formatMessage(actionsMessages.delete)
              : formatMessage(messages.yesDelete)}
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            {accepted
              ? formatMessage(actionsMessages.cancel)
              : formatMessage(messages.noCancel)}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default DeleteDialog
