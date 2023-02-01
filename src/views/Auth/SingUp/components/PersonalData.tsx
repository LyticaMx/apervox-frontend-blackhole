import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import { FormikProps } from 'formik'

import { formMessages, actionsMessages } from 'globalMessages'
import { FormValues } from '../index'

interface Props {
  formik: FormikProps<FormValues>
}

const PersonalData = ({ formik }: Props): ReactElement => {
  const intl = useIntl()

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <div className="py-2">
        <TextField
          id="name"
          name="name"
          label={intl.formatMessage(formMessages.name)}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.name && formik.touched.name)}
          helperText={
            formik.errors.name && formik.touched.name ? formik.errors.name : ''
          }
        />
      </div>
      <div className="py-2">
        <TextField
          id="fathers_name"
          name="fathers_name"
          label={intl.formatMessage(formMessages.lastname)}
          value={formik.values.fathers_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.errors.fathers_name && formik.touched.fathers_name
          )}
          helperText={
            formik.errors.fathers_name && formik.touched.fathers_name
              ? formik.errors.fathers_name
              : ''
          }
        />
      </div>
      <div className="py-2">
        <TextField
          id="mothers_name"
          name="mothers_name"
          label={intl.formatMessage(formMessages.secondLastname)}
          value={formik.values.mothers_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.errors.mothers_name && formik.touched.mothers_name
          )}
          helperText={
            formik.errors.mothers_name && formik.touched.mothers_name
              ? formik.errors.mothers_name
              : ''
          }
        />
      </div>
      <div className="pt-10">
        <Button
          type="submit"
          variant="contained"
          className="w-full"
          color="sky"
          fullwidth
        >
          <span>
            {intl.formatMessage(actionsMessages.continue)}
            <span aria-hidden="true" className="ml-2">
              &rarr;
            </span>
          </span>
        </Button>
      </div>
    </form>
  )
}

export default PersonalData
