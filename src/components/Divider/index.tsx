import { ReactElement } from 'react'

interface Props {
  title: string
}

const Divider = ({ title }: Props): ReactElement => {
  return (
    <div className="relative flex py-5 items-center">
      <div className="flex-grow border-t border-gray-400"></div>
      <span className="flex-shrink mx-4 text-gray-400">{title}</span>
      <div className="flex-grow border-t border-gray-400"></div>
    </div>
  )
}

export default Divider
