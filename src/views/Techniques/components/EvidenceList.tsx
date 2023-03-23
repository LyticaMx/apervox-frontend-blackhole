import { useState, ReactElement } from 'react'
import { SortingState } from '@tanstack/react-table'
import { format } from 'date-fns'
import clsx from 'clsx'

import { StarIcon, TrashIcon } from '@heroicons/react/24/outline'

import Table from 'components/Table'

import { Evidence, EvidenceClasification, EvidenceTag } from 'types/technique'

import useTableColumns from 'hooks/useTableColumns'

interface Props {
  data: Evidence[]
  onSelectItem?: (rowSelected: Evidence) => void
}

const EvidenceList = ({ data, onSelectItem }: Props): ReactElement => {
  const [sortingState, setSortingState] = useState<SortingState>([])

  const columns = useTableColumns<Evidence>(() => [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'number_event',
      header: 'NO. EVENTO'
    },
    {
      accessorKey: 'number_objective',
      header: 'NO. OBJETIVO'
    },
    {
      accessorKey: 'number_origin',
      header: 'NO. ORIGEN'
    },
    {
      accessorKey: 'created_at',
      header: 'FECHA /HORA INICIO',
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'expires_at',
      header: 'FECHA /HORA FIN',
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'duration',
      header: 'DURACIÓN'
    },
    {
      accessorKey: 'carrier',
      header: 'CARRIER'
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
      header: 'CÓDIGO CELL INICIO'
    },
    {
      accessorKey: 'direction_cell_start',
      header: 'DIRECCIÓN CELL INICIO'
    },
    {
      accessorKey: 'region_cell_start',
      header: 'ALCALDIA CELL INICIO'
    },
    {
      accessorKey: 'audit_by',
      header: 'AUDITADO POR'
    },
    {
      accessorKey: 'follow_up',
      header: 'SEGIMIENTO'
    },
    {
      accessorKey: 'obtained_from',
      header: 'OBTENIDO DESDE'
    },
    {
      accessorKey: 'tag',
      header: 'RÓTULO',
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
      header: 'CLASIFICACIÓN',
      cell: ({ getValue }) => {
        let text = ''
        let starsClass = {
          one: 'text-slate-400',
          two: 'text-slate-400',
          three: 'text-slate-400'
        }

        switch (getValue()) {
          case EvidenceClasification.RELEVANT:
            text = 'Relevante'
            starsClass = {
              one: 'text-yellow-500',
              two: 'text-yellow-500',
              three: 'text-yellow-500'
            }
            break
          case EvidenceClasification.NOT_RELEVANT:
            text = 'No relevante'
            starsClass = {
              one: 'text-yellow-500',
              two: 'text-yellow-500',
              three: starsClass.three
            }
            break
          case EvidenceClasification.DISCARDED:
            text = 'Descartado'
            break
          default:
            text = 'Descartado'
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
      header: 'TIPO',
      cell: ({ getValue }) => {
        let type = ''

        switch (getValue()) {
          case 0:
            type = 'Audio'
            break
          case 1:
            type = 'Video'
            break
          case 2:
            type = 'Imagen'
            break
          case 3:
            type = 'Documento'
            break

          default:
            type = 'Audio'
            break
        }

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
