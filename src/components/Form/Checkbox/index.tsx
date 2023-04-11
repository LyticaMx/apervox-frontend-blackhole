import { ReactElement } from 'react'
import clsx from 'clsx'

export interface Props {
  id?: string
  label?: string
  description?: string
  className?: string
  name?: string
  required?: boolean
  value?: any
  checked?: boolean
  disabled?: boolean
  onChange?: (element: any) => any
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void
  onBlur?: (element: any) => any
  color?:
    | 'base'
    | 'slate'
    | 'red'
    | 'yellow'
    | 'orange'
    | 'green'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'purple'
}

const Checkbox = ({
  id,
  label,
  description,
  className,
  disabled,
  color = 'base',
  ...props
}: Props): ReactElement => {
  const varianColors = {
    base: 'text-gray-900',
    slate: 'text-slate-500',
    red: 'text-red-500',
    yellow: 'text-yellow-500',
    orange: 'text-orange-500',
    green: 'text-green-500',
    cyan: 'text-cyan-500',
    sky: 'text-sky-500',
    blue: 'text-blue-500',
    indigo: 'text-indigo-500',
    purple: 'text-purple-500'
  }

  return (
    <label
      className={clsx(
        'inline-flex items-start space-x-1.5 cursor-pointer',
        { 'cursor-not-allowed': disabled },
        className
      )}
    >
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...props}
        className="rounded border-gray-300 text-primary transition disabled:cursor-not-allowed disabled:opacity-75"
      />
      <div
        className={clsx(
          'flex flex-col space-y-1 w-full truncate whitespace-normal text-xs',
          { 'opacity-75': disabled }
        )}
      >
        <span className={clsx('font-medium', varianColors[color])}>
          {label}
        </span>
        <span className="text-gray-500">{description}</span>
      </div>
    </label>
  )
}

export default Checkbox
