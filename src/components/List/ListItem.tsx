import clsx from 'clsx'
import { MouseEvent, ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
  onClick?: (e?: MouseEvent) => void
  dense?: boolean
}
const ListItem = ({ children, onClick, dense }: Props): ReactElement => {
  return (
    <li
      className={clsx(
        'flex w-full relative text-left items-center justify-start px-4 transition-colors duration-300 transform',
        {
          'hover:bg-gray-100 cursor-pointer': !!onClick,
          'py-2': !dense,
          'py-1': dense
        }
      )}
      onClick={onClick}
    >
      {children}
    </li>
  )
}

export default ListItem
