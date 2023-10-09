import { LockClosedIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { messages } from './messages'

const WrongPermissions = (): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-4">
      <LockClosedIcon className="w-8 h-8 text-primary" />
      <Typography style="semibold">
        {formatMessage(messages.badPermissions)}
      </Typography>
    </div>
  )
}

export default WrongPermissions
