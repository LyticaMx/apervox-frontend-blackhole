import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import Typography from 'components/Typography'
import { useAuth } from 'context/Auth'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router'
import { messages } from '../messages'

interface Props {
  clearError: () => void
}

const Error = (props: Props): ReactElement => {
  const { auth } = useAuth()
  const history = useHistory()
  const { formatMessage } = useIntl()

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="max-w-md">
        <div className="flex items-center justify-center gap-4">
          <ExclamationTriangleIcon className="w-10 text-red-500" />
          <Typography variant="title">
            {formatMessage(messages.title)}
          </Typography>
        </div>
        <Typography className="text-center my-2">
          {formatMessage(messages.subtitle)}
        </Typography>
        <div className="text-center">
          <Button
            onClick={() => {
              if (history.location.pathname === '&&') props.clearError()
              history.push('/mi-cuenta')
            }}
            color="primary"
          >
            {auth.isLogguedIn
              ? formatMessage(messages.gotToMyAccount)
              : formatMessage(messages.goToLogin)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Error
