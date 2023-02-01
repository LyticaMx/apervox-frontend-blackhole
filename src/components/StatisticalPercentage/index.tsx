import { ReactElement } from 'react'
import { ArrowSmallUpIcon, ArrowSmallDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

interface Props {
  type: 'up' | 'down'
  percentage: number
  className?: string
}

const StatisticalPercentage = ({
  type,
  percentage,
  className
}: Props): ReactElement => {
  const bgColors = {
    empty: 'bg-slate-200',
    up: 'bg-green-200',
    down: 'bg-red-200'
  }

  const textColors = {
    empty: 'text-slate-600',
    up: 'text-green-600',
    down: 'text-red-600'
  }

  const icons = {
    up: ArrowSmallUpIcon,
    down: ArrowSmallDownIcon
  }

  const Icon = percentage === 0 ? null : icons[type]

  return (
    <div
      className={clsx(
        className,
        'xl:min-w-24 md:min-w-16 xl:px-3 md:px-1.5 xl:py-2 md:py-1 flex justify-center items-center rounded-full',
        percentage === 0 ? bgColors.empty : bgColors[type]
      )}
    >
      {Icon && (
        <Icon
          className={clsx(
            'xl:w-5 xl:h-5 md:w-4 md:h-4 mr-1',
            percentage === 0 ? textColors.empty : textColors[type]
          )}
        />
      )}
      <p
        className={clsx(
          'md:text-xs xl:text-sm',
          percentage === 0 ? textColors.empty : textColors[type]
        )}
      >{`${percentage}%`}</p>
    </div>
  )
}

export default StatisticalPercentage
