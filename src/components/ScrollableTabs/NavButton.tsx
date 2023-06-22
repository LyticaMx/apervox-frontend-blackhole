import { ReactElement, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const NavButton = (props: Props): ReactElement => {
  const { children } = props
  return <div>{children}</div>
}

export default NavButton
