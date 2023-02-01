import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useFormik } from 'formik'

import { PaperAirplaneIcon } from '@heroicons/react/24/outline'

import { useAuth } from 'context/Auth'
import Button from 'components/Button'
import Card from 'components/Card'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'
import { actionsMessages, formMessages } from 'globalMessages'
import { messages } from '../messages'

interface Form {
  email?: string
}

interface Props {
  onSuccess: () => void
}

const FormCard = ({ onSuccess }: Props): ReactElement => {
  const intl = useIntl()
  const { actions } = useAuth()

  const validate = (values: Form): Form => {
    const errors: Form = {}

    if (!values.email) {
      errors.email = intl.formatMessage(formMessages.required)
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(String(values.email))
    ) {
      errors.email = intl.formatMessage(formMessages.invalidEmail)
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validate,
    onSubmit: (values) => {
      fetchForgotPassword(values.email)
    }
  })

  const fetchForgotPassword = async (email: string): Promise<void> => {
    const res = await actions?.forgotPassword(email)

    if (res) {
      onSuccess()
    }
  }

  return (
    <Card className="w-96 px-14 py-8 bg-white flex flex-col items-center">
      <Typography style="bold">
        {intl.formatMessage(messages.recoverPassword)}
      </Typography>
      <Typography variant="body2" className="text-center text-slate-500 mt-5">
        {intl.formatMessage(messages.sendCodeToEmail)}
      </Typography>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          className="w-full mt-5"
          label={intl.formatMessage(formMessages.email)}
          placeholder="correo@apervox.com"
          labelSpacing="1"
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
        <Button
          className="text-white mt-5"
          variant="contained"
          color="indigo"
          fullwidth
          type="submit"
        >
          {intl.formatMessage(actionsMessages.send)}{' '}
          <PaperAirplaneIcon className="w-5 h-5 ml-2" />
        </Button>
      </form>
    </Card>
  )
}

export default FormCard
