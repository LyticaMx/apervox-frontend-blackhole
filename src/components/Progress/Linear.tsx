import { ReactElement, useMemo } from 'react'

interface Props {
  value: number
  max?: number
}

const LinearProgress = ({ value, max = 100 }: Props): ReactElement => {
  const customValue = useMemo(() => (value * 100) / max, [value])

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-300">
      <div
        className="bg-gray-600 h-2.5 rounded-full"
        style={{ width: `${customValue}%` }}
      />
    </div>
  )
}

export default LinearProgress
