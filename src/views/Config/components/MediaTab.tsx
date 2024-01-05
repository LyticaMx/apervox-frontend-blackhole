import DeleteDialog from 'components/DeleteDialog'
import { useDrawer } from 'context/Drawer'
import { ReactElement, useEffect, useState } from 'react'
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
import { formatTotal } from 'utils/formatTotal'
import { ModuleAuditsTypes, useModuleAudits } from 'context/Audit'
import { ACTION, SUBJECT, useAbility } from 'context/Ability'
import useToast from 'hooks/useToast'

interface FormValues {
  id?: string
  name: string
}

const MediaTab = (): ReactElement => {
  const { data, total, dateFilter, searchFilter, actions } =
    useAcquisitionMediums()
  const { actions: drawerActions } = useDrawer()
  const { formatMessage } = useIntl()
  const [openDeleteMedia, setOpenDeleteMedia] = useState(false)
  const [deleteIds, setDeleteIds] = useState<string[]>([])
  const { actions: auditActions } = useModuleAudits()
  const ability = useAbility()
  const toast = useToast()

  useEffect(() => {
    actions?.getData({}, true)
    auditActions?.genAudit(
      ModuleAuditsTypes.AuditableModules.ACQUISITION_MEDIUMS
    )
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
      setOpenDeleteMedia(false)
      toast.success(formatMessage(mediaMessages.deletedMedia))
      await actions?.getData({ page: 1 }, true)
    } catch {}
  }

  const handleUpdate = async (data: FormValues): Promise<void> => {
    const res = await actions?.update({
      id: data.id as string,
      name: data.name
    })

    if (res) {
      toast.success(formatMessage(mediaMessages.updatedMedia))
      await actions?.getData()
      drawerActions?.handleCloseDrawer()
    }
  }

  const handleCreate = async (data: FormValues): Promise<void> => {
    const res = await actions?.create({
      name: data.name
    })

    if (res) {
      toast.success(formatMessage(mediaMessages.createdMedia))
      await actions?.getData({}, true)
      drawerActions?.handleCloseDrawer()
    }
  }

  return (
    <div className="mt-2">
      <DeleteDialog
        onAccept={handleDelete}
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
          <p className="uppercase">
            {formatTotal(total, formatMessage(mediaMessages.mediaSubtitle))}
          </p>
        </Grid>
        <Grid item xs={12} md={7} className="flex justify-end">
          <ViewFilter
            fields={[{ label: formatMessage(formMessages.name), name: 'name' }]}
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
                }),
              disabled: ability.cannot(
                ACTION.CREATE,
                SUBJECT.ACQUISITION_MEDIUMS
              )
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
            type="medium"
            data={data}
            handleEdit={(row) => {
              if (ability.cannot(ACTION.UPDATE, SUBJECT.ACQUISITION_MEDIUMS)) {
                return
              }
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
            }}
            disableDelete={ability.cannot(
              ACTION.UPDATE,
              SUBJECT.ACQUISITION_MEDIUMS
            )}
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
