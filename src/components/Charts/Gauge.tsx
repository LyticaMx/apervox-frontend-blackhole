import { ReactElement } from 'react'
import { Gauge, GaugeConfig } from '@ant-design/plots'

import { HEX, RGB, RGBA } from 'types/color'

interface Props {
  percentage: number
  rangeColor?: {
    from: RGB | RGBA | HEX
    to: RGB | RGBA | HEX
  }
  textColor?: RGB | RGBA | HEX
  height?: number
  fontSize?: number
}

const GaugeChart = ({
  percentage,
  rangeColor = { from: '#B8E1FF', to: '#3D76DD' },
  textColor = '#4B535E',
  height,
  fontSize
}: Props): ReactElement => {
  const config: GaugeConfig = {
    percent: percentage < 100 ? Number(`0.${percentage}`) : 1,
    range: {
      color: `l(0) 0:${rangeColor.from} 1:${rangeColor.to}`
    },
    height,
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: false,
    statistic: {
      title: {
        offsetY: -20,
        style: {
          fontSize: fontSize ? `${fontSize}px` : '27px',
          color: textColor
        },
        formatter: (val) => `${String(val?.percent * 100)}%`
      },
      content: {
        formatter: () => ''
      }
    }
  }
  return <Gauge {...config} />
}

export default GaugeChart
