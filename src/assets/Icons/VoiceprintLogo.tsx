import clsx from 'clsx'
import { ReactElement } from 'react'

interface Props {
  className?: string
}

const TextLogo = (props: Props): ReactElement => {
  const { className } = props

  return (
    <h1 className={clsx('text-2xl m-0 p-0 font-display font-light', className)}>
      <span className="text-blue-600 font-bold font-display pr-1">Voice</span>
      Print
    </h1>
  )
}

export default TextLogo
