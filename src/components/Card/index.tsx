import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  padding?: 'none' | 'normal'
}

const Card = ({
  children,
  padding = 'normal',
  className = ''
}: Props): ReactElement => {
  const paddingClasses = {
    none: 'p-0',
    normal: 'p-5'
  }

  return (
    <div
      className={clsx(
        className,
        paddingClasses[padding],
        'w-full border shadow ring-1 ring-black ring-opacity-5 md:rounded'
      )}
    >
      {children}
    </div>
  )
}

export default Card
