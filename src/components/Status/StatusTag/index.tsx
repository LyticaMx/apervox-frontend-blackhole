import clsx from 'clsx'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { Status as StatusEnum, colorByStatus } from 'types/status'
import Typography, { Variant } from 'components/Typography'
import { messages } from './messages'

type StatusType = typeof StatusEnum[keyof typeof StatusEnum]

interface Props {
  value: StatusType
  className?: string
  variant?: Variant
}

const StatusTag = ({
  value,
  className,
  variant = 'caption'
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <div
      className={clsx(
        className,
        'rounded-full flex items-center px-2 py-1 justify-center w-24',
        `bg-${colorByStatus[value]}`
      )}
    >
      <Typography variant={variant} noWrap className="text-white">
        {formatMessage(messages[value])}
      </Typography>
    </div>
  )
}

export default StatusTag
