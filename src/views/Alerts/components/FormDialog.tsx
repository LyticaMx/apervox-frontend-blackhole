import { ReactElement, useEffect } from 'react'
import { useFormik } from 'formik'
import Dialog from 'components/Dialog'
import SelectField from 'components/Form/Select'
import Button from 'components/Button'
import { useIntl } from 'react-intl'
import { alertMessages } from '../messages'
import { formMessages, generalMessages } from 'globalMessages'
import * as yup from 'yup'
import TextField from 'components/Form/Textfield'

interface FormValues {
  category: string
  condition: string
  value: string
}
interface Props {
  open?: boolean
  onClose?: () => void
  onSubmit?: (values: FormValues) => void
}

const FormDialog = (props: Props): ReactElement => {
  const { open = true, onSubmit = () => {}, onClose = () => {} } = props
  const { formatMessage } = useIntl()

  const validationSchema = yup.object({
    category: yup.string().required(),
    value: yup
      .string()
      .required(formatMessage(formMessages.required))
      .when('category', {
        is: 'SIMILARITY',
        then: (schema) =>
          schema.test('similarity-test', '', function (value) {
            const parsed = parseFloat(value ?? '')
            if (isNaN(parsed)) {
              return this.createError({
                message: formatMessage(formMessages.mustBeNumber)
              })
            }
            if (parsed < 50) {
              return this.createError({
                message: formatMessage(formMessages.minValue, { value: 50 })
              })
            }
            if (parsed > 100) {
              return this.createError({
                message: formatMessage(formMessages.maxValue, { value: 100 })
              })
            }
            return true
          })
      })
      .when('category', {
        is: 'DURATION',
        then: (schema) =>
          schema.test('duration-text', '', function (value) {
            if (!/^(\d+|\d+\.\d+)$/.test(value ?? '')) {
              return this.createError({
                message: formatMessage(formMessages.mustBeNumber)
              })
            }
            const parsed = parseFloat(value ?? '')
            if (isNaN(parsed)) {
              return this.createError({
                message: formatMessage(formMessages.mustBeNumber)
              })
            }
            if (parsed < 0) {
              return this.createError({
                message: formatMessage(formMessages.minValue, { value: 0 })
              })
            }
            return true
          })
      })
      .when('category', {
        is: 'HOUR',
        then: (schema) =>
          schema.matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
            message: formatMessage(formMessages.hourFormat),
            excludeEmptyString: false
          })
      })
  })

  const formik = useFormik<FormValues>({
    initialValues: {
      category: 'DURATION',
      condition: 'EQUAL',
      value: '85'
    },
    validationSchema,
    onSubmit: (values) => onSubmit({ ...values })
  })

  useEffect(() => {
    if (!open) formik.resetForm()
  }, [open])

  return (
    <Dialog
      title={formatMessage(alertMessages.addAlert)}
      open={open}
      onClose={onClose}
      overflow="visible"
      size="2xl"
    >
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        className="flex mt-6 flex-wrap"
      >
        <div className="w-60 mr-3">
          <SelectField
            label={formatMessage(generalMessages.category)}
            items={[
              {
                value: 'DURATION',
                text: formatMessage(generalMessages.duration)
              },
              {
                value: 'HOUR',
                text: formatMessage(generalMessages.schedule)
              },
              {
                value: 'SIMILARITY',
                text: formatMessage(generalMessages.similarity)
              }
              /*
              Desactivadas temporalmente
              {
                value: 'CONTENT',
                text: formatMessage(generalMessages.content)
              }
              */
            ]}
            value={formik.values.category}
            onChange={async (value) =>
              await formik.setFieldValue('category', value)
            }
          />
        </div>
        <div className="w-40 mr-3">
          <SelectField
            label={formatMessage(generalMessages.condition)}
            items={[
              { value: 'EQUAL', text: '=' },
              { value: 'LESS_THAN', text: '<' },
              { value: 'GREAT_THAN', text: '>' },
              { value: 'LESS_EQUAL', text: '<=' },
              { value: 'GREAT_EQUAL', text: '>=' },
              { value: 'NOT', text: '!=' }
              // { value: 'IN', text: 'in' } Desactivadas temporalmente
            ]}
            value={formik.values.condition}
            onChange={async (value) =>
              await formik.setFieldValue('condition', value)
            }
          />
        </div>
        <div className="w-40">
          <TextField
            label={formatMessage(generalMessages.value)}
            labelSpacing="1"
            id="value"
            name="value"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.value}
            error={Boolean(formik.errors.value && formik.touched.value)}
            helperText={
              formik.errors.value && formik.touched.value
                ? formik.errors.value
                : ''
            }
          />
        </div>
        <div className="w-full mt-3 flex justify-end">
          <Button type="submit" variant="contained" color="indigo">
            {formatMessage(generalMessages.create)}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default FormDialog
