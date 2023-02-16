import Drawer from 'components/Drawer'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { auditDrawerMessages } from '../messages'

interface Props {
  open: boolean
  onClose: () => void
  action: string
  moduleName: string
  date?: string
  user: string
  change: string
}

const AuditDrawer = (props: Props): ReactElement => {
  const { open, onClose, action, moduleName, date, user, change } = props
  const { formatMessage } = useIntl()

  return (
    <Drawer
      withoutBackdrop
      placement="right"
      open={open}
      onClose={onClose}
      title={
        <span className="text-secondary text-lg uppercase font-extrabold">
          {formatMessage(auditDrawerMessages.auditedMovement)}
        </span>
      }
    >
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
    </Drawer>
  )
}

export default AuditDrawer
