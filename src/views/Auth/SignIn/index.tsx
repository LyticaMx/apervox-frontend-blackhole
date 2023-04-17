import { ReactElement, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { FormikConfig } from 'formik'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'context/Auth'
import { signInMessages } from './mesages'
import { formMessages } from 'globalMessages'
import { Images } from 'assets/Images'
import Typography from 'components/Typography'
import * as yup from 'yup'
import { Field } from 'types/form'
import Form from 'components/Form'
import ForgotPasswordDialog from './components/ForgotPasswordDialog'
import CountdownRing from 'components/CountdownRing'
import WindowControl from 'components/Layout/WindowControl'

interface FormValues {
  user: string
  password: string
}

const SignIn = (): ReactElement => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [lockLogin, setLockLogin] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const history = useHistory()
  const { actions } = useAuth()

  const validationSchema = yup.object({
    user: yup.string().required(formatMessage(formMessages.required)),
    password: yup.string().required(formatMessage(formMessages.required))
  })

  const config: FormikConfig<FormValues> = {
    initialValues: {
      user: '',
      password: ''
    },
    onSubmit: async (values) => {
      const successLogin = await actions?.signIn({
        user: values.user,
        password: values.password
      })

      if (successLogin) {
        history.push('/tablero-de-hablantes')
      } else {
        setLockLogin(true)
      }
    },
    validationSchema
  }

  const fields = useMemo<Array<Field<FormValues>>>(
    () => [
      {
        type: 'text',
        name: 'user',
        options: {
          id: 'user',
          label: formatMessage(formMessages.username),
          placeholder: formatMessage(signInMessages.userPlaceholder),
          labelClassname: 'text-white'
        }
      },
      {
        type: 'password',
        name: 'password',
        options: {
          id: 'password',
          label: formatMessage(formMessages.password),
          placeholder: formatMessage(signInMessages.passwordPlaceholder),
          labelClassname: 'text-white'
        }
      }
    ],
    []
  )

  return (
    <div className="bg-blackhole w-screen h-screen bg-no-repeat bg-center bg-cover overflow-hidden relative before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#131B28] before:bg-opacity-[85%] flex items-center justify-center">
      <WindowControl className="absolute top-0 right-0 py-2" />
      <ForgotPasswordDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      {lockLogin && (
        <div className="absolute left-4 top-4 flex items-center">
          <CountdownRing
            time={300}
            onFinish={() => setLockLogin(false)}
            fullTime={false}
          />
          <Typography className="md:ml-3 text-white">
            {formatMessage(signInMessages.timeToWaitForLogin)}
          </Typography>
        </div>
      )}
      <div className="flex items-center justify-center flex-col z-[1] w-96">
        <img src={Images.Producto} alt="producto" />
        <Typography className="text-white my-4">
          {formatMessage(signInMessages.description)}
        </Typography>
        <Form
          fields={fields}
          formikConfig={config}
          className="w-full"
          submitButtonLabel={formatMessage(signInMessages.logIn)}
          submitButtonPosition="right"
          submitButtonProps={{
            variant: 'contained',
            className: 'mt-4',
            color: 'primary',
            disabled: lockLogin
          }}
        />
        <div className="mt-8">
          <button className="text-white" onClick={() => setOpenDialog(true)}>
            {formatMessage(signInMessages.forgotPassword)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
