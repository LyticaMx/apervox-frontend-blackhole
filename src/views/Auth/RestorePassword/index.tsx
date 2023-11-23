import { Images } from 'assets/Images'
import Form from 'components/Form'
import Grid from 'components/Grid'
import WindowControl from 'components/Layout/WindowControl'
import Typography from 'components/Typography'
import { FormikConfig } from 'formik'
import { formMessages, generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { messages } from './messages'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import { useAuth } from 'context/Auth'
import { pathRoute } from 'router/routes'

interface LocationState {
  hasLogged: boolean
}
interface FormValues {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const RestorePassword = (): ReactElement => {
  const { state } = useLocation<LocationState>()
  const { formatMessage } = useIntl()
  const { actions } = useAuth()
  const history = useHistory()

  const validationSchema = yup.object({
    oldPassword: yup.string().required(formatMessage(formMessages.required)),
    newPassword: yup
      .string()
      .required(formatMessage(formMessages.required))
      .min(4, formatMessage(formMessages.minLength, { length: 4 }))
      .not(
        [yup.ref('oldPassword')],
        formatMessage(formMessages.oldPasswordCantMatchNewPassword)
      ),
    confirmPassword: yup
      .string()
      .equals(
        [yup.ref('newPassword')],
        formatMessage(formMessages.passwordsNotMatches)
      )
      .required(formatMessage(formMessages.required))
  })

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const changed = await actions?.changePassword(
        values.oldPassword,
        values.newPassword
      )
      if (changed) history.push(pathRoute.auth.userAccount)
    }
  }

  const fields: Array<Field<FormValues>> = [
    {
      type: 'password',
      name: 'oldPassword',
      options: {
        id: 'oldPassword',
        label: formatMessage(messages.oldPassword),
        placeholder: formatMessage(messages.passwordPlaceholder),
        labelClassname: 'text-white'
      }
    },
    {
      type: 'password',
      name: 'newPassword',
      options: {
        id: 'newPassword',
        label: formatMessage(messages.newPassword),
        placeholder: formatMessage(messages.passwordPlaceholder),
        labelClassname: 'text-white',
        passwordStrength: true,
        passwordStrengthScoreWordClassName: '!text-white'
      }
    },
    {
      type: 'password',
      name: 'confirmPassword',
      options: {
        id: 'confirmPassword',
        label: formatMessage(messages.confirmPassword),
        placeholder: formatMessage(messages.passwordPlaceholder),
        labelClassname: 'text-white'
      }
    }
  ]

  if (state.hasLogged) return <Redirect to={'/'} />

  return (
    <div className="bg-blackhole w-screen h-screen bg-no-repeat bg-center bg-cover overflow-hidden relative before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#131B28] before:bg-opacity-[85%] flex items-center justify-center">
      <WindowControl className="absolute top-0 right-0 py-2" />
      <Grid className="z-[1]">
        <Grid
          item
          cols={12}
          md={5}
          className="flex items-center justify-center p-4"
        >
          <img
            src={Images.RestorePassword}
            alt="password"
            className="max-w-[65%] min-w-[300px]"
          />
        </Grid>
        <Grid
          item
          cols={12}
          md={7}
          className="bg-[#00000032] h-[90vh] text-white flex items-center justify-center"
        >
          <div className="w-1/2">
            <img src={Images.Producto} alt="bh_logo" />
            <Typography className="text-5xl tracking-[.28em]">
              {formatMessage(generalMessages.welcome)}
            </Typography>
            <Typography className="my-4">
              {formatMessage(messages.firstTime)}
            </Typography>
            <Form
              formikConfig={formikConfig}
              fields={fields}
              submitButtonPosition="right"
              submitButtonLabel={formatMessage(messages.changePassword)}
              submitButtonProps={{
                color: 'indigo',
                variant: 'contained',
                className: 'mt-8'
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default RestorePassword
