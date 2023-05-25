import Form from 'components/Form'
import Typography from 'components/Typography'
import { FormikConfig } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { mediaMessages } from '../messages'
import * as yup from 'yup'

interface FormMedium {
  id?: string
  name: string
}

interface FormDevice {
  id?: string
  name: string
  medium: any
  medium_id?: string
}

const initialsValues = {
  media: { name: '' },
  device: { medium_id: '', name: '' }
}

interface Props<T> {
  onAccept: (data: T) => Promise<void>
  formType: 'media' | 'device'
}

const MediaDrawer = <FormValues extends FormMedium | FormDevice>(
  props: Props<FormValues>
): ReactElement => {
  const { onAccept } = props
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required)),
    medium: yup.object().test({
      name: 'ifRequired',
      message: formatMessage(formMessages.required),
      test: (value) => !!value || props.formType === 'media'
    })
  })

  const fields = useMemo<Array<Field<FormValues>>>(() => {
    if (props.formType === 'media') {
      return [
        {
          type: 'text',
          name: 'name',
          options: {
            id: 'name',
            label: formatMessage(mediaMessages.mediaName),
            placeholder: formatMessage(mediaMessages.mediaNamePlaceholder)
          }
        }
      ]
    }

    return [
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
          placeholder: formatMessage(mediaMessages.deviceNamePlaceholder)
        }
      }
    ]
  }, [props.formType])

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: initialsValues[props.formType] as FormValues,
    onSubmit: async (values) => {
      onAccept(values)
    },
    validationSchema
  }

  return (
    <div className="w-96">
      <Typography>
        {formatMessage(mediaMessages.completeToAddMediaOrDevice, {
          type: props.formType
        })}
      </Typography>
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

export default MediaDrawer
