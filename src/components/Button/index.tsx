import { ReactElement, ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'text' | 'outlined' | 'contained'
  margin?: 'none' | 'normal' | 'dense'
  children: ReactNode
  onClick?: () => void
}

const Button = ({
  className,
  type = 'button',
  size = 'md',
  variant = 'text',
  margin = 'normal',
  ...props
}: Props): ReactElement => {
  const marginClasses = {
    none: 'm-0',
    normal: 'm-1',
    dense: 'm-2'
  }

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const variantClasses = {
    text: 'bg-transparent border-none hover:bg-gray-100',
    outlined: 'bg-transparent border border-gray-200 hover:bg-gray-100',
    contained: 'border-none bg-gray-200 hover:bg-gray-300'
  }

  const defaultColorText = 'text-gray-500'

  return (
    <button
      className={clsx(
        className ?? defaultColorText,
        sizeClasses[size],
        variantClasses[variant],
        marginClasses[margin],
        'flex rounded-md items-cente justify-center px-4 py-2 font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 h-max w-max'
      )}
      {...props}
    />
  )
}

export default Button
