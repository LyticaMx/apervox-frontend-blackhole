import Title from 'components/Title'
import ViewCounter from 'components/ViewCounter'
import { ReactElement, useState } from 'react'
import { pathRoute } from 'router/routes'
import { messages, tableMessages } from './messages'
import ViewFilter from 'components/ViewFilter'
import GoBackButton from 'components/GoBackButton'
import useTableColumns from 'hooks/useTableColumns'
import { format } from 'date-fns'
import Table from 'components/Table'
import { useIntl } from 'react-intl'
import {
  actionsMessages,
  generalMessages,
  platformMessages
} from 'globalMessages'
import CreateVerificationLineDrawer from './components/CreateVerificationLineDrawer'
import Tooltip from 'components/Tooltip'
import { TrashIcon } from '@heroicons/react/24/outline'
import EditVerificationLineDrawer from './components/EditVerificationLineDrawer'

export interface VerificationLine {
  id?: string
  phone: string
  createdOn?: string
  createdBy?: string
}

const Verification = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [openCreate, setOpenCreate] = useState(false)
  const [selectedLine, setSelectedLine] = useState<VerificationLine | null>(
    null
  )
  const [openEdit, setOpenEdit] = useState(false)
  const counters = {
    bussyLines: 5,
    availableLines: 5,
    quarantineLines: 5,
    maintenanceLines: 5
  }

  const columns = useTableColumns<VerificationLine>(() => [
    {
      header: formatMessage(platformMessages.phoneNumber),
      accessorKey: 'phone'
    },
    {
      header: formatMessage(tableMessages.createdBy),
      accessorKey: 'createdBy'
    },
    {
      header: formatMessage(tableMessages.date),
      accessorKey: 'createdOn',
      cell: ({ getValue }) =>
        format(new Date(getValue<string>() ?? ''), 'dd/MM/yyyy hh:mm')
    },
    {
      header: formatMessage(generalMessages.actions),
      accessorKey: 'id',
      cell: ({ getValue, table }) => (
        <div className="flex items-center">
          <Tooltip
            content={formatMessage(actionsMessages.delete)}
            floatProps={{ offset: 10, arrow: true }}
            classNames={{
              panel:
                'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
              arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
            }}
            placement="top"
          >
            <button
              className="mx-1 text-muted hover:text-primary flex items-center"
              onClick={() => {}}
              disabled={
                table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()
              }
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>
      )
    }
  ])

  return (
    <div>
      <GoBackButton route={pathRoute.acquisition.acquisitionMedium} />
      <div className="flex justify-between">
        <Title className="uppercase">
          {formatMessage(messages.verificationLines)}
        </Title>
        <ViewFilter
          fields={[]}
          action={{
            label: formatMessage(messages.button),
            onClick: () => setOpenCreate(true)
          }}
        />
      </div>
      <div className="flex gap-2 mt-2">
        {Object.entries(counters).map(([key, value]) => (
          <ViewCounter count={value} key={key}>
            {formatMessage(messages[key])}
          </ViewCounter>
        ))}
        <ViewCounter count={5} to={pathRoute.acquisition.verificationLine}>
          {formatMessage(messages.verificationLines)}
        </ViewCounter>{' '}
      </div>
      <CreateVerificationLineDrawer
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
      <EditVerificationLineDrawer
        verificationLine={selectedLine}
        onClose={() => setOpenEdit(false)}
        open={openEdit}
      />
      <div className="mt-2">
        <Table
          columns={columns}
          data={[
            {
              id: 'asdasdasd',
              phone: '0001112223',
              createdOn: '2023-05-11T17:13:11.008Z',
              createdBy: 'superuser'
            }
          ]}
          withCheckbox
          maxHeight={500}
          onRowClicked={(row) => {
            setSelectedLine(row)
            setOpenEdit(true)
          }}
        />
      </div>
    </div>
  )
}

export default Verification
