import { ReactElement } from 'react'
import clsx from 'clsx'

export interface Props {
  id?: string
  label: string
  description?: string
  className?: string
  name?: string
  required?: boolean
  checked?: boolean
  disabled?: boolean
  value: any
  onChange?: (element: any) => any
  onBlur?: (element: any) => any
}

const Radio = ({
  id,
  label,
  description,
  className,
  disabled,
  ...props
}: Props): ReactElement => {
  return (
    <label
      className={clsx(
        'inline-flex  items-start space-x-1.5 cursor-pointer',
        { 'cursor-not-allowed': disabled },
        className
      )}
    >
      <input
        type="radio"
        id={id}
        disabled={disabled}
        {...props}
        className="rounded-full border-gray-300 text-blue-600 transition focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-75"
      />
      <div
        className={clsx(
          'flex  flex-col space-y-1 w-full truncate whitespace-normal text-xs',
          { 'opacity-75': disabled }
        )}
      >
        <span className="font-medium text-gray-900">{label}</span>
        <span className="text-gray-500">{description}</span>
      </div>
    </label>
  )
}

export default Radio
