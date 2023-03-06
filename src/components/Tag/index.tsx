import { ReactElement } from 'react'
import clsx from 'clsx'

import { XMarkIcon } from '@heroicons/react/24/outline'

import Typography, { Variant } from 'components/Typography'

export interface Props {
  label: string
  className?: string
  labelColorClassName?: string
  roundedClassName?: string
  variant?: Variant
  removeAction?: () => void
}

const Chip = ({
  label,
  className,
  labelColorClassName = 'text-gray-500',
  roundedClassName = 'rounded-full',
  variant = 'body1',
  removeAction
}: Props): ReactElement => {
  const iconSize = {
    caption: 'w-2.5',
    body2: 'w-3',
    body1: 'w-4'
  }

  const paddingClassName = {
    caption: 'py-1 px-1.5',
    body2: 'py-1.5 px-3',
    body1: 'py-2 px-4'
  }

  return (
    <div
      className={clsx(
        className,
        labelColorClassName,
        roundedClassName,
        paddingClassName[variant] ?? paddingClassName.body1,
        'flex items-center h-max w-max bg-gray-100'
      )}
    >
      <Typography variant={variant} noWrap>
        {label}
      </Typography>
      {removeAction && (
        <button
          className={'bg-gray-200 rounded-full h-max p-1 ml-1'}
          onClick={removeAction}
        >
          <XMarkIcon className={clsx(iconSize[variant] ?? iconSize.body1)} />
        </button>
      )}
    </div>
  )
}

export default Chip
