import { ReactElement } from 'react'

interface Props {
  percentage: number
}

const CircularProgress = ({ percentage }: Props): ReactElement => {
  const circumference = 30 * 2 * Math.PI
  return (
    <div className="relative flex justify-center items-center w-max bgvl">
      <svg className="w-20 h-20 absolute">
        <circle
          className="text-gray-300"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
        <circle
          className="text-blue-600"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          //   :stroke-dasharray="circumference"
          //   :stroke-dashoffset="circumference - percent / 100 * circumference"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="40"
          cy="40"
        />
      </svg>
      <span className="absolute text-xl text-blue-700">{`${percentage}%`}</span>
    </div>
  )
}

export default CircularProgress
