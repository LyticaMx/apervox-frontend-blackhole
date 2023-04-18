import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
}
const Scroller = ({ children, className }: Props): ReactElement => {
  return (
    <div
      className={clsx('overflow-y-auto min-h-0 flex-1 basis-auto', className)}
    >
      {children}
    </div>
  )
}

export default Scroller
