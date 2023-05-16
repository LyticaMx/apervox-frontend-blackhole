import Form from 'components/Form'
import { FormikConfig, FormikContextType, FormikHelpers } from 'formik'
import { actionsMessages, formMessages, platformMessages } from 'globalMessages'
import { MutableRefObject, ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import * as yup from 'yup'

export interface FormValues {
  phone: string
  medium: string
}

interface Props {
  initialvalues?: FormValues
  onSubmit: (
    values: FormValues,
    formikHelpers?: FormikHelpers<FormValues>
  ) => Promise<void>
  formikRef?: MutableRefObject<FormikContextType<FormValues> | undefined>
}

const OverflowLineForm = ({
  initialvalues,
  onSubmit,
  formikRef
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  const fields: Array<Field<FormValues>> = [
    {
      type: 'text',
      name: 'phone',
      options: {
        label: formatMessage(platformMessages.phoneLine),
        placeholder: formatMessage(formMessages.phonePlaceholder),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    },
    {
      type: 'select',
      name: 'medium',
      options: {
        clearable: false,
        items: [
          { value: '001', label: 'ETSI' },
          { value: '002', label: 'FXS/XO' }
        ],
        textField: 'label',
        valueField: 'value',
        label: formatMessage(platformMessages.acquisitionMedium),
        requiredMarker: true
      },
      breakpoints: { xs: 12 }
    }
  ]

  const validationSchema = yup.object({
    phone: yup
      .string()
      .required(formatMessage(formMessages.required))
      .length(10, formatMessage(formMessages.length, { length: 10 })),
    medium: yup.string().required(formatMessage(formMessages.required))
  })

  const formikConfig = useMemo<FormikConfig<FormValues>>(
    () => ({
      initialValues: {
        phone: initialvalues?.phone ?? '',
        medium: initialvalues?.medium ?? ''
      },
      validationSchema,
      onSubmit,
      enableReinitialize: true
    }),
    [initialvalues]
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

export default OverflowLineForm
