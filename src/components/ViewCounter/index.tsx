import Typography from 'components/Typography'
import { ReactElement, ReactNode, useCallback } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  to?: string
  onClick?: () => void
  count?: number
  children: ReactNode
}
const ViewCounter = ({ children, to, count, onClick }: Props): ReactElement => {
  const Component = useCallback(
    (props) => (
      <Typography
        variant="subtitle"
        style="semibold"
        className="uppercase text-secondary text-base"
        {...props}
      >
        {children}
        <span className="text-primary px-2 py-0.5 rounded bg-background-secondary ml-2 font-normal">
          {count}
        </span>
      </Typography>
    ),
    [count]
  )

  if (to) {
    return (
      <Link to={to}>
        <Component />
      </Link>
    )
  }

  return <Component onClick={onClick} />
}

export default ViewCounter
