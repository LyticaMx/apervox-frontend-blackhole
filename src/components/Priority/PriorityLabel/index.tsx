import clsx from 'clsx'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { platformMessages } from 'globalMessages'
import Typography, { Variant, Style } from 'components/Typography'
import { Priority as PriorityEnum, colorByPriority } from 'types/priority'

type PriorityType = typeof PriorityEnum[keyof typeof PriorityEnum]

interface Props {
  value: PriorityType
  className?: string
  badgeClassName?: string
  labelClassName?: string
  variant?: Variant
  style?: Style
}

const PriorityLabel = ({
  value,
  className,
  badgeClassName,
  labelClassName,
  variant = 'body1',
  style = 'medium'
}: Props): ReactElement => {
  const { formatMessage } = useIntl()

  return (
    <div className={clsx(className, 'flex items-center')}>
      <div
        className={clsx(
          badgeClassName,
          'rounded-full mr-2 w-4 h-4',
          `bg-${colorByPriority[value]}`
        )}
      />

      <Typography
        variant={variant}
        className={clsx(labelClassName)}
        style={style}
        noWrap
      >
        {formatMessage(platformMessages[`${value}Priority`])}
      </Typography>
    </div>
  )
}

export default PriorityLabel
