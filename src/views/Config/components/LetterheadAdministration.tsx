import { TrashIcon } from '@heroicons/react/24/outline'
import Button from 'components/Button'
import IconButton from 'components/Button/IconButton'
import DeleteDialog from 'components/DeleteDialog'
import Checkbox from 'components/Form/Checkbox'
import Grid from 'components/Grid'
import IndeterminateCheckbox from 'components/Table/IndeterminateCheckbox'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { useDrawer } from 'context/Drawer'
import { format } from 'date-fns'
import { generalMessages } from 'globalMessages'
import { ReactElement, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { letterheadAdministrationMessages, messages } from '../messages'
import LetterheadDrawer from './LetterheadDrawer'

type SelectedLetterheads = Record<string, boolean>

interface Letterhead {
  id: string
  name: string
  organizationName: string
  documentType: 'xls' | 'pdf' | 'csv' | 'word'
  date: string
  fileName: string
}

const LetterheadAdministration = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useDrawer()
  const [selected, setSelected] = useState<SelectedLetterheads>({})
  const [openDeleteDrawer, setOpenDeleteDrawer] = useState<boolean>(false)
  const demo = useMemo<Letterhead[]>(
    () => [
      {
        id: '000',
        documentType: 'pdf',
        fileName: 'FBI_logo.png',
        name: 'FBI',
        organizationName: 'Federal Bureau Intelligence',
        date: '2022-12-02T16:00:00.000Z'
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
          console.log(data)
          setOpenDeleteDrawer(false)
        }}
        open={openDeleteDrawer}
        onClose={() => setOpenDeleteDrawer(false)}
        title={formatMessage(letterheadAdministrationMessages.deleteLetterhead)}
        question={formatMessage(
          letterheadAdministrationMessages.firstDeleteStep
        )}
        confirmation={formatMessage(
          letterheadAdministrationMessages.secondDeleteStep
        )}
      />
      <div className="flex items-center justify-between mb-3">
        <Typography className="text-secondary uppercase" style="medium">
          {formatMessage(generalMessages.letterhead)}
        </Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() =>
            actions?.handleOpenDrawer({
              title: (
                <Typography
                  variant="title"
                  className="text-secondary font-extrabold uppercase !text-lg"
                >
                  {formatMessage(
                    letterheadAdministrationMessages.createLetterhead
                  )}
                </Typography>
              ),
              body: (
                <LetterheadDrawer
                  onAccept={async () => {}}
                  subtitle={formatMessage(
                    letterheadAdministrationMessages.createLetterheadSubtitle
                  )}
                />
              )
            })
          }
        >
          {formatMessage(letterheadAdministrationMessages.createLetterhead)}
        </Button>
      </div>
      <ViewFilter
        fields={[
          {
            name: 'xls',
            label: 'XLS'
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
                onClick={() =>
                  actions?.handleOpenDrawer({
                    title: (
                      <Typography
                        className="text-secondary font-extrabold uppercase !text-lg"
                        variant="title"
                      >
                        {formatMessage(
                          letterheadAdministrationMessages.letterheadData
                        )}
                      </Typography>
                    ),
                    body: (
                      <LetterheadDrawer
                        onAccept={async () => {}}
                        subtitle={formatMessage(
                          letterheadAdministrationMessages.letterheadDataSubtitle
                        )}
                        initialValues={{
                          documentType: item.documentType,
                          letterheadName: item.name,
                          organizationName: item.organizationName,
                          file: null
                        }}
                        fileName={item.fileName}
                      />
                    )
                  })
                }
              >
                <Typography style="bold" className="text-secondary">
                  {item.name}
                </Typography>
                <Typography className="text-secondary">
                  {format(new Date(item.date), 'dd/MM/yyyy - hh:mm:ss')}
                </Typography>
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
      </div>
    </div>
  )
}

export default LetterheadAdministration
