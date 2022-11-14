import { ReactElement } from 'react'
import { Histogram, HistogramConfig } from '@ant-design/plots'

interface Props {
  data: any[]
  binField?: string
  binWidth?: number
}

const HistogramChart = ({
  data,
  binField = 'value',
  binWidth = 2
}: Props): ReactElement => {
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
    }
    // meta: {
    //   type: {
    //     alias: '类别'
    //   },
    //   sales: {
    //     alias: '销售额'
    //   }
    // }
  }
  return <Histogram {...config} />
}

export default HistogramChart
