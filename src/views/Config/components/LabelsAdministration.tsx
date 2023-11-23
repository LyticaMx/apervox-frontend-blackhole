import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { TrashIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

import { useDrawer } from 'context/Drawer'
import { generalMessages } from 'globalMessages'

import DeleteDialog from 'components/DeleteDialog'
import ViewFilter from 'components/ViewFilter'
import Pagination from 'components/Table/Pagination'
import IconButton from 'components/Button/IconButton'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import Checkbox from 'components/Form/Checkbox'
import Button from 'components/Button'
import IndeterminateCheckbox from 'components/Table/IndeterminateCheckbox'

import LabelDrawer, { FormValues } from './LabelDrawer'
import { labelsAdministrationMessages, messages } from '../messages'
import { useLabels } from 'context/Labels'
import { Label } from 'types/label'
import { StaticFilter } from 'components/FilterByField'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'

type SelectedLabels = Record<string, boolean>

const LabelsAdministration = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { data, actions, pagination, searchFilter, dateFilter } = useLabels()
  const { actions: aDrawer } = useDrawer()
  const [label, setLabel] = useState<Label | undefined>()
  const [selected, setSelected] = useState<SelectedLabels>({})
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState<boolean>(false)
  const ability = useAbility()

  useEffect(() => {
    actions?.getData()
  }, [])

  const items = [{ label: 'Nombre', name: 'name' }]
  const staticFilters: StaticFilter[] = [
    {
      label: formatMessage(labelsAdministrationMessages.evidenceType),
      name: 'label_type',
      options: [
        {
          name: formatMessage(labelsAdministrationMessages.evidenceTypeAll),
          value: 'all'
        },
        {
          name: formatMessage(labelsAdministrationMessages.evidenceTypeAudio),
          value: 'audio'
        },
        {
          name: formatMessage(labelsAdministrationMessages.evidenceTypeVideo),
          value: 'video'
        },
        {
          name: formatMessage(labelsAdministrationMessages.evidenceTypeImage),
          value: 'image'
        },
        {
          name: formatMessage(
            labelsAdministrationMessages.evidenceTypeDocument
          ),
          value: 'document'
        }
      ]
    }
  ]

  const handleSelected = (id, val): void => {
    if (val) {
      setSelected((old) => ({ ...old, [id]: true }))
      return
    }
    setSelected((old) => {
      const { [id]: _, ...other } = old
      return other
    })
  }

  const toggleSelection = (selectAll): void => {
    if (selectAll) {
      setSelected(
        data.reduce((carry, item) => {
          if (!carry[item.id]) carry[item.id] = true
          return carry
        }, {})
      )
      return
    }
    setSelected({})
  }

  const totalSelected = useMemo(() => Object.keys(selected).length, [selected])

  const handleDelete = async (): Promise<void> => {
    try {
      if (label) await actions?.delete(label.id)
      if (totalSelected) await actions?.deleteAll(Object.keys(selected))

      setSelected({})
      setLabel(undefined)
      setOpenDeleteDrawer(false)
      await actions?.getData()
    } catch {}
  }

  const handleUpdate = async (data: FormValues): Promise<void> => {
    const res = await actions?.update({
      id: data.id as string,
      name: data.name,
      color: data.color,
      label_type: data.labelType
    })

    if (res) {
      await actions?.getData()
      aDrawer?.handleCloseDrawer()
    }
  }

  const handleCreate = async (data: FormValues): Promise<void> => {
    const res = await actions?.create({
      name: data.name,
      color: data.color,
      label_type: data.labelType
    })

    if (res) {
      await actions?.getData()
      aDrawer?.handleCloseDrawer()
    }
  }

  return (
    <div>
      <DeleteDialog
        onAccept={handleDelete}
        open={openDeleteDrawer}
        onClose={() => {
          setOpenDeleteDrawer(false)
          setLabel(undefined)
        }}
        title={formatMessage(labelsAdministrationMessages.deleteLabel)}
        question={formatMessage(labelsAdministrationMessages.firstDeleteStep)}
        confirmation={formatMessage(
          labelsAdministrationMessages.secondDeleteStep
        )}
      />
      <div className="flex items-center justify-between mb-3">
        <Typography className="text-secondary uppercase" style="medium">
          {formatMessage(generalMessages.labels)}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          disabled={ability.cannot(ACTION.CREATE, SUBJECT.LABELS)}
          onClick={() =>
            aDrawer?.handleOpenDrawer({
              title: (
                <Typography
                  className="text-secondary font-extrabold uppercase !text-lg"
                  variant="title"
                >
                  {formatMessage(labelsAdministrationMessages.createLabel)}
                </Typography>
              ),
              body: (
                <LabelDrawer
                  onAccept={handleCreate}
                  subtitle={formatMessage(
                    labelsAdministrationMessages.createLabelSubtitle
                  )}
                />
              )
            })
          }
        >
          {formatMessage(labelsAdministrationMessages.createLabel)}
        </Button>
      </div>
      <ViewFilter
        fields={items}
        staticFilters={staticFilters}
        initialValues={{
          dateRange: {
            start_time: dateFilter.start_time,
            end_time: dateFilter.end_time
          },
          fields: searchFilter.filters,
          search: searchFilter.query
        }}
        onChange={(data) => {
          const staticF = data.filterByField.staticFilters
          const labelType = staticF?.label_type

          actions?.getData({
            filters: data.filterByField.fields,
            query: data.filterByField.search,
            start_time: data.dateRange[0],
            end_time: data.dateRange[1],
            clearDates: data.clearDates,
            label_type: ['', 'all'].includes(labelType) ? undefined : labelType
          })
        }}
      />
      <div className="mt-3">
        {totalSelected > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IndeterminateCheckbox
                indeterminate={
                  data.length !== totalSelected && totalSelected > 0
                }
                checked={data.length === totalSelected}
                onChange={(e) => toggleSelection(e.currentTarget.checked)}
              />
              <Typography className="ml-4">
                {formatMessage(messages.itemsSelected, {
                  selected: totalSelected
                })}
              </Typography>
            </div>
            <IconButton
              className="!hover:text-primary"
              onClick={() => setOpenDeleteDrawer(true)}
              disabled={ability.cannot(ACTION.DELETE, SUBJECT.LABELS)}
            >
              <TrashIcon className="w-5 h-5" />
            </IconButton>
          </div>
        )}
        <Grid spacing={2} className="max-h-[15rem] overflow-y-auto pb-2">
          {data.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
              key={item.id}
              className="border rounded px-1 py-2 flex flex-col justify-between max-h-40 hover:bg-gray-100 hover:cursor-pointer"
            >
              <div
                className="flex gap-1"
                onClick={() => {
                  if (ability.cannot(ACTION.UPDATE, SUBJECT.LABELS)) return
                  aDrawer?.handleOpenDrawer({
                    title: (
                      <Typography
                        className="text-secondary font-extrabold uppercase !text-lg"
                        variant="title"
                      >
                        {formatMessage(labelsAdministrationMessages.labelData)}
                      </Typography>
                    ),
                    body: (
                      <LabelDrawer
                        subtitle={formatMessage(
                          labelsAdministrationMessages.editLabelSubtitle
                        )}
                        onAccept={handleUpdate}
                        initialValues={{
                          id: item.id,
                          name: item.name,
                          labelType: item.label_type,
                          color: item.color
                        }}
                      />
                    )
                  })
                }}
              >
                <div
                  className="rounded h-11 w-11 shrink-0 border"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <Typography className="text-secondary leading-4" style="bold">
                    {item.name}
                  </Typography>
                  <Typography className="text-secondary leading-4">
                    {format(new Date(item.created_at), 'dd/MM/yyyy - hh:mm:ss')}
                  </Typography>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Checkbox
                  label=""
                  checked={selected[item.id]}
                  onChange={(e) => handleSelected(item.id, e.target.checked)}
                />
                <IconButton
                  className="!hover:text-primary"
                  disabled={
                    ability.cannot(ACTION.DELETE, SUBJECT.LABELS) ||
                    totalSelected > 0
                  }
                  onClick={() => {
                    setLabel(item)
                    setOpenDeleteDrawer(true)
                  }}
                >
                  <TrashIcon className="w-5 h-5" />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
        <Pagination
          currentPage={pagination.page}
          onPageChange={(page) => actions?.getData({ page: page + 1 })}
          pageSize={pagination.limit}
          totalCount={pagination.totalRecords}
          manualLimit={{
            onChangeLimit: (page, limit) =>
              actions?.getData({ page: page + 1, limit }),
            options: pagination.limitOptions ?? [15]
          }}
        />
      </div>
    </div>
  )
}

export default LabelsAdministration
