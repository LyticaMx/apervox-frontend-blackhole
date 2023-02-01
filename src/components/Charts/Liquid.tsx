import { ReactElement } from 'react'
import { Liquid, LiquidConfig } from '@ant-design/plots'

interface Props {
  percentage: string
  height?: number
}

const LiquidChart = ({ percentage, height }: Props): ReactElement => {
  const absolutePercentage = percentage.replace('.', '')
  const config: LiquidConfig = {
    height,
    percent: Number(`0.${absolutePercentage}`),
    outline: {
      border: 4,
      distance: 8
    }
  }
  return <Liquid {...config} />
}

export default LiquidChart
