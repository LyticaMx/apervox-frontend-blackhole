import Form from 'components/Form'
import { FormikConfig, FormikContextType, FormikHelpers } from 'formik'
import { actionsMessages, formMessages, platformMessages } from 'globalMessages'
import { MutableRefObject, ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import * as yup from 'yup'

export interface FormValues {
  phone: string
}

interface Props {
  initialValues?: FormValues
  onSubmit: (
    values: FormValues,
    formikHelpers?: FormikHelpers<FormValues>
  ) => Promise<void>
  formikRef?: MutableRefObject<FormikContextType<FormValues> | undefined>
}

const VerificationLineForm = ({
  initialValues,
  onSubmit,
  formikRef
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'phone',
      options: {
        label: formatMessage(platformMessages.phoneNumber),
        placeholder: formatMessage(formMessages.phonePlaceholder),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    }
  ]

  const validationSchema = yup.object({
    phone: yup
      .string()
      .required(formatMessage(formMessages.required))
      .length(10, formatMessage(formMessages.length, { length: 10 }))
      .matches(/^\d{10}$/, {
        message: formatMessage(formMessages.invalidPhoneNumber),
        name: 'onlyNumbers'
      })
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        phone: initialValues?.phone ?? ''
      },
      validationSchema,
      onSubmit,
      enableReinitialize: true
    }),
    [initialValues]
  )

  return (
    <Form
      formikConfig={formikConfig}
      formikRef={formikRef}
      fields={fields}
      submitButtonPosition="right"
      submitButtonLabel={formatMessage(actionsMessages.save)}
      submitButtonProps={{
        color: 'indigo',
        variant: 'contained',
        className: 'mt-6 mb-2'
      }}
    />
  )
}

export default VerificationLineForm
