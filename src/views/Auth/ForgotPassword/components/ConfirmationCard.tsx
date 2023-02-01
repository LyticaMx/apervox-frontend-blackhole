import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { CheckIcon } from '@heroicons/react/24/outline'

import Button from 'components/Button'
import Card from 'components/Card'
import Typography from 'components/Typography'
import { pathRoute } from 'router/routes'
import { useIntl } from 'react-intl'
import { messages } from '../messages'

const ConfirmationCard = (): ReactElement => {
  const history = useHistory()
  const { formatMessage } = useIntl()

  return (
    <Card className="w-96 px-14 py-9 bg-white flex flex-col items-center">
      <div className="w-16 h-16 p-4 rounded-full bg-green-200">
        <CheckIcon className="w-full text-green-700" />
      </div>
      <Typography style="bold" className="mt-5">
        {formatMessage(messages.successfullSend)}
      </Typography>
      <Typography variant="body2" className="text-center text-slate-500 mt-5">
        {formatMessage(messages.checkYourMail)}
      </Typography>
      <Button
        className="text-white mt-5"
        variant="contained"
        color="indigo"
        fullwidth
        onClick={() => history.push(pathRoute.auth.signIn)}
      >
        {formatMessage(messages.goToLogin)}
      </Button>
    </Card>
  )
}

export default ConfirmationCard
