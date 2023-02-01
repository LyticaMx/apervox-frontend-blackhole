import clsx from 'clsx'
import { ReactElement, ReactNode } from 'react'

export type Variant =
  | 'caption'
  | 'body2'
  | 'body1'
  | 'subtitle'
  | 'title'
  | 'header'
export type Style =
  | 'light'
  | 'medium'
  | 'normal'
  | 'italic'
  | 'semibold'
  | 'bold'

interface Props {
  variant?: Variant
  style?: Style
  className?: string
  noWrap?: boolean
  children: ReactNode
}

const Typography = ({
  variant = 'body1',
  style = 'normal',
  className,
  children,
  noWrap
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
      className={clsx(
        variantClasses[variant],
        styleClasses[style],
        className,
        noWrap && 'truncate'
      )}
    >
      {children}
    </p>
  )
}

export default Typography
