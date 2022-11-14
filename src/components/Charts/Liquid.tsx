import { ReactElement } from 'react'
import { Liquid, LiquidConfig } from '@ant-design/plots'

interface Props {
  percentage: number
}

const LiquidChart = ({ percentage }: Props): ReactElement => {
  const config: LiquidConfig = {
    percent: Number(`0.${percentage}`),
    outline: {
      border: 4,
      distance: 8
    }
  }
  return <Liquid {...config} />
}

export default LiquidChart
