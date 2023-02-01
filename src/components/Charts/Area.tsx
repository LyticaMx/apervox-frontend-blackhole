import { Area, AreaConfig } from '@ant-design/plots'
import NoData from 'components/NoData'
import { generalMessages } from 'globalMessages'
import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { HEX, RGB, RGBA } from 'types/color'

interface Item {
  id?: string
  name: string
  value: string
}

interface CustomColors {
  [serie: string]: HEX | RGBA | RGB
}

interface Fields {
  x: string
  y: string
  serie?: string
}

interface Props {
  data: any[]
  fields: Fields
  slideBar?: boolean
  xTitle?: string
  yTitle?: string
  i18LegendKey?: string
  i18ToltipKey?: string
  legendFormater?: (text: string, item: Item, index: number) => string
  tooltipFormater?: (datum: any) => Item
  customSerieColors?: CustomColors
  smooth?: boolean
  height?: number
}

const AreaChart = (props: Props): ReactElement => {
  const {
    data,
    fields,
    i18LegendKey,
    i18ToltipKey,
    customSerieColors,
    legendFormater,
    tooltipFormater,
    slideBar,
    xTitle,
    yTitle,
    smooth = true,
    height
  } = props
  const { formatMessage } = useIntl()
  const hasData = useMemo(() => data.length, [data])

  const config: AreaConfig = {
    data,
    height,
    autoFit: true,
    seriesField: fields.serie,

    xField: fields.x,
    yField: fields.y,
    color: customSerieColors
      ? (datum) => customSerieColors[datum.type]
      : undefined,
    tooltip: {
      formatter: tooltipFormater
        ? (tooltipFormater as any)
        : i18ToltipKey
        ? (datum) => ({
            name: formatMessage(generalMessages[datum[i18ToltipKey]]),
            value: datum.value
          })
        : null
    },
    legend: {
      itemName: {
        formatter: legendFormater
          ? (legendFormater as any)
          : i18LegendKey
          ? (_, item, __) => formatMessage(generalMessages[item[i18LegendKey]])
          : null
      }
    },
    xAxis: {
      tickCount: 5,
      title: xTitle ? { text: xTitle } : null
    },
    yAxis: {
      title: yTitle ? { text: yTitle } : null
    },
    smooth,
    slider: slideBar ? { start: 0, end: 1 } : false
  }

  return hasData ? <Area {...config} /> : <NoData type="chart" />
}

export default AreaChart
