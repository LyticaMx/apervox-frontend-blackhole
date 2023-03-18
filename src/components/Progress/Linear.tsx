import clsx from 'clsx'
import { ReactElement, useMemo } from 'react'

interface Props {
  value: number
  max?: number
  bgContainer?: string
  bgProgress?: string
  className?: string
}

const LinearProgress = ({
  value,
  max = 100,
  className,
  bgContainer = 'bg-gray-200',
  bgProgress = 'bg-gray-600'
}: Props): ReactElement => {
  const customValue = useMemo(() => (value * 100) / max, [value])

  return (
    <div
      className={clsx(
        'w-ful rounded-full h-2.5 dark:bg-gray-300 overflow-hidden',
        bgContainer,
        className
      )}
    >
      <div
        className={clsx('h-full', bgProgress)}
        style={{ width: `${customValue}%` }}
      />
    </div>
  )
}

export default LinearProgress
