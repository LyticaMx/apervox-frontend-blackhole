import {
  RadialTreeGraph,
  RadialGraphConfig,
  CardItem
} from '@ant-design/graphs'
import { ReactElement } from 'react'
import { HEX } from 'types/color'

interface Data {
  id: string
  value: CardItem
  children?: Data[]
}

interface Props {
  data: Data
  themeColor?: HEX
}

const RadialTreeChart = ({
  data,
  themeColor = '#73B3D1'
}: Props): ReactElement => {
  const config: RadialGraphConfig = {
    data,
    nodeCfg: {
      size: 30,
      type: 'circle',
      label: {
        style: {
          fill: '#fff'
        }
      },
      style: {
        fill: themeColor,
        stroke: '#0E1155',
        lineWidth: 2,
        strokeOpacity: 0.45,
        shadowColor: themeColor,
        shadowBlur: 25
      },
      nodeStateStyles: {
        hover: {
          stroke: themeColor,
          lineWidth: 2,
          strokeOpacity: 1
        }
      }
    },
    edgeCfg: {
      style: {
        stroke: themeColor,
        shadowColor: themeColor,
        shadowBlur: 20
      },
      endArrow: {
        type: 'triangle',
        fill: themeColor,
        d: 15,
        size: 8
      },
      edgeStateStyles: {
        hover: {
          stroke: themeColor,
          lineWidth: 2
        }
      }
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node']
  }

  return (
    <div
      id="dom"
      style={{
        background: '#0E1155',
        height: '400px'
      }}
    >
      <RadialTreeGraph
        data={data}
        nodeCfg={config.nodeCfg}
        edgeCfg={config.edgeCfg}
        behaviors={config.behaviors}
      />
    </div>
  )
}

export default RadialTreeChart
