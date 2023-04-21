import clsx from 'clsx'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { platformMessages } from 'globalMessages'
import { Status as StatusEnum, colorByStatus } from 'types/status'
import Typography, { Variant } from 'components/Typography'

type StatusType = typeof StatusEnum[keyof typeof StatusEnum]

interface Props {
  value: StatusType | boolean
  className?: string
  variant?: Variant
}

const StatusTag = ({
  value,
  className,
  variant = 'caption'
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  const realValue =
    typeof value === 'boolean' ? (value ? 'active' : 'inactive') : value

  return (
    <div
      className={clsx(
        className,
        'rounded-full flex items-center px-2 py-1 justify-center w-24',
        `bg-${colorByStatus[realValue]}`
      )}
    >
      <Typography variant={variant} noWrap className="text-white">
        {formatMessage(platformMessages[`${realValue}Status`])}
      </Typography>
    </div>
  )
}

export default StatusTag
