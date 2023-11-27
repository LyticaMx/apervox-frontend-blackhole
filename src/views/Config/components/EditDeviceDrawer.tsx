import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { mediaMessages } from '../messages'
import * as yup from 'yup'
import { simpleText } from 'utils/patterns'

interface FormValues {
  id?: string
  medium_id: string
  name: string
  medium: any
}

interface Props {
  onAccept: (data: FormValues) => Promise<void>
  subtitle: string
  initialValues: FormValues
}

const EditDeviceDrawer = (props: Props): ReactElement => {
  const { subtitle, onAccept, initialValues } = props
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(formatMessage(formMessages.required))
      .matches(simpleText, formatMessage(formMessages.invalidSimpleText)),
    medium: yup.object().test({
      name: 'ifRequired',
      message: formatMessage(formMessages.required),
      test: (value) => !!value
    })
  })

  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        name: 'medium',
        type: 'async-select',
        options: {
          label: formatMessage(mediaMessages.mediaName),
          asyncProps: {
            api: { endpoint: 'acquisition-mediums', method: 'get' },
            value: 'id',
            label: 'name',
            searchField: 'name'
          },
          debounceTimeout: 300,
          placeholder: formatMessage(mediaMessages.mediaNamePlaceholder),
          requiredMarker: true
        }
      },
      {
        type: 'text',
        name: 'name',
        options: {
          id: 'name',
          label: formatMessage(mediaMessages.deviceName),
          placeholder: formatMessage(mediaMessages.deviceNamePlaceholder),
          requiredMarker: true
        }
      }
    ],
    []
  )

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    onSubmit: async (values) => await onAccept(values),
    validationSchema
  }

  return (
    <div className="w-96">
      <Typography>{subtitle}</Typography>
      <Form
        className="mt-4"
        fields={fields}
        formikConfig={formikConfig}
        submitButtonLabel={formatMessage(actionsMessages.save)}
        submitButtonPosition="right"
        submitButtonProps={{
          color: 'primary',
          variant: 'contained',
          className: 'mt-4'
        }}
      />
    </div>
  )
}

export default EditDeviceDrawer
