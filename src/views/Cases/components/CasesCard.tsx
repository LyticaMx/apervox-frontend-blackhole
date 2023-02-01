import Button from 'components/Button'
import Tabs from 'components/Tabs'
import { useCases } from 'context/Cases'
import { generalMessages } from 'globalMessages'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { PaginationParams } from 'types/api'
import { casesMessages } from '../messages'
import ActiveCasesTab from './ActiveCasesTab'
import ArchivedCasesTab from './ArchivedCasesTab'
import CreateCaseDialog from './CreateCaseDialog'

interface Props {
  currentTab: string
  setCurrentTab: (tab: string) => void
}

const CasesCard = (props: Props): ReactElement => {
  const { currentTab, setCurrentTab } = props
  const [openCreateCase, setOpenCreateCase] = useState<boolean>(false)
  const { actions, activeCasesPagination, archivedCasesPagination } = useCases()
  const { formatMessage } = useIntl()

  const fetchActiveCases = async (params?: PaginationParams): Promise<void> => {
    await actions?.getActiveCases(params)
  }

  const onActiveCasesChange = async (): Promise<void> => {
    if (currentTab === 'active') {
      if (activeCasesPagination.page === 1) {
        await fetchActiveCases()
      } else fetchActiveCases({ page: 1 })
    }
  }

  const fetchArchivedCases = async (
    params?: PaginationParams
  ): Promise<void> => {
    await actions?.getArchivedCases(params)
  }

  const onArchivedCasesChange = async (): Promise<void> => {
    if (archivedCasesPagination.page === 1) {
      await fetchArchivedCases()
    } else fetchArchivedCases({ page: 1 })
  }

  useEffect(() => {
    if (currentTab === 'active') {
      fetchActiveCases()
    } else {
      fetchArchivedCases()
    }
  }, [currentTab])

  return (
    <>
      <div className="my-3 flex justify-end">
        <CreateCaseDialog
          open={openCreateCase}
          onClose={() => setOpenCreateCase(false)}
          onAccept={onActiveCasesChange}
        />
        <Button
          variant="contained"
          color="indigo"
          onClick={() => setOpenCreateCase(true)}
        >
          {formatMessage(casesMessages.addCase)}
        </Button>
      </div>
      <div className="mt-6 p-3 shadow ring-1 ring-black ring-opacity-5 md:rounded">
        <Tabs
          tabs={[
            {
              id: 'active',
              name: formatMessage(generalMessages.actives),
              component: (
                <ActiveCasesTab
                  onCasesChange={onActiveCasesChange}
                  fetchActiveCases={fetchActiveCases}
                />
              )
            },
            {
              id: 'archived',
              name: formatMessage(generalMessages.archiveds),
              component: (
                <ArchivedCasesTab
                  fetchArchivedCases={fetchArchivedCases}
                  onArchivedCasesChange={onArchivedCasesChange}
                />
              )
            }
          ]}
          defaultTab={currentTab}
          onChangeTab={(newCurrent) => setCurrentTab(newCurrent)}
        />
      </div>
    </>
  )
}

export default CasesCard
