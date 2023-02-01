import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Card from 'components/Card'
import TextField from 'components/Form/Textfield'
import Typography from 'components/Typography'
import { useAuth } from 'context/Auth'
import { useFormik } from 'formik'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import * as yup from 'yup'
import { messages } from '../messages'

interface Props {
  onSuccess: () => void
}

interface RouteParams {
  token: string
}

interface FormValues {
  password: string
  confirmPassword: string
  secureCode: string
}

const RestoreCard = (props: Props): ReactElement => {
  const { onSuccess } = props
  const { formatMessage } = useIntl()
  const { token } = useParams<RouteParams>()
  const { actions } = useAuth()
  const validationSchema = yup.object({
    password: yup.string().required(formatMessage(formMessages.required)),
    confirmPassword: yup
      .string()
      .equals([yup.ref('password')], formatMessage(messages.passwordDontMatch))
      .required(formatMessage(formMessages.required)),
    secureCode: yup
      .number()
      .typeError(formatMessage(formMessages.mustBeNumber))
      .required(formatMessage(formMessages.required))
  })
  const restorePassword = async (values: FormValues): Promise<void> => {
    const { secureCode, password, confirmPassword } = values
    const res = await actions?.restorePassword({
      password,
      confirmPassword,
      token,
      secureCode: parseInt(secureCode, 10)
    })
    if (res) onSuccess()
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      secureCode: ''
    },
    validationSchema,
    onSubmit: restorePassword
  })

  return (
    <Card className="w-96 px-14 py-8 bg-white flex flex-col items-center">
      <Typography style="bold">{formatMessage(messages.title)}</Typography>
      <Typography variant="body2" className="text-center text-gray-500">
        {formatMessage(messages.subtitle)}
      </Typography>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          className="w-full mt-5"
          label={formatMessage(messages.newPassword)}
          id="password"
          name="password"
          type="password"
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
        <TextField
          className="w-full mt-5"
          label={formatMessage(messages.confirmPassword)}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.errors.confirmPassword && formik.touched.confirmPassword
          )}
          helperText={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : ''
          }
        />
        <TextField
          className="w-full mt-5"
          label={formatMessage(messages.secureCode)}
          id="secureCode"
          name="secureCode"
          type="text"
          value={formik.values.secureCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors.secureCode && formik.touched.secureCode)}
          helperText={
            formik.errors.secureCode && formik.touched.secureCode
              ? formik.errors.secureCode
              : ''
          }
        />
        <Button
          className="text-white mt-5"
          variant="contained"
          color="indigo"
          type="submit"
          fullwidth
        >
          {formatMessage(actionsMessages.send)}{' '}
          <PaperAirplaneIcon className="w-5 h-5 ml-2" />
        </Button>
      </form>
    </Card>
  )
}

export default RestoreCard
