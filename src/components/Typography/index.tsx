import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

interface Props {
  variant?: 'caption' | 'body2' | 'body1' | 'subtitle' | 'title' | 'header'
  style?: 'light' | 'medium' | 'normal' | 'italic' | 'semibold' | 'bold'
  className?: string
  children: ReactNode
}

const Typography = ({
  variant = 'body1',
  style = 'normal',
  className,
  children
}: Props): ReactElement => {
  const variantClasses = {
    caption: 'text-xs',
    body2: 'text-sm',
    body1: 'text-base',
    subtitle: 'text-lg',
    title: 'text-xl',
    header: 'text-2xl'
  }

  const styleClasses = {
    light: 'font-light',
    medium: 'font-medium',
    normal: 'font-normal',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  return (
    <p
      className={clsx(variantClasses[variant], styleClasses[style], className)}
    >
      {children}
    </p>
  )
}

export default Typography
