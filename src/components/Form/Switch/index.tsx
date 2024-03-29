import { ReactElement } from 'react'
import { Switch as SwitchHL } from '@headlessui/react'
import clsx from 'clsx'
import { backgroudColorClassNames } from 'utils/classes'

export interface Props {
  value?: boolean
  disabled?: boolean
  onChange?: (value: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  color?: string
  stopPropagation?: boolean
}
const Switch = ({
  size = 'md',
  color = 'gray',
  value,
  onChange,
  disabled,
  stopPropagation = false
}: Props): ReactElement => {
  const colorClass =
    backgroudColorClassNames[color] ?? backgroudColorClassNames.gray
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-12'
  }
  const toggleSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  return (
    <SwitchHL
      checked={value}
      disabled={disabled}
      onChange={onChange}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation()
      }}
      className={clsx(
        'inline-flex items-center justify-center rounded-full transition delay-300 p-1 relative',
        {
          [colorClass]: value,
          'bg-gray-200': !value
        },
        sizeClasses[size]
      )}
    >
      <span
        className={clsx(
          'absolute inline-block transform rounded-full bg-white transition delay-300',
          {
            'translate-x-1/2': value,
            '-translate-x-1/2': !value
          },
          toggleSizeClasses[size]
        )}
      />
    </SwitchHL>
  )
}

export default Switch
