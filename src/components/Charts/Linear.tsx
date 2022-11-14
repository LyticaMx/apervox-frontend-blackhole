import { ReactElement } from 'react'
import { Line, LineConfig } from '@ant-design/plots'

interface Fields {
  x: string
  y: string
  serie?: string
}
interface Props {
  data: any
  fields: Fields
  sliderBar?: boolean
}

const LinearChart = ({ data, fields, sliderBar }: Props): ReactElement => {
  const config: LineConfig = {
    data,
    autoFit: true,
    seriesField: fields.serie,
    xField: fields.x,
    yField: fields.y,
    xAxis: {
      tickCount: 5
    },
    smooth: true,
    slider: sliderBar
      ? {
          start: 0,
          end: 1
        }
      : false
  }

  return <Line {...config} />
}

export default LinearChart
