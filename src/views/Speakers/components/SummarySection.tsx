import { ReactElement } from 'react'
import { useFormatMessage } from 'hooks/useIntl'
import { useSpeakers } from 'context/Speakers'

import ComparativeCard from 'components/ComparativeCard'
import { messages } from '../messages'

const SummarySection = (): ReactElement => {
  const { summary } = useSpeakers()

  const getMessage = useFormatMessage(messages)

  return (
    <div className="mt-6 grid grid-cols-3 shadow ring-1 ring-black ring-opacity-5 md:rounded">
      <ComparativeCard
        title={getMessage('totalPins')}
        current={summary.totalPins.current}
        prev={summary.totalPins.last}
      />

      <ComparativeCard
        title={getMessage('pinAlerts')}
        current={summary.pinAlerts.current}
        prev={summary.pinAlerts.last}
      />

      <ComparativeCard
        title={getMessage('average')}
        current={summary.average.current}
        prev={summary.average.last}
      />
    </div>
  )
}

export default SummarySection
