import { ReactElement, useMemo } from 'react'
import { Heatmap, HeatmapConfig } from '@ant-design/plots'

import { HEX, RGB, RGBA } from 'types/color'

import NoData from 'components/NoData'

interface Props {
  data: any[]
  fields: {
    x: string
    y: string
    colorField: string
  }
  colors?: Array<RGB | HEX | RGBA>
  onClickElement?: (dataElement: any) => void
}

const PolarHeatmapChart = ({
  data,
  fields,
  colors = ['#BAE7FF', '#1890FF', '#1028ff'],
  onClickElement = () => {}
}: Props): ReactElement => {
  const hasData = useMemo(() => data.length, [data])

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
      }
    },
    xAxis: {
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 12,
        style: {
          fill: 'rgb(30 41 59)',
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
          fill: 'rgb(30 41 59)',
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
    ],
    onReady: plot => {
      plot.on('element:click', ({ data }) => {
        onClickElement(data.data)
      })
    }
  }

  return hasData ? <Heatmap {...config} /> : <NoData type="chart" />
}

export default PolarHeatmapChart
