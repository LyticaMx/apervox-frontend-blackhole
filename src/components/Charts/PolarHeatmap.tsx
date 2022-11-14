import { Heatmap, HeatmapConfig } from '@ant-design/plots'
import { ReactElement } from 'react'
import { HEX, RGB, RGBA } from 'types/color'

interface Props {
  data: any[]
  fields: {
    x: string
    y: string
    colorField: string
  }
  colors?: Array<RGB | HEX | RGBA>
}

const PolarHeatmapChart = ({
  data,
  fields,
  colors = ['#BAE7FF', '#1890FF', '#1028ff']
}: Props): ReactElement => {
  const config: HeatmapConfig = {
    data,
    xField: fields.x,
    yField: fields.y,
    colorField: fields.colorField,
    color: colors,
    coordinate: {
      type: 'polar',
      cfg: {
        innerRadius: 0.2
      }
    },
    heatmapStyle: {
      stroke: '#f5f5f5',
      opacity: 0.8
    },
    meta: {
      time: {
        type: 'cat'
      },
      value: {
        min: 0,
        max: 1
      }
    },
    xAxis: {
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 12,
        style: {
          fill: '#666',
          fontSize: 12,
          textBaseline: 'top'
        }
      }
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 0,
        style: {
          fill: '#fff',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      }
    },
    tooltip: {
      showMarkers: false
    },
    interactions: [
      {
        type: 'element-active'
      }
    ]
  }

  return <Heatmap {...config} />
}

export default PolarHeatmapChart
