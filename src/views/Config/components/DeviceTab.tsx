import DeleteDialog from 'components/DeleteDialog'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { formMessages, generalMessages } from 'globalMessages'
import { useDrawer } from 'context/Drawer'
import MediaDrawer from './MediaDrawer'
import GeneralMediaList from './GeneralMediaList'
import EditDeviceDrawer from './EditDeviceDrawer'
import { useDevices } from 'context/Devices'
import { get } from 'lodash'
import useToast from 'hooks/useToast'
import { useAuth } from 'context/Auth'

const DeviceTab = (): ReactElement => {
  const { data, actions } = useDevices()
  const { actions: drawerActions } = useDrawer()
  const { actions: authActions } = useAuth()

  const { formatMessage } = useIntl()
  const toast = useToast()

  const [openDelete, setOpenDelete] = useState(false)
  const [deleteIds, setDeleteIds] = useState<string[]>([])

  useEffect(() => {
    actions?.getData()
  }, [])

  const handleDelete = async (password: string): Promise<void> => {
    try {
      const isCorrectPassword = await authActions?.verifyPassword(password)
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
      setOpenDelete(false)
      await actions?.getData({ page: 1 })
    } catch {}
  }

  const handleUpdate = async (data: any): Promise<void> => {
    const res = await actions?.update({
      id: data.id as string,
      medium_id: data.medium.value,
      name: data.name
    })
    if (res) {
      await actions?.getData()
      drawerActions?.handleCloseDrawer()
    }
  }

  const handleCreate = async (data: any): Promise<void> => {
    const res = await actions?.create({
      name: data.name,
      medium_id: data.medium.value
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
        open={openDelete}
        onClose={() => setOpenDelete(false)}
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
            {formatMessage(mediaMessages.devices)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} className="flex justify-end">
          <ViewFilter
            fields={[
              { label: formatMessage(formMessages.name), name: 'Nombre' }
            ]}
            action={{
              label: formatMessage(mediaMessages.addDevice),
              onClick: () =>
                drawerActions?.handleOpenDrawer({
                  title: (
                    <Typography className="text-secondary font-extrabold uppercase !text-lg">
                      {formatMessage(mediaMessages.addDevice)}
                    </Typography>
                  ),
                  body: (
                    <MediaDrawer formType="device" onAccept={handleCreate} />
                  )
                })
            }}
          />
        </Grid>
        <Grid item xs={12} className="mt-4">
          <GeneralMediaList
            type="device"
            data={data}
            handleEdit={(row) =>
              drawerActions?.handleOpenDrawer({
                title: (
                  <Typography
                    className="text-secondary font-extrabold uppercase !text-lg"
                    variant="title"
                  >
                    {formatMessage(mediaMessages.deviceData)}
                  </Typography>
                ),
                body: (
                  <EditDeviceDrawer
                    onAccept={handleUpdate}
                    subtitle={formatMessage(mediaMessages.actualDeviceData)}
                    initialValues={{
                      id: row.id,
                      medium_id: row.medium_id,
                      name: row.name,
                      medium: {
                        value: row.medium_id,
                        label: get(row, 'medium')
                      }
                    }}
                  />
                )
              })
            }
            handleDelete={(row) => {
              setDeleteIds([row.id])
              setOpenDelete(true)
            }}
            handleMultipleDelete={(items) => {
              setDeleteIds(items.map((item) => item.id))
              setOpenDelete(true)
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default DeviceTab
