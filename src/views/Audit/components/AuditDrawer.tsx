import Typography from 'components/Typography'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'

interface Props {
  action: string
  moduleName: string
  date?: string
  user: string
  change: string
}

const AuditDrawer = (props: Props): ReactElement => {
  const { action, moduleName, date, user, change } = props
  const { formatMessage } = useIntl()

  return (
    <div className="w-96">
      <Typography
        variant="subtitle"
        className="text-primary font-medium uppercase"
      >
        {action}
      </Typography>
      <div className="mt-6 flex items-center justify-between">
        <Typography variant="caption" className="text-black opacity-50">
          {`${formatMessage(generalMessages.module)}: ${moduleName}`}
        </Typography>
        {date && (
          <Typography variant="caption" className="text-primary">
            {format(new Date(date), 'dd/MM/yyyy hh:mm')}
          </Typography>
        )}
      </div>
      <Typography variant="body2" className="text-primary">
        {user}
      </Typography>
      <Typography variant="caption" className="text-secondary">
        {change}
      </Typography>
    </div>
  )
}

export default AuditDrawer
