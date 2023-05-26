import DeleteDialog from 'components/DeleteDialog'
import { useDrawer } from 'context/Drawer'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { formMessages, generalMessages } from 'globalMessages'
import MediaDrawer from './MediaDrawer'
import GeneralMediaList from './GeneralMediaList'
import EditMediaDrawer from './EditMediaDrawer'
import { useAcquisitionMediums } from 'context/AcquisitionMediums'
import { useAuth } from 'context/Auth'
import useToast from 'hooks/useToast'

interface FormValues {
  id?: string
  name: string
}

const MediaTab = (): ReactElement => {
  const { data, actions } = useAcquisitionMediums()
  const { actions: drawerActions } = useDrawer()
  const { actions: authActions } = useAuth()

  const { formatMessage } = useIntl()
  const toast = useToast()

  const [openDeleteMedia, setOpenDeleteMedia] = useState(false)
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
      setOpenDeleteMedia(false)
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
    console.log('🚀 ~ file: MediaTab.tsx:43 ~ handleCreate ~ data:', data)
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
                  body: <MediaDrawer formType="media" onAccept={handleCreate} />
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
                    initialValues={{ id: row.id, name: row.name }}
                    onAccept={handleUpdate}
                    subtitle={formatMessage(mediaMessages.actualMediaData)}
                  />
                )
              })
            }
            handleDelete={(row) => {
              setDeleteIds([row.id])
              setOpenDeleteMedia(true)
            }}
            handleMultipleDelete={(items) => {
              setDeleteIds(items.map((item) => item.id))
              setOpenDeleteMedia(true)
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default MediaTab
