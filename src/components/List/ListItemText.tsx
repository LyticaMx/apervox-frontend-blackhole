import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

export interface Props {
  dense?: boolean
  primary: ReactNode
  secondary?: ReactNode
}
const ListItemText = ({ primary, secondary, dense }: Props): ReactElement => {
  return (
    <div className="my-1">
      <span
        className={clsx('text-gray-600', {
          'text-base': !dense,
          'text-sm': dense
        })}
      >
        {primary}
      </span>
      <p
        className={clsx('text-gray-500', {
          'text-sm': !dense,
          'text-xs': dense
        })}
      >
        {secondary}
      </p>
    </div>
  )
}

export default ListItemText
