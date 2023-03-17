import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { mediaMessages } from '../messages'
import * as yup from 'yup'

interface FormValues {
  name: string
  media: string
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
    name: yup.string().required(formatMessage(formMessages.required)),
    media: yup.string().required(formatMessage(formMessages.required))
  })

  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        type: 'select',
        name: 'media',
        options: {
          clearable: false,
          items: [
            {
              text: 'ETSI',
              value: 'etsi'
            },
            {
              text: 'FXS/FXSO',
              value: 'fxs/fxso'
            }
          ],
          textField: 'text',
          valueField: 'value',
          label: formatMessage(mediaMessages.mediaName),
          placeholder: formatMessage(mediaMessages.mediaNamePlaceholder),
          optionsContainerClassname: 'w-[95%]'
        }
      },
      {
        type: 'text',
        name: 'name',
        options: {
          id: 'name',
          label: formatMessage(mediaMessages.deviceName),
          placeholder: formatMessage(mediaMessages.deviceNamePlaceholder)
        }
      }
    ],
    []
  )

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    onSubmit: async (values) => {
      console.log(values)
      onAccept(values)
    },
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
