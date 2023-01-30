import { ReactElement, useMemo } from 'react'
import { Histogram, HistogramConfig } from '@ant-design/plots'

import NoData from 'components/NoData'

interface Props {
  data: any[]
  binField?: string
  binWidth?: number
  onClickElement?: (dataElement: any) => void
}

const HistogramChart = ({
  data,
  binField = 'value',
  binWidth = 2,
  onClickElement = () => {}
}: Props): ReactElement => {
  const hasData = useMemo(() => data.length, [data])

  const config: HistogramConfig = {
    data,
    binField,
    binWidth,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    },
    onReady: (plot) => {
      plot.on('element:click', ({ data }) => {
        onClickElement(data.data)
      })
    }
  }
  return hasData ? <Histogram {...config} /> : <NoData type="chart" />
}

export default HistogramChart
