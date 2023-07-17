import { ReactElement, ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  color?:
    | 'base'
    | 'red'
    | 'yellow'
    | 'orange'
    | 'green'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'primary'
    | 'secondary'
  variant?: 'text' | 'outlined' | 'contained' | 'tonal'
  margin?: 'none' | 'normal' | 'dense'
  fullwidth?: boolean
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
}

const Button = ({
  className,
  type = 'button',
  size = 'md',
  color = 'base',
  variant = 'text',
  margin = 'none',
  fullwidth = false,
  ...props
}: Props): ReactElement => {
  const marginClasses = {
    none: 'm-0',
    normal: 'm-1',
    dense: 'm-2'
  }

  return (
    <button
      type={type}
      className={clsx(
        'btn',
        variant,
        color,
        size,
        marginClasses[margin],
        className
      )}
      {...props}
    />
  )
}

export default Button
