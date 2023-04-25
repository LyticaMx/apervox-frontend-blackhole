import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  padding?: 'none' | 'normal'
}

const Card = ({
  children,
  padding = 'normal',
  className = '',
  ...props
}: Props): ReactElement => {
  const paddingClasses = {
    none: 'p-0',
    normal: 'p-5'
  }

  return (
    <div
      className={clsx('card', paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
