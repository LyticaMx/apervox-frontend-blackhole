import Form from 'components/Form'
import { FormikConfig, FormikContextType, FormikHelpers } from 'formik'
import {
  actionsMessages,
  formMessages,
  generalMessages,
  platformMessages
} from 'globalMessages'
import { MutableRefObject, ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { phoneNumber } from 'utils/patterns'
import * as yup from 'yup'

export interface FormValues {
  phone: string
  medium: any
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
      name: 'medium',
      type: 'async-select',
      options: {
        label: formatMessage(platformMessages.acquisitionMedium),
        loadingMessage: () => `${formatMessage(generalMessages.loading)}...`,
        noOptionsMessage: () => formatMessage(generalMessages.noOptions),
        asyncProps: {
          api: { endpoint: 'acquisition-mediums', method: 'get' },
          value: 'id',
          label: 'name',
          searchField: 'name'
        },
        debounceTimeout: 300,
        placeholder: '',
        requiredMarker: true
      }
    },
    {
      type: 'text',
      name: 'phone',
      options: {
        label: formatMessage(platformMessages.phoneLine),
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
      .matches(phoneNumber, {
        message: formatMessage(formMessages.invalidPhoneNumber),
        name: 'onlyNumbers'
      }),
    medium: yup.object().test({
      name: 'ifRequired',
      message: formatMessage(formMessages.required),
      test: (value) => !!value
    })
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
