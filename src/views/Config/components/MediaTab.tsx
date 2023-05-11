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
import { Media } from '../Media'
import EditMediaDrawer from './EditMediaDrawer'

const MediaTab = (): ReactElement => {
  const [openDeleteMedia, setOpenDeleteMedia] = useState(false)
  const { actions: drawerActions } = useDrawer()
  const { formatMessage } = useIntl()

  const demo: Media[] = [
    {
      id: '02',
      date: '2023-01-21T20:19:23.032Z',
      name: 'ETSI',
      type: 'media'
    },
    {
      id: '03',
      date: '2023-01-21T20:19:23.032Z',
      name: 'FXS / FXSO',
      type: 'media'
    }
  ]

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
            data={demo}
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
            handleDelete={() => {}}
            handleMultipleDelete={async () => true}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default MediaTab
