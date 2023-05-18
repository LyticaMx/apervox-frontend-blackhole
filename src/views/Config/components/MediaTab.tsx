import DeleteDialog from 'components/DeleteDialog'
import { useDrawer } from 'context/Drawer'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { formMessages } from 'globalMessages'
import MediaDrawer from './MediaDrawer'
import GeneralMediaList from './GeneralMediaList'
import EditMediaDrawer from './EditMediaDrawer'
import { useAcquisitionMediums } from 'context/AcquisitionMediums'

const MediaTab = (): ReactElement => {
  const { data } = useAcquisitionMediums()
  const [openDeleteMedia, setOpenDeleteMedia] = useState(false)
  const { actions: drawerActions } = useDrawer()
  const { formatMessage } = useIntl()

  return (
    <div className="mt-2">
      <DeleteDialog
        onAccept={(data) => {
          console.log(data)
          setOpenDeleteMedia(false)
        }}
        open={openDeleteMedia}
        onClose={() => setOpenDeleteMedia(false)}
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
            {formatMessage(mediaMessages.media)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} className="flex justify-end">
          <ViewFilter
            fields={[
              { label: formatMessage(formMessages.name), name: 'Nombre' }
            ]}
            action={{
              label: formatMessage(mediaMessages.addMedia),
              onClick: () =>
                drawerActions?.handleOpenDrawer({
                  title: (
                    <Typography className="text-secondary font-extrabold uppercase !text-lg">
                      {formatMessage(mediaMessages.addMedia)}
                    </Typography>
                  ),
                  body: (
                    <MediaDrawer formType="media" onAccept={async () => {}} />
                  )
                })
            }}
          />
        </Grid>
        <Grid item xs={12} className="mt-4">
          <GeneralMediaList
            type="medium"
            data={data}
            handleEdit={(row) =>
              drawerActions?.handleOpenDrawer({
                title: (
                  <Typography
                    className="text-secondary font-extrabold uppercase !text-lg"
                    variant="title"
                  >
                    {formatMessage(mediaMessages.mediaData)}
                  </Typography>
                ),
                body: (
                  <EditMediaDrawer
                    initialValues={{ name: row.name }}
                    onAccept={async () => {}}
                    subtitle={formatMessage(mediaMessages.actualMediaData)}
                  />
                )
              })
            }
            handleDelete={() => {
              console.log('entramos?')
              setOpenDeleteMedia(true)
            }}
            handleMultipleDelete={async () => true}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default MediaTab
