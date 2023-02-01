import { ReactElement, ReactNode } from 'react'
import Typography from 'components/Typography'
import { textColorClassNames } from 'utils/classes'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  variant?: 'page' | 'card'
  color?: string
  className?: string
}
const Title = ({
  children,
  variant = 'page',
  color = 'black',
  className
}: Props): ReactElement => {
  const titleClass = clsx(
    textColorClassNames[color] ?? textColorClassNames.black,
    className
  )

  const Tvariant = variant === 'page' ? 'title' : 'body1'
  const Tstyle = 'semibold'

  return (
    <Typography variant={Tvariant} style={Tstyle} className={titleClass}>
      {children}
    </Typography>
  )
}

export default Title
