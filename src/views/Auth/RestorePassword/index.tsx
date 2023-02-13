import { Images } from 'assets/Images'
import Form from 'components/Form'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { FormikConfig } from 'formik'
import { generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { Field } from 'types/form'
import { messages } from './messages'

interface FormValues {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

const RestorePassword = (): ReactElement => {
  const { formatMessage } = useIntl()

  const formikConfig: FormikConfig<FormValues> = {
    initialValues: {
      confirmPassword: '',
      newPassword: '',
      oldPassword: ''
    },
    onSubmit: (values) => {
      console.log(values)
    }
  }

  const fields: Field[] = [
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
        labelClassname: 'text-white'
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

  return (
    <div className="bg-blackhole w-screen h-screen bg-no-repeat bg-center bg-cover overflow-hidden relative before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#131B28] before:bg-opacity-[85%] flex items-center justify-center">
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
