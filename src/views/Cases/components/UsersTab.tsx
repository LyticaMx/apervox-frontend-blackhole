import Button from 'components/Button'
import Table from 'components/Table'
import Typography from 'components/Typography'
import { useCases } from 'context/Cases'
import { actionsMessages, formMessages, generalMessages } from 'globalMessages'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { User } from 'types/case'
import { usersTabMessages } from '../messages'
import KickOutUserDialog from './KickOutUserDialog'
import LinkUserDialog from './LinkUserDialog'

const UsersTab = (): ReactElement => {
  const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false)
  const [userToKickOut, setUserToKickOut] = useState<User | null>(null)
  const { caseDetail } = useCases()
  const { formatMessage } = useIntl()

  return (
    <div className="pt-3">
      <LinkUserDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
      <KickOutUserDialog
        open={!!userToKickOut}
        onClose={() => setUserToKickOut(null)}
        userId={userToKickOut?.id ?? ''}
        fullName={userToKickOut?.fullName ?? ''}
      />
      <div className="flex justify-between items-center">
        <Typography>
          {formatMessage(usersTabMessages.onlyLinkedUsers)}
        </Typography>
        <Button
          variant="contained"
          color="indigo"
          onClick={() => setOpenCreateDialog(true)}
        >
          {formatMessage(usersTabMessages.addUser)}
        </Button>
      </div>
      <div className="mt-3">
        <Table
          columns={[
            {
              header: formatMessage(generalMessages.username),
              accessorKey: 'fullName'
            },
            {
              header: formatMessage(formMessages.email),
              accessorKey: 'email'
            },
            {
              header: ' ',
              accessorKey: 'id',
              cell: ({ row }) => (
                <button
                  className="text-blue-500 font-bold"
                  onClick={() => setUserToKickOut(row.original)}
                >
                  {formatMessage(actionsMessages.kickOut)}
                </button>
              )
            }
          ]}
          data={caseDetail?.users ?? []}
        />
      </div>
    </div>
  )
}

export default UsersTab
