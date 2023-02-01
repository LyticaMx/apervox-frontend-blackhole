import { ReactElement, useState, useMemo } from 'react'
import StatisticalPercentage from 'components/StatisticalPercentage'
import { useIntl } from 'react-intl'
import { messages } from './messages'

interface Props {
  title: string
  current: number
  prev: number
}

const ComparativeCard = ({ title, current, prev }: Props): ReactElement => {
  const [increase, setIncrease] = useState(false)
  const { formatMessage } = useIntl()

  const getPercentage = (bigger: number, minor: number): number => {
    if (bigger || prev) {
      const percentage = Number((100 - (minor * 100) / bigger).toFixed(2))

      return percentage
    }
    return 0
  }

  const percentage = useMemo(() => {
    const increase = current > prev
    let value = 0
    setIncrease(increase)

    if (increase) {
      value = getPercentage(current, prev)
    } else {
      value = getPercentage(prev, current)
    }

    return value
  }, [current, prev])

  return (
    <div className="w-full h-full md:px-3 md:py-4 xl:px-6 xl:py-8 border flex flex-col justify-center">
      <p className="md:text-base xl:text-lg text-slate-500">{title}</p>
      <div className="flex md:flex-col lg:flex-row justify-between items-center mt-2">
        <p className="md:text-xl xl:text-4xl font-bold">
          {current}
          <span className="md:text-xs lg:text-sm xl:text-base font-normal ml-1 text-slate-400">
            {formatMessage(messages.before, { value: prev })}
          </span>
        </p>
        <StatisticalPercentage
          className="md:mt-2 lg:mt-0"
          percentage={percentage}
          type={increase ? 'up' : 'down'}
        />
      </div>
    </div>
  )
}

export default ComparativeCard
