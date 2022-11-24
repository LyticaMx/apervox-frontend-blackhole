import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'
import { useHistory } from 'react-router-dom'

import TextField from 'components/Form/Textfield'
import Button from 'components/Button'
import Link from 'components/Link'

import { useAuth } from 'context/Auth'

import TextLogo from 'assets/Icons/VoiceprintLogo'

import { pathRoute } from 'router/routes'
import { formMessages } from 'messages'
import { signInMessages } from './mesages'

interface FormValues {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

const SignIn = (): ReactElement => {
  const intl = useIntl()
  const history = useHistory()
  const { actions } = useAuth()

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {}

    if (!values.email) {
      errors.email = intl.formatMessage(formMessages.required)
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = intl.formatMessage(formMessages.invalidEmail)
    }

    if (!values.password) {
      errors.password = intl.formatMessage(formMessages.required)
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: async (values) => {
      const successLogin = await actions?.signIn(values)

      if (successLogin) {
        history.push('/')
      }
    }
  })

  return (
    <div>
      <div className="flex flex-col">
        <TextLogo />
        <div className="mt-20">
          <h2 className="text-lg font-semibold text-gray-900">
            {intl.formatMessage(signInMessages.signInToAccount)}
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            {intl.formatMessage(signInMessages.dontHaveAnAccount)}
            <span className="px-1">
              <Link to={pathRoute.auth.signUp}>
                {intl.formatMessage(signInMessages.request)}
              </Link>
            </span>
            {intl.formatMessage(signInMessages.anAccount)}
          </p>
        </div>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: '100%' }}
        action="#"
        className="mt-10 grid grid-cols-1 gap-y-8"
      >
        <TextField
          label={intl.formatMessage(formMessages.email)}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
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
        <TextField
          label={intl.formatMessage(formMessages.password)}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
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
        <div>
          <Button
            type="submit"
            variant="contained"
            className="w-full bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500"
          >
            <span>
              Ingresar <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
