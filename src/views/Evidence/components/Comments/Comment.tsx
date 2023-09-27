import { UserCircleIcon } from '@heroicons/react/24/outline'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import { platformMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

interface Props {
  user: string
  target: string
  eventId: string
  date: string
  message: string
  evidenceId: string
}

const Comment = (props: Props): ReactElement => {
  const { user, date, eventId, message, target } = props
  const { formatMessage } = useIntl()

  return (
    <div className="flex items-start gap-2 mb-3 last:mb-0">
      <UserCircleIcon className="w-7 h-7" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Typography style="bold" variant="body2" className="text-secondary">
            {user}
          </Typography>
          <div className="flex gap-6">
            <Typography variant="body2" className="text-secondary-gray">
              {`${formatMessage(platformMessages.target)}: ${target}`}
            </Typography>
            <Typography variant="body2" className="text-secondary-gray">
              {`${formatMessage(platformMessages.eventNumber)}: ${eventId}`}
            </Typography>
            <Typography variant="body2" className="text-secondary-gray">
              {format(new Date(date), 'dd/MM/yyyy - HH:mm')}
            </Typography>
          </div>
        </div>
        <Typography variant="body2" className="text-secondary">
          {message}
        </Typography>
      </div>
    </div>
  )
}

export default Comment
