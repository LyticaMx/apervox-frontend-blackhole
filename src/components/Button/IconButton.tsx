import { ReactElement, ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  className?: string
  type?: 'button' | 'submit' | 'reset'
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
  variant?: 'text' | 'outlined' | 'contained'
  margin?: 'none' | 'normal' | 'dense'
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
}

const IconButton = ({
  className,
  type = 'button',
  color = 'base',
  variant = 'text',
  margin = 'normal',
  ...props
}: Props): ReactElement => {
  const marginClasses = {
    none: 'm-0',
    normal: 'm-1',
    dense: 'm-2'
  }

  const variantColors = {
    text: {
      base: 'text-slate-500 hover:enabled:bg-slate-100 focus:ring-slate-500',
      red: 'text-red-500 hover:enabled:bg-red-100 focus:ring-red-500',
      yellow:
        'text-yellow-500 hover:enabled:bg-yellow-100 focus:ring-yellow-500',
      orange:
        'text-orange-500 hover:enabled:bg-orange-100 focus:ring-orange-500',
      green: 'text-green-500 hover:enabled:bg-green-100 focus:ring-green-500',
      cyan: 'text-cyan-500 hover:enabled:bg-cyan-100 focus:ring-cyan-500',
      sky: 'text-sky-500 hover:enabled:bg-sky-100 focus:ring-sky-500',
      blue: 'text-blue-500 hover:enabled:bg-blue-100 focus:ring-blue-500',
      indigo:
        'text-indigo-500 hover:enabled:bg-indigo-100 focus:ring-indigo-500',
      purple:
        'text-purple-500 hover:enabled:bg-purple-100 focus:ring-purple-500'
    },
    outlined: {
      base: 'border border-slate-500 text-slate-500 hover:enabled:bg-slate-100 focus:ring-slate-500',
      red: 'border border-red-500 text-red-500 hover:enabled:bg-red-100 focus:ring-red-500',
      yellow:
        'border border-yellow-500 text-yellow-500 hover:enabled:bg-yellow-100 focus:ring-yellow-500',
      orange:
        'border border-orange-500 text-orange-500 hover:enabled:bg-orange-100 focus:ring-orange-500',
      green:
        'border border-green-500 text-green-500 hover:enabled:bg-green-100 focus:ring-green-500',
      blue: 'border border-blue-500 text-blue-500 hover:enabled:bg-blue-100 focus:ring-blue-500',
      indigo:
        'border border-indigo-500 text-indigo-500 hover:enabled:bg-indigo-100 focus:ring-indigo-500',
      purple:
        'border border-purple-500 text-purple-500 hover:enabled:bg-purple-100 focus:ring-purple-500',
      sky: 'border border-sky-500 text-sky-500 hover:enabled:bg-sky-100 focus:ring-sky-500'
    },
    contained: {
      base: 'bg-slate-500 text-white hover:enabled:bg-slate-600 focus:ring-slate-500',
      red: 'bg-red-500 text-white hover:enabled:bg-red-600 focus:ring-red-500',
      yellow:
        'bg-yellow-500 text-white hover:enabled:bg-yellow-600 focus:ring-yellow-500',
      orange:
        'bg-orange-500 text-white hover:enabled:bg-orange-600 focus:ring-orange-500',
      green:
        'bg-green-500 text-white hover:enabled:bg-green-600 focus:ring-green-500',
      cyan: 'bg-cyan-500 text-white hover:enabled:bg-cyan-600 focus:ring-cyan-500',
      sky: 'bg-sky-500 text-white hover:enabled:bg-sky-600 focus:ring-sky-500',
      blue: 'bg-blue-500 text-white hover:enabled:bg-blue-600 focus:ring-blue-500',
      indigo:
        'bg-indigo-500 text-white hover:enabled:bg-indigo-600 focus:ring-indigo-500',
      purple:
        'bg-purple-500 text-white hover:enabled:bg-purple-600 focus:ring-purple-500'
    }
  }

  return (
    <button
      type={type}
      className={clsx(
        className,
        marginClasses[margin],
        variantColors[variant][color],
        'flex rounded-full items-center justify-center p-1.5 h-max disabled:opacity-75 disabled:cursor-not-allowed'
      )}
      {...props}
    />
  )
}

export default IconButton
