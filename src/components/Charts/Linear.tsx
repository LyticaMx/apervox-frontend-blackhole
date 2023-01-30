import { ReactElement, useMemo } from 'react'
import { Line, LineConfig } from '@ant-design/plots'
import { useIntl } from 'react-intl'

import NoData from 'components/NoData'
import { generalMessages } from 'globalMessages'
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
  data: any
  fields: Fields
  sliderBar?: boolean
  xTitle?: string
  yTitle?: string
  i18LegendKey?: string
  i18ToltipKey?: string
  legendFormater?: (text: string, item: Item, index: number) => string
  tooltipFormater?: (datum: any) => Item
  customSerieColors?: CustomColors
  height?: number
}

const LinearChart = ({
  data,
  fields,
  sliderBar,
  xTitle,
  yTitle,
  i18LegendKey,
  legendFormater,
  i18ToltipKey,
  tooltipFormater,
  customSerieColors,
  height
}: Props): ReactElement => {
  const intl = useIntl()
  const hasData = useMemo(() => data.length, [data])

  const config: LineConfig = {
    data,
    height,
    color: customSerieColors
      ? (datum) => customSerieColors[datum.type]
      : undefined,
    autoFit: true,
    seriesField: fields.serie,
    xField: fields.x,
    yField: fields.y,
    tooltip: {
      formatter: tooltipFormater
        ? (tooltipFormater as any)
        : i18ToltipKey
        ? (datum) => ({
            name: intl.formatMessage(generalMessages[datum[i18ToltipKey]]),
            value: datum.value
          })
        : null
    },
    legend: {
      itemName: {
        formatter: legendFormater
          ? (legendFormater as any)
          : i18LegendKey
          ? (_, item, __) =>
              intl.formatMessage(generalMessages[item[i18LegendKey]])
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
    smooth: true,
    slider: sliderBar
      ? {
          start: 0,
          end: 1
        }
      : false
  }

  return hasData ? <Line {...config} /> : <NoData type="chart" />
}

export default LinearChart
