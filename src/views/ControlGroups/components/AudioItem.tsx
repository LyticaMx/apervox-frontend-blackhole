import { ReactElement, ReactNode } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'

interface Props {
  children?: ReactNode
  onDelete?: () => void
  onClick?: () => void
}
const AudioItem = ({
  children,
  onClick = () => {},
  onDelete = () => {}
}: Props): ReactElement => {
  return (
    <li
      className='py-2 px-4 w-full border-b border-gray-200 flex justify-between items-center'
      onClick={() => onClick()}
    >
      <span>{children}</span>
      <TrashIcon
        className='h-5 w-5 cursor-pointer text-red-400'
        onClick={(e: any) => {
          onDelete()
          e.stopPropagation()
        }}
      />
    </li>
  )
}

export default AudioItem
