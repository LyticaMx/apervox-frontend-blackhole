import { Radar, RadarConfig } from '@ant-design/plots'
import { ReactElement } from 'react'

interface Fields {
  x: string
  y: string
  serie?: string
}

interface Props {
  data: any
  fields: Fields
  area?: boolean
  score?: {
    min: number
    max: number
  }
}

const BasicRadarChart = ({
  data,
  fields,
  area,
  score
}: Props): ReactElement => {
  const config: RadarConfig = {
    data,
    xField: fields.x,
    yField: fields.y,
    seriesField: fields.serie,
    meta: {
      score: {
        min: score?.min,
        max: score?.max
      }
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null
          }
        }
      }
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null
          }
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)'
      }
    },
    point: {
      size: 2
    },
    area: area ? {} : undefined
  }

  return <Radar {...config} />
}

export default BasicRadarChart
