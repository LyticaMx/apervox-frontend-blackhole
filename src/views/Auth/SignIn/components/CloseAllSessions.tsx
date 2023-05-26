import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Dialog from 'components/Dialog'
import Typography from 'components/Typography'
import { actionsMessages, formMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { closeAllSessionsMessages } from '../mesages'
import { SignedIn } from 'types/auth'
import Form from 'components/Form'
import { useAuth } from 'context/Auth'
import * as yup from 'yup'

interface Props {
  open: boolean
  user: string
  onClose: () => void
  onAccept: (signedIn: SignedIn) => void
}

interface FormValues {
  password: string
}

const CloseAllSessions = (props: Props): ReactElement => {
  const { open, onClose, onAccept, user } = props
  const { formatMessage } = useIntl()
  const { actions: authActions } = useAuth()

  const handleSubmit = async (values: FormValues): Promise<void> => {
    onAccept(
      (await authActions?.closeAllSessions({
        user,
        password: values.password
      })) ?? { firstLogin: false, successLogin: false }
    )
  }

  return (
    <Dialog open={open} onClose={onClose} size="md">
      <div className="flex justify-center items-center flex-col">
        <InformationCircleIcon className="w-5 h-5 text-primary" />
        <Typography style="semibold" className="mt-2 text-center">
          {formatMessage(closeAllSessionsMessages.title)}
        </Typography>
        <Typography className="mt-2 text-center">
          {formatMessage(closeAllSessionsMessages.description)}
        </Typography>
        <Form
          className="mt-2 w-9/12"
          fields={[
            {
              type: 'password',
              name: 'password',
              options: {
                id: 'password',
                label: formatMessage(formMessages.password),
                requiredMarker: true
              }
            }
          ]}
          formikConfig={{
            initialValues: { password: '' },
            onSubmit: handleSubmit,
            validationSchema: yup.object({
              password: yup
                .string()
                .required(formatMessage(formMessages.required))
            })
          }}
          submitButtonPosition="center"
          buttons={
            <div className="mt-4">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className="mr-2"
              >
                {formatMessage(actionsMessages.accept)}
              </Button>
              <Button
                color="secondary"
                variant="contained"
                type="reset"
                onClick={onClose}
              >
                {formatMessage(actionsMessages.cancel)}
              </Button>
            </div>
          }
        />
      </div>
    </Dialog>
  )
}

export default CloseAllSessions
