import { ReactElement } from 'react'

interface Props {
  id: any
  children: string
}

const Label = ({ id, children }: Props): ReactElement => {
  return (
    <label
      htmlFor={id}
      className="mb-3 block text-sm font-medium text-gray-700"
    >
      {children}
    </label>
  )
}

export default Label
