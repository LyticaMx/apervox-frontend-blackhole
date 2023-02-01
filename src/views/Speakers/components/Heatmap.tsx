import { ReactElement } from 'react'

import { useSpeakers } from 'context/Speakers'
import { useFormatMessage } from 'hooks/useIntl'

import Card from 'components/Card'
import PolarHeatmapChart from 'components/Charts/PolarHeatmap'

import { heatmapMessages } from '../messages'

const HeatmapSection = (): ReactElement => {
  const { heatmapAlerts: alerts, heatmapSpeakers: speakers } = useSpeakers()
  const getMessage = useFormatMessage(heatmapMessages)

  return (
    <div className="w-full mt-5 gap-4 flex">
      <div className="w-3/6 h-full">
        <Card>
          <h1 className="text-md font-semibold text-gray-900">
            {getMessage('speakersTitle')}
          </h1>
          <p className="flex gap-3 mt-1 mb-4 text-sm text-gray-500">
            {getMessage('speakersSubtitle')}
          </p>
          <PolarHeatmapChart
            data={speakers}
            fields={{ x: 'x', y: 'y', colorField: 'value' }}
          />
        </Card>
      </div>
      <div className="w-3/6 h-full">
        <Card>
          <h1 className="text-md font-semibold text-gray-900">
            {getMessage('alertsTitle')}
          </h1>
          <p className="flex gap-3 mt-1 mb-4 text-sm text-gray-500">
            {getMessage('alertsSubtitle')}
          </p>
          <PolarHeatmapChart
            data={alerts}
            fields={{ x: 'x', y: 'y', colorField: 'value' }}
            colors={['#f5c6c6', '#f39f9f', '#e85e5d']}
          />
        </Card>
      </div>
    </div>
  )
}

export default HeatmapSection
