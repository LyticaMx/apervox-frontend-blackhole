import { useState, ReactElement } from 'react'
import { SortingState } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { StarIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useGlobalMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import { Evidence, EvidenceClasification, EvidenceTag } from 'types/technique'
import Table from 'components/Table'

import { evidenceListMessages } from '../messages'

interface Props {
  data: Evidence[]
  onSelectItem?: (rowSelected: Evidence) => void
}

const EvidenceList = ({ data, onSelectItem }: Props): ReactElement => {
  const [sortingState, setSortingState] = useState<SortingState>([])
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()

  const columns = useTableColumns<Evidence>(() => [
    {
      accessorKey: 'number_event',
      header: formatMessage(evidenceListMessages.eventNumber).toUpperCase()
    },
    {
      accessorKey: 'number_target',
      header: formatMessage(evidenceListMessages.targetNumber).toUpperCase()
    },
    {
      accessorKey: 'number_origin',
      header: formatMessage(evidenceListMessages.sourceNumber).toUpperCase()
    },
    {
      accessorKey: 'created_at',
      header: formatMessage(evidenceListMessages.startDateTime).toUpperCase(),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'expires_at',
      header: formatMessage(evidenceListMessages.endDateTime).toUpperCase(),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'duration',
      header: getGlobalMessage('duration', 'generalMessages').toUpperCase()
    },
    {
      accessorKey: 'carrier',
      header: formatMessage(evidenceListMessages.carrier).toUpperCase()
    },
    {
      accessorKey: 'imei',
      header: 'IMEI'
    },
    {
      accessorKey: 'imsi',
      header: 'IMSI'
    },
    {
      accessorKey: 'code_cell_start',
      header: formatMessage(evidenceListMessages.codeCellStart).toUpperCase()
    },
    {
      accessorKey: 'direction_cell_start',
      header: formatMessage(
        evidenceListMessages.directionCellStart
      ).toUpperCase()
    },
    {
      accessorKey: 'region_cell_start',
      header: formatMessage(
        evidenceListMessages.townhallCellStart
      ).toUpperCase()
    },
    {
      accessorKey: 'audit_by',
      header: formatMessage(evidenceListMessages.auditedBy).toUpperCase()
    },
    {
      accessorKey: 'follow_up',
      header: formatMessage(evidenceListMessages.followUp).toUpperCase()
    },
    {
      accessorKey: 'obtained_from',
      header: formatMessage(evidenceListMessages.obtainedFrom).toUpperCase()
    },
    {
      accessorKey: 'tag',
      header: formatMessage(evidenceListMessages.tag).toUpperCase(),
      cell: ({ getValue }) => {
        let text = ''
        let circleClass = ''

        switch (getValue()) {
          case EvidenceTag.BSC:
            text = 'BSC'
            circleClass = 'bg-rose-500'
            break
          case EvidenceTag.DISTORTION:
            text = 'DISTORCIÓN'
            circleClass = 'bg-orange-500'
            break

          default:
            text = 'BSC'
            circleClass = 'bg-rose-500'
            break
        }

        return (
          <div className="flex items-center">
            <div className={clsx('w-4 h-4 rounded-full mr-2', circleClass)} />
            {text}
          </div>
        )
      }
    },
    {
      accessorKey: 'clasification',
      header: formatMessage(evidenceListMessages.clasification).toUpperCase(),
      cell: ({ getValue }) => {
        let text = ''
        let starsClass = {
          one: 'text-slate-400',
          two: 'text-slate-400',
          three: 'text-slate-400'
        }

        switch (getValue()) {
          case EvidenceClasification.RELEVANT:
            text = getGlobalMessage('relevant', 'platformMessages')
            starsClass = {
              one: 'text-yellow-500',
              two: 'text-yellow-500',
              three: 'text-yellow-500'
            }
            break
          case EvidenceClasification.NOT_RELEVANT:
            text = getGlobalMessage('irrelevant', 'platformMessages')
            starsClass = {
              one: 'text-yellow-500',
              two: 'text-yellow-500',
              three: starsClass.three
            }
            break
          case EvidenceClasification.DISCARDED:
            text = getGlobalMessage('discarded', 'platformMessages')
            break
          default:
            text = getGlobalMessage('discarded', 'platformMessages')
            break
        }

        return (
          <div className="flex items-center">
            <StarIcon className={clsx('w-6 h-6', starsClass.one)} />
            <StarIcon className={clsx('w-6 h-6', starsClass.two)} />
            <StarIcon className={clsx('w-6 h-6 mr-2', starsClass.three)} />
            {text}
          </div>
        )
      }
    },
    {
      accessorKey: 'type',
      header: formatMessage(evidenceListMessages.type).toUpperCase(),
      cell: ({ getValue }) => {
        const types = ['Audio', 'Video', 'Imagen', 'Documento']
        const type = types[getValue<number>()] ?? types[0]

        return type
      }
    }
  ])

  return (
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
              `onDeleteTechniquesFromWorkGroup(${items.map((user) => user.id)})`
            )
          },
          Icon: TrashIcon
        }
      ]}
      onRowClicked={onSelectItem}
    />
  )
}

export default EvidenceList
