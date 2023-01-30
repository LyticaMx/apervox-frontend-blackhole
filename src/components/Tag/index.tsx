import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Typography from 'components/Typography'
import React, { ReactElement } from 'react'

interface Props {
  label: string
  className?: string
  removeAction?: () => void
}

const Tag = ({ label, className, removeAction }: Props): ReactElement => {
  return (
    <div
      className={clsx(
        'flex items-center py-2 px-4 rounded-full text-sm text-gray-500 bg-gray-100 h-max w-max',
        className
      )}
    >
      <Typography noWrap>{label}</Typography>
      {removeAction && (
        <button
          className="bg-gray-200 rounded-full h-max p-1 ml-1"
          onClick={removeAction}
        >
          <XMarkIcon className="w-4" />
        </button>
      )}
    </div>
  )
}

export default Tag
