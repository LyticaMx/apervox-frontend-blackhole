import { useState, ReactElement } from 'react'
import { format } from 'date-fns'
import { SortingState, ColumnDef } from '@tanstack/react-table'

import { TrashIcon } from '@heroicons/react/24/outline'

import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import PriorityLabel from 'components/Priority/PriorityLabel'
import StatusTag from 'components/Status/StatusTag'
import IconButton from 'components/Button/IconButton'
import ActionNotification from 'components/Dialog/ActionNotification'

import { NonEmptyArray } from 'types/utils'
import { Technique, Turn } from 'types/technique'
import { Priority } from 'types/priority'
import { Status } from 'types/status'

import { useFormatMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'

import { generalMessages } from 'globalMessages'

import Wrapper, { ContentType } from './Wrapper'
import DeleteTechinqueDialog, { EliminationType } from './DeleteTechinqueDialog'
import { techniquesDeleteDialogMessages } from '../messages'

interface Props {
  data: Technique[]
  shortMode?: boolean
  onSelectItem?: (rowSelected: Technique) => void
}

const TechniqueList = ({
  data,
  shortMode,
  onSelectItem
}: Props): ReactElement => {
  const getMessage = useFormatMessage(generalMessages)
  const getDeleteMessage = useFormatMessage(techniquesDeleteDialogMessages)

  const [sortingState, setSortingState] = useState<SortingState>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openActionNotification, setOpenActionNotification] = useState(false)
  const [techinqueToDelete, setTechinqueToDelete] = useState<string | null>(
    null
  )

  const handleOpenDeleteDialog = (e): void => {
    e.preventDefault()
    setOpenDeleteDialog(true)
  }
  const handleCloseDeleteDialog = (): void => {
    setOpenDeleteDialog(false)
    setTechinqueToDelete(null)
  }

  const handleDeleteTechinque = (eliminationType: EliminationType): void => {
    setOpenDeleteDialog(false)
    setOpenActionNotification(true)
    console.log('techinque_id: ', techinqueToDelete, eliminationType)
  }

  const shortModeColums: NonEmptyArray<ColumnDef<Technique>> = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: getMessage('name')
    },
    {
      accessorKey: 'priority',
      header: getMessage('priority'),
      cell: ({ getValue }) => {
        const priority = getValue<Priority>()

        return <PriorityLabel value={priority} />
      }
    }
  ]

  const normalModeColumns: NonEmptyArray<ColumnDef<Technique>> = [
    shortModeColums[0], // id
    shortModeColums[1], // name
    // {
    //   accessorKey: 'id',
    //   header: 'ID'
    // },
    // {
    //   accessorKey: 'name',
    //   header: getMessage('name')
    // },
    {
      accessorKey: 'created_at',
      header: getMessage('registrationDate'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'expires_at',
      header: getMessage('effectiveDate'),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'registered_by',
      header: getMessage('registeredBy')
    },
    {
      accessorKey: 'time_on_platform',
      header: getMessage('timeOnPlatform')
    },
    shortModeColums[2], // priority
    {
      accessorKey: 'status',
      header: getMessage('status'),
      cell: ({ getValue }) => {
        const status = getValue<Status>()

        return <StatusTag value={status} />
      }
    },
    {
      accessorKey: 'turn_of_attention',
      header: getMessage('turnOfAttention'),
      cell: ({ getValue }) => {
        const turn = getValue<Turn>()

        return getMessage(`${turn}`)
      }
    },
    {
      accessorKey: 'total_objective',
      header: getMessage('totalObjective')
    },
    {
      accessorKey: 'id',
      header: getMessage('action'),
      cell: ({ getValue }) => {
        const id = getValue<string>()

        return (
          <div className="flex items-center justify-center">
            <Tooltip
              content={getMessage('delete')}
              floatProps={{ offset: 10, arrow: true }}
              classNames={{
                panel:
                  'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
                arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
              }}
              placement="top"
            >
              <IconButton
                onClick={(e) => {
                  e?.stopPropagation()
                  handleOpenDeleteDialog(e)
                  setTechinqueToDelete(id)
                }}
                className="text-muted hover:text-primary"
              >
                <TrashIcon className="h-5 w-5 mx-1" />
              </IconButton>
            </Tooltip>
          </div>
        )
      }
    }
  ]

  const columns = useTableColumns<Technique>(
    () => (shortMode ? shortModeColums : normalModeColumns),
    [shortMode]
  )

  return (
    <Wrapper expanded={!shortMode} contentType={ContentType.TECHNIQUE_LIST}>
      <Table
        columns={columns}
        data={data}
        className="overflow-x-auto shadow rounded-lg"
        manualSorting={{
          onSortingChange: setSortingState,
          sorting: sortingState
        }}
        maxHeight={500}
        withCheckbox
        actionsForSelectedItems={[
          {
            name: 'Eliminar',
            action: (items) => {
              console.log(
                `onDeleteTechniquesFromWorkGroup(${items.map(
                  (user) => user.id
                )})`
              )
            },
            Icon: TrashIcon
          }
        ]}
        onRowClicked={onSelectItem}
      />
      <DeleteTechinqueDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onAccept={handleDeleteTechinque}
      />
      <ActionNotification
        open={openActionNotification}
        title={getDeleteMessage('title')}
        onAccept={() => setOpenActionNotification(false)}
      />
    </Wrapper>
  )
}

export default TechniqueList
