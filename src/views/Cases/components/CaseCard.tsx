import Tabs from 'components/Tabs'
import Typography from 'components/Typography'
import NoData from 'components/NoData'
import { useCases } from 'context/Cases'
import { generalMessages } from 'globalMessages'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { caseCardMessages } from '../messages'
import CallsTab from './CallsTab'
import FrequentNumbersTab from './FrequentNumbersTab'
import PinsTab from './PinsTab'
import UsersTab from './UsersTab'
import { FolderIcon } from '@heroicons/react/24/outline'

const CaseCard = (): ReactElement => {
  const [currentTab, setCurrentTab] = useState<string>('users')
  const { formatMessage } = useIntl()
  const { caseDetail } = useCases()

  return (
    <div className="mt-6 p-3 shadow ring-1 ring-black ring-opacity-5 md:rounded">
      {caseDetail.id !== '' ? (
        <>
          <Typography style="semibold">{caseDetail.name}</Typography>
          <Tabs
            tabs={[
              {
                id: 'users',
                name: formatMessage(generalMessages.users),
                component: <UsersTab />
              },
              {
                id: 'pins',
                name: 'PINs',
                component: <PinsTab />
              },
              {
                id: 'calls',
                name: formatMessage(generalMessages.calls),
                component: <CallsTab />
              },
              {
                id: 'frequentNumbers',
                name: formatMessage(caseCardMessages.frequentNumbers),
                component: <FrequentNumbersTab />
              }
            ]}
            defaultTab={currentTab}
            onChangeTab={(newCurrent) => setCurrentTab(newCurrent)}
          />
        </>
      ) : (
        <NoData
          icon={FolderIcon}
          label="Seleccione un caso para ver mas detalles"
        />
      )}
    </div>
  )
}

export default CaseCard
