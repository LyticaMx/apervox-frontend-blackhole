import DeleteDialog from 'components/DeleteDialog'
import { useDrawer } from 'context/Drawer'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { formMessages } from 'globalMessages'
import GeneralMediaList from './GeneralMediaList'
import CompanyDrawer from './CompanyDrawer'
import { useCarriers } from 'context/Carriers'
import { formatTotal } from 'utils/formatTotal'

interface FormValues {
  id?: string
  name: string
}

const CarrierTab = (): ReactElement => {
  const { data, total, dateFilter, searchFilter, actions } = useCarriers()
  const { actions: drawerActions } = useDrawer()
  const { formatMessage } = useIntl()

  const [openDeleteCarrier, setOpenDeleteCarrier] = useState(false)
  const [deleteIds, setDeleteIds] = useState<string[]>([])

  useEffect(() => {
    actions?.getData(undefined, true)
  }, [])

  const handleDelete = async (): Promise<void> => {
    try {
      let deleted = false
      if (deleteIds.length === 1) {
        deleted = (await actions?.delete(deleteIds[0])) ?? false
      } else {
        deleted = (await actions?.deleteAll(deleteIds)) ?? false

        if (deleted) setDeleteIds([])
      }

      if (!deleted) return

      setDeleteIds([])
      setOpenDeleteCarrier(false)
      await actions?.getData({ page: 1 }, true)
    } catch {}
  }
  const handleUpdate = async (data: FormValues): Promise<void> => {
    const res = await actions?.update({
      id: data.id as string,
      name: data.name
    })

    if (res) {
      await actions?.getData()
      drawerActions?.handleCloseDrawer()
    }
  }

  const handleCreate = async (data: FormValues): Promise<void> => {
    const res = await actions?.create({
      name: data.name
    })

    if (res) {
      await actions?.getData(undefined, true)
      drawerActions?.handleCloseDrawer()
    }
  }

  return (
    <div className="mt-2">
      <DeleteDialog
        onAccept={handleDelete}
        open={openDeleteCarrier}
        onClose={() => setOpenDeleteCarrier(false)}
        title={formatMessage(mediaMessages.deleteMedia)}
        question={formatMessage(mediaMessages.deleteQuestion)}
        confirmation={formatMessage(mediaMessages.deleteConfirmation)}
      />
      <Grid>
        <Grid item xs={12} md={5}>
          <Typography
            variant="subtitle"
            className="text-secondary uppercase font-semibold"
          >
            {formatMessage(mediaMessages.carriers)}
          </Typography>
          <p className="uppercase">
            {formatTotal(total, formatMessage(mediaMessages.carrierSubtitle))}
          </p>
        </Grid>
        <Grid item xs={12} md={7} className="flex justify-end">
          <ViewFilter
            fields={[{ label: formatMessage(formMessages.name), name: 'name' }]}
            action={{
              label: formatMessage(mediaMessages.createCarrier),
              onClick: () =>
                drawerActions?.handleOpenDrawer({
                  title: (
                    <Typography
                      className="text-secondary font-extrabold uppercase !text-lg"
                      variant="title"
                    >
                      {formatMessage(mediaMessages.createCarrier)}
                    </Typography>
                  ),
                  body: (
                    <CompanyDrawer
                      onAccept={handleCreate}
                      subtitle={formatMessage(
                        mediaMessages.createCarrierSubtitle
                      )}
                    />
                  )
                })
            }}
            initialValues={{
              dateRange: {
                start_time: dateFilter.start_time,
                end_time: dateFilter.end_time
              },
              search: searchFilter.query,
              fields: searchFilter.filters
            }}
            onChange={(data) =>
              actions?.getData({
                start_time: data.dateRange[0],
                end_time: data.dateRange[1],
                clearDates: data.clearDates,
                filters: data.filterByField.fields,
                query: data.filterByField.search
              })
            }
          />
        </Grid>
        <Grid item xs={12} className="mt-4">
          <GeneralMediaList
            type="carrier"
            data={data}
            handleEdit={(row) =>
              drawerActions?.handleOpenDrawer({
                title: (
                  <Typography
                    className="text-secondary font-extrabold uppercase !text-lg"
                    variant="title"
                  >
                    {formatMessage(mediaMessages.carrierData)}
                  </Typography>
                ),
                body: (
                  <CompanyDrawer
                    onAccept={handleUpdate}
                    subtitle={formatMessage(mediaMessages.actualCarrierData)}
                    initialValues={{
                      id: row.id,
                      name: row.name
                    }}
                  />
                )
              })
            }
            handleDelete={(row) => {
              setDeleteIds([row.id])
              setOpenDeleteCarrier(true)
            }}
            handleMultipleDelete={(items) => {
              setDeleteIds(items.map((item) => item.id))
              setOpenDeleteCarrier(true)
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default CarrierTab
