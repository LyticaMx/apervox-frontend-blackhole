import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { FormikProps } from 'formik'

// import { EnvelopeIcon } from '@heroicons/react/20/solid'

import Button from 'components/Button'
import TextField from 'components/Form/Textfield'

import { actionsMessages, formMessages } from 'messages'
import { FormValues } from '../index'

interface Props {
  formik: FormikProps<FormValues>
}

const Account = ({ formik }: Props): ReactElement => {
  const intl = useIntl()

  return (
    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <div className="py-10">
        <div className="py-2 rounded-md shadow-sm">
          <TextField
            id="email"
            name="email"
            label={intl.formatMessage(formMessages.email)}
            placeholder="usuario@correo.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.email && formik.touched.email)}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ''
            }
          />
        </div>
        <div className="py-2 rounded-md shadow-sm">
          <TextField
            id="password"
            name="password"
            type="password"
            label={intl.formatMessage(formMessages.password)}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors.password && formik.touched.password)}
            helperText={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ''
            }
          />
        </div>
        <div className="mt-10">
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
      </div>
    </form>
  )
}

export default Account
