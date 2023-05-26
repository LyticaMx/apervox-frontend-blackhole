import DeleteDialog from 'components/DeleteDialog'
import { useDrawer } from 'context/Drawer'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { formMessages, generalMessages } from 'globalMessages'
import GeneralMediaList from './GeneralMediaList'
import CompanyDrawer from './CompanyDrawer'
import { useCarriers } from 'context/Carriers'
import { useAuth } from 'context/Auth'
import useToast from 'hooks/useToast'
import { useSettings } from 'context/Settings'

interface FormValues {
  id?: string
  name: string
}

const CarrierTab = (): ReactElement => {
  const { data, actions } = useCarriers()
  const { actions: drawerActions } = useDrawer()
  const { actions: authActions } = useAuth()
  const { settings } = useSettings()

  const { formatMessage } = useIntl()
  const toast = useToast()

  const [openDeleteCarrier, setOpenDeleteCarrier] = useState(false)
  const [deleteIds, setDeleteIds] = useState<string[]>([])

  useEffect(() => {
    actions?.getData()
  }, [])

  const handleDelete = async (password: string): Promise<void> => {
    try {
      const isCorrectPassword = settings.doubleValidation
        ? await authActions?.verifyPassword(password)
        : true
      if (!isCorrectPassword) {
        toast.danger(formatMessage(generalMessages.incorrectPassword))
        return
      }

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
      await actions?.getData({ page: 1 })
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
      await actions?.getData()
      drawerActions?.handleCloseDrawer()
    }
  }

  return (
    <div className="mt-2">
      <DeleteDialog
        onAccept={async (data) => await handleDelete(data.password)}
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
        </Grid>
        <Grid item xs={12} md={7} className="flex justify-end">
          <ViewFilter
            fields={[
              { label: formatMessage(formMessages.name), name: 'Nombre' }
            ]}
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
