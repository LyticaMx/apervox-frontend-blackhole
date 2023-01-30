import { ReactElement, useEffect, useState } from 'react'

import Card from 'components/Card'
import HistogramChart from 'components/Charts/HistogramChart'

import { histogramMessages } from '../messages'
import { useSpeakers } from 'context/Speakers'
import { useFormatMessage } from 'hooks/useIntl'

const Histogram = (): ReactElement => {
  const { histogram, actions } = useSpeakers()
  const [range, setRange] = useState([])
  const getMessage = useFormatMessage(histogramMessages)

  useEffect(() => {
    if (range.length) {
      const [min, max] = range
      actions?.getListPins({
        page: 1,
        min_value: min,
        max_value: max
      })
    }
  }, [range])

  return (
    <Card className="min-h-full">
      <h1 className="text-md font-semibold text-gray-900">
        {getMessage('title')}
      </h1>
      <p className="flex gap-3 mt-1 mb-4 text-sm text-gray-500">
        {getMessage('subtitle')}
      </p>
      <HistogramChart
        data={histogram}
        binField="count"
        onClickElement={(el) => setRange(el.range)}
      />
    </Card>
  )
}

export default Histogram
