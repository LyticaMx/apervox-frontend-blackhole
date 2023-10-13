import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { FormikConfig } from 'formik'
import * as yup from 'yup'
import Typography from 'components/Typography'
import Card from 'components/Card'
import Form from 'components/Form'
import { Field } from 'types/form'
import { formMessages } from 'globalMessages'
import { changePasswordMessages } from '../messages'
import { useAuth } from 'context/Auth'
import useToast from 'hooks/useToast'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

interface FormValues {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const ChangePassword = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useAuth()
  const { launchToast } = useToast()
  const ability = useAbility()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'password',
      name: 'currentPassword',
      options: {
        id: 'currentPassword',
        label: formatMessage(changePasswordMessages.currentPassword),
        placeholder: formatMessage(changePasswordMessages.passwordPlaceholder)
      }
    },
    {
      type: 'password',
      name: 'newPassword',
      options: {
        id: 'newPassword',
        label: formatMessage(changePasswordMessages.newPassword),
        placeholder: formatMessage(changePasswordMessages.passwordPlaceholder),
        passwordStrength: true
      }
    },
    {
      type: 'password',
      name: 'confirmPassword',
      options: {
        id: 'confirmPassword',
        label: formatMessage(changePasswordMessages.confirmPassword),
        placeholder: formatMessage(changePasswordMessages.passwordPlaceholder)
      }
    }
  ]

  const validationSchema = yup.object({
    currentPassword: yup
      .string()
      .required(formatMessage(formMessages.required)),
    newPassword: yup.string().required(formatMessage(formMessages.required)),
    confirmPassword: yup
      .string()
      .equals(
        [yup.ref('newPassword')],
        formatMessage(formMessages.passwordsNotMatches)
      )
      .required(formatMessage(formMessages.required))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const updated = await actions?.changePassword(
        values.currentPassword,
        values.newPassword
      )
      if (updated) {
        launchToast({
          title: formatMessage(changePasswordMessages.success),
          type: 'Success'
        })
        resetForm()
      }
    }
  }

  return (
    <>
      <Card className="h-full">
        <Typography variant="subtitle" style="semibold" className="mb-2">
          {formatMessage(changePasswordMessages.title)}
        </Typography>

        <Typography variant="body1" className="mb-6">
          {formatMessage(changePasswordMessages.subtitle)}
        </Typography>

        <Form
          formikConfig={formikConfig}
          fields={fields}
          submitButtonPosition="right"
          submitButtonLabel={formatMessage(changePasswordMessages.submitButton)}
          submitButtonProps={{
            color: 'indigo',
            variant: 'contained',
            className: 'mt-6 mb-2',
            disabled: ability.cannot(ACTION.UPDATE, SUBJECT.ME)
          }}
          className="user-account-change-password-form"
        />
      </Card>
    </>
  )
}

export default ChangePassword
