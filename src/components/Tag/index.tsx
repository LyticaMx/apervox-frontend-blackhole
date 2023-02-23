import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Typography, { Variant } from 'components/Typography'
import { ReactElement } from 'react'

interface Props {
  label: string
  className?: string
  labelColorClassName?: string
  roundedClassName?: string
  variant?: Variant
  removeAction?: () => void
}

const Tag = ({
  label,
  className,
  labelColorClassName = 'text-gray-500',
  roundedClassName = 'rounded-full',
  variant = 'body1',
  removeAction
}: Props): ReactElement => {
  return (
    <div
      className={clsx(
        className,
        labelColorClassName,
        roundedClassName,
        'flex items-center py-2 px-4 text-sm h-max w-max bg-gray-100'
      )}
    >
      <Typography variant={variant} noWrap>
        {label}
      </Typography>
      {removeAction && (
        <button
          className="bg-gray-200 rounded-full h-max p-1 ml-1"
          onClick={removeAction}
        >
          <XMarkIcon className="w-4" />
        </button>
      )}
    </div>
  )
}

export default Tag
