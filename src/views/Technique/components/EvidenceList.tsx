import { ReactElement, useEffect } from 'react'
import { format } from 'date-fns'
import { useIntl } from 'react-intl'
import clsx from 'clsx'
import { StarIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useGlobalMessage } from 'hooks/useIntl'
import useTableColumns from 'hooks/useTableColumns'
import Table from 'components/Table'

import { evidenceListMessages } from '../messages'
import { useEvidences } from 'context/Evidences'
import Switch from 'components/Form/Switch'
import Label from 'components/Label'
import { Evidence } from 'context/Evidences/types'
import { generalMessages, platformMessages } from 'globalMessages'
import { useTechnique } from 'context/Technique'
import { secondsToString } from 'utils/timeToString'

interface Props {
  onSelectItem?: (rowSelected: Evidence) => void
}

const classifications = {
  relevant: { stars: 3, label: platformMessages.relevant },
  not_relevant: { stars: 2, label: platformMessages.irrelevant },
  discarded: { stars: 1, label: platformMessages.discarded },
  unclassified: { stars: 0, label: platformMessages.unseen }
}

const EvidenceList = ({ onSelectItem }: Props): ReactElement => {
  const { formatMessage } = useIntl()
  const getGlobalMessage = useGlobalMessage()
  const { target } = useTechnique()
  const { data, pagination, actions: evidencesActions } = useEvidences()

  useEffect(() => {
    evidencesActions?.getData({ page: 1 }, !target?.id)
  }, [target?.id])

  const columns = useTableColumns<Evidence>(() => [
    {
      accessorKey: 'evidenceNumber',
      header: formatMessage(evidenceListMessages.eventNumber).toUpperCase()
    },
    {
      accessorKey: 'targetPhone',
      header: formatMessage(evidenceListMessages.targetNumber).toUpperCase()
    },
    {
      accessorKey: 'sourceNumber',
      header: formatMessage(evidenceListMessages.sourceNumber).toUpperCase()
    },
    {
      accessorKey: 'callStartDate',
      header: formatMessage(evidenceListMessages.startDateTime).toUpperCase(),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'callEndDate',
      header: formatMessage(evidenceListMessages.endDateTime).toUpperCase(),
      cell: ({ getValue }) =>
        format(new Date(getValue<string>()), 'dd/MM/yyyy - HH:mm')
    },
    {
      accessorKey: 'duration',
      header: getGlobalMessage('duration', 'generalMessages').toUpperCase(),
      cell: ({ getValue }) => secondsToString(getValue<number>())
    },
    {
      accessorKey: 'carrier',
      header: formatMessage(evidenceListMessages.carrier).toUpperCase()
    },
    {
      accessorKey: 'imei',
      header: 'IMEI',
      enableSorting: false
    },
    {
      accessorKey: 'imsi',
      header: 'IMSI',
      enableSorting: false
    },
    {
      accessorKey: 'code_cell_start',
      header: formatMessage(evidenceListMessages.codeCellStart).toUpperCase(),
      enableSorting: false
    },
    {
      accessorKey: 'direction_cell_start',
      header: formatMessage(
        evidenceListMessages.directionCellStart
      ).toUpperCase(),
      enableSorting: false
    },
    {
      accessorKey: 'region_cell_start',
      header: formatMessage(
        evidenceListMessages.townhallCellStart
      ).toUpperCase(),
      enableSorting: false
    },
    {
      accessorKey: 'auditedBy',
      header: formatMessage(evidenceListMessages.auditedBy).toUpperCase()
    },
    {
      accessorKey: 'isTracked',
      header: formatMessage(evidenceListMessages.followUp).toUpperCase(),
      meta: {
        columnFilters: {
          options: [
            {
              name: formatMessage(evidenceListMessages.withFollow),
              value: 'withFollow'
            },
            {
              name: formatMessage(evidenceListMessages.withoutFollow),
              value: 'withoutFollow'
            },
            { name: formatMessage(generalMessages.both), value: 'both' }
          ],
          onChange: (follow) => evidencesActions?.getData({ follow })
        }
      },
      cell: ({ getValue, row }) => {
        const { trackedBy, id } = row.original

        return (
          <div className="flex items-center gap-1">
            <Switch
              color="primary"
              value={getValue<boolean>()}
              size="sm"
              stopPropagation
              onChange={() => {}}
            />
            <Label id={`switch-${id}`} labelClassname="mb-0">
              {trackedBy}
            </Label>
          </div>
        )
      }
    },
    {
      accessorKey: 'obtained_from',
      header: formatMessage(evidenceListMessages.obtainedFrom).toUpperCase()
    },
    {
      id: 'label',

      header: formatMessage(evidenceListMessages.tag).toUpperCase(),
      cell: ({ row }) => {
        const { label, otherLabel } = row.original
        if (!label && !otherLabel) return null

        return (
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                'h-4 w-4 rounded-full',
                otherLabel ? 'bg-muted' : ''
              )}
              style={{ backgroundColor: label ? label.color : '' }}
            />
            <p className="pr-1 py-0.5 text-sm"> {label?.name ?? otherLabel}</p>
          </div>
        )
      }
    },
    {
      accessorKey: 'relevance',
      header: formatMessage(evidenceListMessages.clasification).toUpperCase(),
      cell: ({ getValue }) => {
        const relevance = getValue<string>()

        if (!relevance) return null
        const formatted = classifications[relevance] ?? {
          stars: 0,
          label: platformMessages.unseen
        }

        return (
          <div className="flex items-center">
            <StarIcon
              className={clsx(
                'w-6 h-6',
                formatted.stars > 0 ? 'text-yellow-500' : 'text-slate-400'
              )}
            />
            <StarIcon
              className={clsx(
                'w-6 h-6',
                formatted.stars > 1 ? 'text-yellow-500' : 'text-slate-400'
              )}
            />
            <StarIcon
              className={clsx(
                'w-6 h-6 mr-2',
                formatted.stars > 2 ? 'text-yellow-500' : 'text-slate-400'
              )}
            />
            {formatMessage(formatted.label ?? '')}
          </div>
        )
      },
      meta: {
        columnFilters: {
          options: [
            {
              name: formatMessage(platformMessages.relevant),
              value: 'relevant'
            },
            {
              name: formatMessage(platformMessages.irrelevant),
              value: 'not_relevant'
            },
            {
              name: formatMessage(platformMessages.discarded),
              value: 'discarded'
            },
            {
              name: formatMessage(platformMessages.unseen),
              value: 'unclassified'
            }
          ],
          onChange: (relevance) => evidencesActions?.getData({ relevance }),
          multiple: true
        }
      }
    },
    {
      accessorKey: 'type',
      header: formatMessage(evidenceListMessages.type).toUpperCase(),
      cell: ({ getValue }) => {
        const types = ['Audio', 'Video', 'Imagen', 'Documento']
        const type = types[getValue<number>()] ?? types[0]

        return type
      },
      enableSorting: false
    }
  ])

  return (
    <Table
      columns={columns}
      data={data}
      className="overflow-x-auto shadow rounded-lg"
      manualSorting={{
        onSortingChange: (sort) => evidencesActions?.getData({ sort }),
        sorting: pagination.sort
      }}
      maxHeight={500}
      withCheckbox
      manualLimit={{
        options: [15, 25, 50, 100],
        onChangeLimit: (page, limit) =>
          evidencesActions?.getData({ page: page + 1, limit })
      }}
      pageSize={pagination.limit}
      manualPagination={{
        currentPage: pagination.page,
        totalRecords: pagination.totalRecords,
        onChange: (page) => evidencesActions?.getData({ page: page + 1 })
      }}
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
