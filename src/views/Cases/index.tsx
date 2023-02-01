import { ReactElement, useEffect, useState } from 'react'
import Title from 'components/Title'
import Typography from 'components/Typography'
import ComparativeCard from 'components/ComparativeCard'
import CaseCard from './components/CaseCard'
import CasesCard from './components/CasesCard'
import { useIntl } from 'react-intl'
import { generalMessages } from 'globalMessages'
import { casesMessages } from './messages'
import { useCases } from 'context/Cases'

import { useDatesFilter } from 'context/DatesFilter'
import RangeFilterContext from 'components/RangeFilterContext'
import { CaseState } from 'types/case'

const Cases = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState<string>('active')
  const { message } = useDatesFilter()
  const { summary, actions } = useCases()

  const { formatMessage } = useIntl()

  const updateGlobalFilters = (dateFilters): void => {
    actions?.setGlobalFilters(currentTab as CaseState, dateFilters)
  }

  useEffect(() => {
    actions?.getSummary()
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Title variant="page">{formatMessage(generalMessages.cases)}</Title>
          <Typography variant="body2" className='text-gray-500'>{message}</Typography>
        </div>
        <RangeFilterContext onSubmit={updateGlobalFilters} />
      </div>
      <div className="mt-6 grid grid-cols-3 shadow ring-1 ring-black ring-opacity-5 md:rounded">
        <ComparativeCard
          title={formatMessage(casesMessages.newCases)}
          current={summary.totalCases.current}
          prev={summary.totalCases.last}
        />
        <ComparativeCard
          title={formatMessage(casesMessages.pinsInCases)}
          current={summary.pinsInCases.current}
          prev={summary.pinsInCases.last}
        />
        <ComparativeCard
          title={formatMessage(casesMessages.alertsInCases)}
          current={summary.alertsInCases.current}
          prev={summary.alertsInCases.last}
        />
      </div>
      <CasesCard currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <CaseCard />
    </div>
  )
}

export default Cases
