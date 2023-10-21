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
  name: string
}

interface Props {
  onAccept: (data: FormValues) => Promise<void>
  subtitle: string
  initialValues: FormValues
}

const EditMediaDrawer = (props: Props): ReactElement => {
  const { subtitle, onAccept, initialValues } = props
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(formatMessage(formMessages.required))
      .matches(simpleText, formatMessage(formMessages.invalidSimpleText))
  })

  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        type: 'text',
        name: 'name',
        options: {
          id: 'name',
          label: formatMessage(mediaMessages.mediaName),
          placeholder: formatMessage(mediaMessages.mediaNamePlaceholder),
          requiredMarker: true
        }
      }
    ],

    []
  )

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    onSubmit: async (values) => {
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

export default EditMediaDrawer
