import { ReactElement, ReactNode } from 'react'
import Typography from 'components/Typography'
import { textColorClassNames } from 'utils/classes'

interface Props {
  children: ReactNode
  variant?: 'page' | 'card'
  color?: string
}
const Title = ({
  children,
  variant = 'page',
  color = 'black'
}: Props): ReactElement => {
  const titleClass = textColorClassNames[color] ?? textColorClassNames.black

  const Tvariant = variant === 'page' ? 'title' : 'body1'
  const Tstyle = 'semibold'

  return (
    <Typography variant={Tvariant} style={Tstyle} className={titleClass}>
      {children}
    </Typography>
  )
}

export default Title
