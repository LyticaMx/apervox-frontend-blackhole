import BasicRadarChart from 'components/Charts/BasicRadar'
import { useCases } from 'context/Cases'
import { ReactElement, useEffect } from 'react'

const FrequentNumbersTab = (): ReactElement => {
  const { actions, caseDetail } = useCases()

  useEffect(() => {
    actions?.getFrequentNumbers()
  }, [caseDetail?.id])

  return (
    <div className="pt-3">
      <BasicRadarChart
        data={caseDetail?.listOfFrequentNumbers}
        fields={{ x: 'item', y: 'score' }}
        score={{ min: 0 }}
        area
      />
    </div>
  )
}

export default FrequentNumbersTab
