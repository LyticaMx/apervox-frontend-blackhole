import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

import Button from 'components/Button'
import TextField from 'components/Form/Textfield'
import { FormikProps } from 'formik'

import { formMessages, actionsMessages } from 'messages'
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
          id="lastname"
          name="lastname"
          label={intl.formatMessage(formMessages.lastname)}
          value={formik.values.lastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.lastname && formik.touched.lastname)}
          helperText={
            formik.errors.lastname && formik.touched.lastname
              ? formik.errors.lastname
              : ''
          }
        />
      </div>
      <div className="py-2">
        <TextField
          id="secondLastname"
          name="secondLastname"
          label={intl.formatMessage(formMessages.secondLastname)}
          value={formik.values.secondLastname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.errors.secondLastname && formik.touched.secondLastname
          )}
          helperText={
            formik.errors.secondLastname && formik.touched.secondLastname
              ? formik.errors.secondLastname
              : ''
          }
        />
      </div>
      <div className="pt-10">
        <Button
          type="submit"
          variant="contained"
          className="w-full bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100"
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
