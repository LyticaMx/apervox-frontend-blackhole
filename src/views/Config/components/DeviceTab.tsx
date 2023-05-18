import DeleteDialog from 'components/DeleteDialog'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { formMessages } from 'globalMessages'
import { useDrawer } from 'context/Drawer'
import MediaDrawer from './MediaDrawer'
import GeneralMediaList from './GeneralMediaList'
import EditDeviceDrawer from './EditDeviceDrawer'
import { useDevices } from 'context/Devices'

const DeviceTab = (): ReactElement => {
  const { data } = useDevices()
  const [openDeleteDevice, setOpenDeleteDevice] = useState(false)
  const { actions: drawerActions } = useDrawer()
  const { formatMessage } = useIntl()

  return (
    <div className="mt-2">
      <DeleteDialog
        onAccept={(data) => {
          setOpenDeleteDevice(false)
        }}
        open={openDeleteDevice}
        onClose={() => setOpenDeleteDevice(false)}
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
                    <MediaDrawer formType="device" onAccept={async () => {}} />
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
                    onAccept={async () => {}}
                    subtitle={formatMessage(mediaMessages.actualDeviceData)}
                    initialValues={{
                      media: 'fxs/fxso',
                      name: 'bh - device'
                    }}
                  />
                )
              })
            }
            handleDelete={() => {
              setOpenDeleteDevice(true)
            }}
            handleMultipleDelete={async () => true}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default DeviceTab
