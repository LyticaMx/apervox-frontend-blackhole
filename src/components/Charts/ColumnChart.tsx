import { ReactElement } from 'react'
import { Column, ColumnConfig } from '@ant-design/plots'

interface Props {
  data: any[]
  fields: {
    x: string
    y: string
  }
}

const ColumnChart = ({ data, fields }: Props): ReactElement => {
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
  return <Column {...config} />
}

export default ColumnChart
