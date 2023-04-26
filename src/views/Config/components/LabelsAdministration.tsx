import { ReactElement, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { TrashIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

import { useDrawer } from 'context/Drawer'
import { Label } from 'types/label'
import { generalMessages, platformMessages } from 'globalMessages'

import DeleteDialog from 'components/DeleteDialog'
import ViewFilter from 'components/ViewFilter'
import Pagination from 'components/Table/Pagination'
import IconButton from 'components/Button/IconButton'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import Checkbox from 'components/Form/Checkbox'
import Button from 'components/Button'
import IndeterminateCheckbox from 'components/Table/IndeterminateCheckbox'

import LabelDrawer from './LabelDrawer'
import { labelsAdministrationMessages, messages } from '../messages'

type SelectedLabels = Record<string, boolean>

const LabelsAdministration = (): ReactElement => {
  const { formatMessage } = useIntl()
  const [selected, setSelected] = useState<SelectedLabels>({})
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState<boolean>(false)
  const { actions } = useDrawer()
  const demo = useMemo<Label[]>(
    () => [
      {
        id: '000000',
        color: '#53DC80',
        name: 'Secuestro',
        created_at: '2022-12-02T16:00:00.000Z',
        evidence_type: 'audio'
      },
      {
        id: '000001',
        color: '#E020F5',
        name: 'BCC',
        created_at: '2022-11-28T16:00:00.000Z',
        evidence_type: 'audio'
      },
      {
        id: '000002',
        color: '#2596BE',
        name: 'BSC',
        created_at: '2022-11-28T16:05:00.000Z',
        evidence_type: 'audio'
      },
      {
        id: '0000003',
        color: '#E28743',
        name: 'Evento duplicado',
        created_at: '2022-11-28T16:04:00.000Z',
        evidence_type: 'audio'
      },
      {
        id: '0000004',
        color: '#EE0000',
        name: 'Error',
        created_at: '2022-11-28T13:04:00.000Z',
        evidence_type: 'audio'
      }
    ],
    []
  )

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
        demo.reduce((carry, item) => {
          if (!carry[item.id]) carry[item.id] = true
          return carry
        }, {})
      )
      return
    }
    setSelected({})
  }

  const totalSelected = useMemo(() => Object.keys(selected).length, [selected])

  return (
    <div>
      <DeleteDialog
        onAccept={(data) => {
          setOpenDeleteDrawer(false)
        }}
        open={openDeleteDrawer}
        onClose={() => setOpenDeleteDrawer(false)}
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
          onClick={() =>
            actions?.handleOpenDrawer({
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
                  onAccept={async () => {
                    actions?.handleCloseDrawer()
                  }}
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
        fields={[
          {
            name: 'audio',
            label: formatMessage(platformMessages.audioEvidence)
          }
        ]}
      />
      <div className="mt-3">
        {totalSelected > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IndeterminateCheckbox
                indeterminate={
                  demo.length !== totalSelected && totalSelected > 0
                }
                checked={demo.length === totalSelected}
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
            >
              <TrashIcon className="w-5 h-5" />
            </IconButton>
          </div>
        )}
        <Grid spacing={2} className="max-h-[15rem] overflow-y-auto pb-2">
          {demo.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
              key={item.id}
              className="border rounded px-1 py-2 flex flex-col justify-between max-h-40 hover:bg-gray-100 hover:cursor-pointer"
            >
              <div
                className="flex gap-1"
                onClick={() =>
                  actions?.handleOpenDrawer({
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
                        onAccept={async (data) => {}}
                        initialValues={{
                          name: item.name,
                          evidenceType: item.evidence_type,
                          color: item.color
                        }}
                      />
                    )
                  })
                }
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
                  onClick={() => setOpenDeleteDrawer(true)}
                >
                  <TrashIcon className="w-5 h-5" />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
        <Pagination
          currentPage={1}
          onPageChange={() => {}}
          pageSize={10}
          totalCount={2}
          manualLimit={{
            onChangeLimit: () => {},
            options: [10]
          }}
        />
      </div>
    </div>
  )
}

export default LabelsAdministration
