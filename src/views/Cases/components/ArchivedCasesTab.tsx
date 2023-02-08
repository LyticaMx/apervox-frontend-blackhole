import Table from 'components/Table'
import Typography from 'components/Typography'
import { useCases } from 'context/Cases'
import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { PaginationParams } from 'types/api'
import { Case } from 'types/case'
import { casesMessages } from '../messages'
import ReactivateCaseDialog from './ReactivateCaseDialog'

interface Props {
  fetchArchivedCases: (params?: PaginationParams) => Promise<void>
  onArchivedCasesChange: () => Promise<void>
}

const ArchivedCasesTab = (props: Props): ReactElement => {
  const { fetchArchivedCases, onArchivedCasesChange } = props
  const [actualCase, setActualCase] = useState<Case | null>(null)
  const { listOfArchivedCases, archivedCasesPagination } = useCases()
  const { formatMessage } = useIntl()

  return (
    <div className="pt-3">
      <ReactivateCaseDialog
        open={!!actualCase}
        onClose={() => setActualCase(null)}
        onAccept={onArchivedCasesChange}
        name={actualCase?.name ?? ''}
        caseId={actualCase?.id ?? ''}
      />
      <Typography>{formatMessage(casesMessages.caseDetails)}</Typography>
      <Table
        data={listOfArchivedCases}
        columns={[
          {
            header: formatMessage(formMessages.name),
            accessorKey: 'name',
            cell: ({ getValue }) => (
              <span className="text-orange-400">{getValue<string>()}</span>
            )
          },
          {
            header: formatMessage(generalMessages.users),
            accessorKey: 'usersCount'
          },
          {
            header: 'PINs',
            accessorKey: 'pins'
          },
          {
            header: formatMessage(generalMessages.creator),
            accessorKey: 'createdBy'
          },
          {
            header: ' ',
            accessorKey: 'id',
            cell: ({ row }) => (
              <button
                className="text-blue-500 font-bold"
                onClick={() => setActualCase(row.original)}
              >
                {formatMessage(actionsMessages.reactivate)}
              </button>
            )
          }
        ]}
        pageSize={archivedCasesPagination.limit}
        manualPagination={{
          currentPage: archivedCasesPagination.page - 1,
          totalRecords: archivedCasesPagination.totalRecords,
          onChange: async (page) => await fetchArchivedCases({ page: page + 1 })
        }}
      />
    </div>
  )
}

export default ArchivedCasesTab
