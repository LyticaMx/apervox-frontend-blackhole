import { ReactElement, useMemo } from 'react'
import { Column, ColumnConfig } from '@ant-design/plots'

import NoData from 'components/NoData'

interface Props {
  data: any[]
  fields: {
    x: string
    y: string
  }
  onClickElement?: (dataElement: any) => void
}

const ColumnChart = ({
  data,
  fields,
  onClickElement = () => {}
}: Props): ReactElement => {
  const hasData = useMemo(() => data.length, [data])

  const config: ColumnConfig = {
    data,
    xField: fields.x,
    yField: fields.y,
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

  return hasData ? <Column {...config} /> : <NoData type="chart" />
}

export default ColumnChart
