import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
  type?: 'internal' | 'external'
  children: string
  to: string
}

const Link = ({ type = 'internal', children, to }: Props): ReactElement => {
  const history = useHistory()

  const handleClick = (): void => {
    if (type === 'internal') {
      history.push(to)
    } else {
      location.href = to
    }
  }

  return (
    <button onClick={handleClick} className="text-blue-600 font-medium">
      {children}
    </button>
  )
}

export default Link
