import Table from 'components/Table'
import Typography from 'components/Typography'
import { useCases } from 'context/Cases'
import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { PaginationParams } from 'types/api'
import { Case } from 'types/case'
import { casesMessages } from '../messages'
import EditCaseDialog from './EditCaseDialog'

interface Props {
  fetchActiveCases: (params?: PaginationParams) => Promise<void>
  onCasesChange: () => Promise<void>
}

const ActiveCasesTab = (props: Props): ReactElement => {
  const { fetchActiveCases, onCasesChange } = props
  const [caseToEdit, setCaseToEdit] = useState<Case | null>(null)
  const { actions, listOfActiveCases, activeCasesPagination } = useCases()
  const { formatMessage } = useIntl()

  return (
    <div className="pt-3">
      <EditCaseDialog
        open={!!caseToEdit}
        onClose={() => setCaseToEdit(null)}
        caseId={caseToEdit?.id ?? ''}
        name={caseToEdit?.name ?? ''}
        users={caseToEdit?.users ?? []}
        pins={caseToEdit?.pins ?? []}
        onAccept={onCasesChange}
      />
      <Typography>{formatMessage(casesMessages.caseDetails)}</Typography>
      <Table
        onRowClicked={(row) => actions?.setCurrentCase(row)}
        data={listOfActiveCases}
        columns={[
          {
            header: formatMessage(formMessages.name),
            accessorKey: 'name'
          },
          {
            header: formatMessage(generalMessages.users),
            accessorKey: 'users',
            cell: ({ getValue }) => getValue().length
          },
          {
            header: 'PINs',
            accessorKey: 'pins',
            cell: ({ getValue }) => getValue().length
          },
          {
            header: formatMessage(generalMessages.creator),
            accessorKey: 'createdBy'
          },
          {
            header: ' ',
            cell: ({ row }) => (
              <button
                className="text-blue-500 font-bold"
                onClick={(e) => {
                  e.stopPropagation()
                  setCaseToEdit(row.original)
                }}
              >
                {formatMessage(actionsMessages.administrate)}
              </button>
            )
          }
        ]}
        pageSize={activeCasesPagination.limit}
        manualPagination={{
          currentPage: activeCasesPagination.page - 1,
          totalRecords: activeCasesPagination.totalRecords,
          onChange: async (page) => await fetchActiveCases({ page: page + 1 })
        }}
      />
    </div>
  )
}

export default ActiveCasesTab
