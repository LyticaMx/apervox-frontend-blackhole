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
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { letterheadAdministrationMessages, messages } from '../messages'
import LetterheadDrawer from './LetterheadDrawer'
import { useLetterheads } from 'context/Letterheads'
import Pagination from 'components/Table/Pagination'
import useToast from 'hooks/useToast'
import { useAuth } from 'context/Auth'

type SelectedLetterheads = Record<string, boolean>

const LetterheadAdministration = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useDrawer()
  const {
    data,
    pagination,
    dateFilter,
    searchFilter,
    actions: letterheadActions
  } = useLetterheads()
  const { actions: authActions } = useAuth()
  const [selected, setSelected] = useState<SelectedLetterheads>({})
  const [deleteIds, setDeleteIds] = useState<string[]>([])
  const toast = useToast()

  useEffect(() => {
    letterheadActions?.getData()
  }, [])

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

  const handleDelete = async (password: string): Promise<void> => {
    try {
      const isCorrectPassword = await authActions?.verifyPassword(password)
      if (!isCorrectPassword) {
        toast.danger(formatMessage(generalMessages.incorrectPassword))
        return
      }
      let deleted = false
      if (deleteIds.length === 1) {
        deleted = (await letterheadActions?.delete(deleteIds[0])) ?? false
      } else {
        deleted = (await letterheadActions?.deleteAll(deleteIds)) ?? false
        if (deleted) setSelected({})
      }
      if (!deleted) return
      toast.success(
        formatMessage(letterheadAdministrationMessages.successfullyDeleted, {
          total: deleteIds.length
        })
      )
      setDeleteIds([])
      await letterheadActions?.getData({ page: 1 })
    } catch {}
  }

  const selectedIds = useMemo(() => Object.keys(selected), [selected])

  const totalSelected = selectedIds.length

  return (
    <div>
      <DeleteDialog
        onAccept={async (data) => await handleDelete(data.password)}
        open={deleteIds.length > 0}
        onClose={() => setDeleteIds([])}
        title={formatMessage(letterheadAdministrationMessages.deleteLetterhead)}
        question={formatMessage(
          letterheadAdministrationMessages.firstDeleteStep,
          { total: deleteIds.length }
        )}
        confirmation={formatMessage(
          letterheadAdministrationMessages.secondDeleteStep,
          { total: deleteIds.length }
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
                  onAccept={async (values) => {
                    const created = await letterheadActions?.create({
                      doc_type: values.documentType,
                      image: '',
                      file: values.file,
                      name: values.letterheadName,
                      organization_name: values.organizationName
                    })
                    if (!created) return
                    actions.handleCloseDrawer()
                    toast.success(
                      formatMessage(
                        letterheadAdministrationMessages.successfullyCreated
                      )
                    )
                    await letterheadActions?.getData()
                  }}
                  subtitle={formatMessage(
                    letterheadAdministrationMessages.createLetterheadSubtitle
                  )}
                />
              ),
              type: 'drawer'
            })
          }
        >
          {formatMessage(letterheadAdministrationMessages.createLetterhead)}
        </Button>
      </div>
      <ViewFilter
        fields={[
          {
            name: 'name',
            label: formatMessage(
              letterheadAdministrationMessages.letterheadName
            )
          },
          {
            name: 'organization_name',
            label: formatMessage(
              letterheadAdministrationMessages.organizationName
            )
          }
        ]}
        initialValues={{
          dateRange: {
            start_time: dateFilter.start_time,
            end_time: dateFilter.end_time
          },
          search: searchFilter.query,
          fields: searchFilter.filters
        }}
        onChange={(data) =>
          letterheadActions?.getData({
            start_time: data.dateRange[0],
            end_time: data.dateRange[1],
            clearDates: data.clearDates,
            filters: data.filterByField.fields,
            query: data.filterByField.search
          })
        }
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
              onClick={() => setDeleteIds(selectedIds)}
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
                        onAccept={async (values) => {
                          const updated = await letterheadActions?.update({
                            id: item.id,
                            doc_type: values.documentType,
                            image: item.image,
                            name: values.letterheadName,
                            organization_name: values.organizationName,
                            file: values.file
                          })
                          if (!updated) return
                          actions.handleCloseDrawer()
                          toast.success(
                            formatMessage(
                              letterheadAdministrationMessages.successfullyUpdated
                            )
                          )
                          await letterheadActions?.getData()
                        }}
                        subtitle={formatMessage(
                          letterheadAdministrationMessages.letterheadDataSubtitle
                        )}
                        initialValues={{
                          documentType: item.doc_type as any,
                          letterheadName: item.name,
                          organizationName: item.organization_name,
                          file: null
                        }}
                        fileName={item.image}
                      />
                    )
                  })
                }
              >
                <Typography style="bold" className="text-secondary">
                  {item.name}
                </Typography>
                <Typography className="text-secondary">
                  {format(
                    new Date(item.created_at ?? 0),
                    'dd/MM/yyyy - hh:mm:ss'
                  )}
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
                  onClick={() => setDeleteIds([item.id])}
                  disabled={totalSelected > 0}
                >
                  <TrashIcon className="w-5 h-5" />
                </IconButton>
              </div>
            </Grid>
          ))}
        </Grid>
        <Pagination
          currentPage={pagination.page}
          onPageChange={(page) =>
            letterheadActions?.getData({ page: page + 1 })
          }
          pageSize={pagination.limit}
          manualLimit={{
            options: pagination.limitOptions ?? [15],
            onChangeLimit: (page, limit) =>
              letterheadActions?.getData({ page: page + 1, limit })
          }}
          totalCount={pagination.totalRecords}
        />
      </div>
    </div>
  )
}

export default LetterheadAdministration
