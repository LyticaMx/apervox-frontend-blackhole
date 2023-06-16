import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import PasswordField from 'components/Form/PasswordField'
import { useFormik } from 'formik'
import { actionsMessages, formMessages, platformMessages } from 'globalMessages'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { messages } from './messages'
import * as yup from 'yup'
import { useSettings } from 'context/Settings'
import { useAuth } from 'context/Auth'
import useToast from 'hooks/useToast'

interface FormValues {
  password: string
}

interface Props {
  open: boolean
  title: string
  question: string
  confirmation: string
  onAccept: () => void
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
  const { actions: authActions } = useAuth()
  const { settings } = useSettings()
  const toast = useToast()

  const validationSchema = yup.object({
    password: yup.string().required(formatMessage(formMessages.required))
  })

  const handlePasswordVerification = async (
    values: FormValues
  ): Promise<void> => {
    const isValidPassword = await authActions?.verifyPassword(values.password)
    if (!isValidPassword) {
      toast.danger(formatMessage(platformMessages.incorrectPassword))
      onClose()
      return
    }

    onAccept()
  }

  const formik = useFormik<FormValues>({
    initialValues: { password: '' },
    onSubmit: handlePasswordVerification,
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

  const handleAccept = (): void => {
    if (!settings.doubleValidation) {
      onAccept()
      return
    }

    if (!accepted) setAccepted(true)
  }

  return (
    <Dialog open={open} onClose={onClose} size="sm" padding="none">
      <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="text-center sm:mt-0">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 m-auto mb-2" />
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {title}
            </h3>
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
          <Button variant="text" color="primary" onClick={onClose}>
            {accepted
              ? formatMessage(actionsMessages.cancel)
              : formatMessage(messages.noCancel)}
          </Button>
          <Button
            type={accepted ? 'submit' : 'button'}
            onClick={handleAccept}
            className="bg-red-200 !text-red-500 transition-colors hover:!bg-red-500 hover:!text-white"
          >
            {accepted
              ? formatMessage(actionsMessages.delete)
              : formatMessage(messages.yesDelete)}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default DeleteDialog
