import Typography from 'components/Typography'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import * as yup from 'yup'
import { FormikConfig } from 'formik'
import Form from 'components/Form'
import { Field } from 'types/form'

interface FormValues {
  name: string
}

interface Props {
  onAccept: (data: FormValues) => Promise<void>
  subtitle: string
  initialValues?: FormValues
}

const CompanyDrawer = (props: Props): ReactElement => {
  const { subtitle, onAccept, initialValues = { name: '' } } = props
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    name: yup.string().required(formatMessage(formMessages.required))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues,
    onSubmit: async (values) => {
      console.log(values)
      await onAccept(values)
    },
    validationSchema
  }

  const fields = useMemo<Field[]>(
    () => [
      {
        type: 'text',
        name: 'name',
        options: {
          id: 'name',
          label: formatMessage(mediaMessages.carrierName),
          placeholder: formatMessage(mediaMessages.carrierNamePlaceholder)
        }
      }
    ],
    []
  )

  return (
    <div className="w-96">
      <Typography>{subtitle}</Typography>
      <Form
        className="mt-4"
        fields={fields}
        formikConfig={formikConfig}
        submitButtonPosition="right"
        submitButtonProps={{
          color: 'primary',
          variant: 'contained'
        }}
        submitButtonLabel={formatMessage(actionsMessages.save)}
      />
    </div>
  )
}

export default CompanyDrawer