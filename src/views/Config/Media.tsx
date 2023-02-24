import { TrashIcon } from '@heroicons/react/24/outline'
import { CellContext } from '@tanstack/react-table'
import IconButton from 'components/Button/IconButton'
import DeleteDialog from 'components/DeleteDialog'
import Grid from 'components/Grid'
import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { useDrawer } from 'context/Drawer'
import { format } from 'date-fns'
import { actionsMessages, platformMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import { SimpleDrawerConfig } from 'types/drawer'
import CompanyDrawer from './components/CompanyDrawer'
import EditDeviceDrawer from './components/EditDeviceDrawer'
import EditMediaDrawer from './components/EditMediaDrawer'
import MediaDrawer from './components/MediaDrawer'
import NavOptions from './components/NavOptions'
import { mediaMessages } from './messages'

interface MediaType {
  id: string
  name: string
  type: 'media' | 'carrier' | 'device'
  date: string
  deviceName?: string
}

const Media = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useDrawer()
  const [openDeleteMedia, setOpenDeleteMedia] = useState<boolean>(false)

  const renderMediaType = useCallback(
    ({ row }: CellContext<MediaType, unknown>): ReactElement => {
      const data = row.original
      const config = { color: '', letter: '', caption: '' }

      switch (data.type) {
        case 'carrier':
          config.color = '#E020F5'
          config.letter = 'O'
          config.caption = formatMessage(mediaMessages.carrierCaption)
          break
        case 'device':
          config.color = '#E8D903'
          config.letter = 'E'
          config.caption = formatMessage(mediaMessages.deviceCaption, {
            device: data.deviceName
          })
          break
        case 'media':
          config.color = '#4646FD'
          config.letter = 'm'
          config.caption = formatMessage(platformMessages.inputMedium)
          break
        default:
          break
      }

      return (
        <div className="w-[500px] flex items-center gap-2" key={data.id}>
          <div
            className="rounded-full h-7 w-7 flex items-center justify-center"
            style={{ backgroundColor: config.color }}
          >
            <span className="text-white uppercase font-bold">
              {config.letter}
            </span>
          </div>
          <div>
            <Typography className="text-secondary !text-base !leading-3">
              {data.name}
            </Typography>
            <Typography className="text-secondary-gray !text-sm !leading-4">
              {config.caption}
            </Typography>
          </div>
        </div>
      )
    },
    []
  )

  const columns = useTableColumns<MediaType>(() => [
    {
      header: '',
      accessorKey: 'id',
      cell: renderMediaType
    },
    {
      header: '',
      accessorKey: 'date',
      cell: ({ getValue }) => (
        <span className="text-secondary-gray">
          {format(new Date(getValue<string>()), 'dd/MM/yyyy - hh:mm')}
        </span>
      )
    },
    {
      header: '',
      accessorKey: 'id',
      cell: ({ row }) => (
        <Tooltip
          content={formatMessage(actionsMessages.delete)}
          floatProps={{ offset: 10, arrow: true }}
          classNames={{
            panel:
              'bg-secondary text-white py-1 px-2 rounded-md text-sm whitespace-nowrap',
            arrow: 'absolute bg-white w-2 h-2 rounded-full bg-secondary'
          }}
          placement="top"
        >
          <IconButton
            className="hover:text-primary"
            disabled={row.getIsSelected()}
            onClick={() => setOpenDeleteMedia(true)}
          >
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      )
    }
  ])

  const demo = useMemo<MediaType[]>(
    () => [
      {
        id: '01',
        date: '2023-01-21T20:19:23.032Z',
        name: 'Telcel',
        type: 'carrier'
      },
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
      },
      {
        id: '04',
        date: '2023-01-21T20:19:23.032Z',
        name: 'FXS / FXSO',
        type: 'device',
        deviceName: 'Grandstream Gateway GXW4232'
      }
    ],
    []
  )

  const handleEdit = useCallback(
    (row: MediaType): void => {
      const drawerConfig: SimpleDrawerConfig = { title: '', body: '' }
      switch (row.type) {
        case 'carrier':
          console.log(row)
          drawerConfig.title = (
            <Typography
              className="text-secondary font-extrabold uppercase !text-lg"
              variant="title"
            >
              {formatMessage(mediaMessages.carrierData)}
            </Typography>
          )
          drawerConfig.body = (
            <CompanyDrawer
              onAccept={async () => {}}
              subtitle={formatMessage(mediaMessages.actualCarrierData)}
              initialValues={{ name: row.name }}
            />
          )
          break
        case 'media':
          drawerConfig.title = (
            <Typography
              className="text-secondary font-extrabold uppercase !text-lg"
              variant="title"
            >
              {formatMessage(mediaMessages.mediaData)}
            </Typography>
          )
          drawerConfig.body = (
            <EditMediaDrawer
              initialValues={{ name: row.name }}
              onAccept={async () => {}}
              subtitle={formatMessage(mediaMessages.actualMediaData)}
            />
          )
          break
        case 'device':
          drawerConfig.title = (
            <Typography
              className="text-secondary font-extrabold uppercase !text-lg"
              variant="title"
            >
              {formatMessage(mediaMessages.deviceData)}
            </Typography>
          )
          drawerConfig.body = (
            <EditDeviceDrawer
              onAccept={async () => {}}
              subtitle={formatMessage(mediaMessages.actualDeviceData)}
              initialValues={{
                media: 'fxs/fxso',
                name: row.deviceName ?? 'bh - device'
              }}
            />
          )
          break
        default:
          break
      }

      actions?.handleOpenDrawer(drawerConfig)
    },
    [actions?.handleOpenDrawer]
  )

  return (
    <div>
      <NavOptions />
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
            variant="title"
            className="text-secondary font-[900] uppercase"
          >
            {formatMessage(mediaMessages.title)}
          </Typography>
          <Typography
            variant="subtitle"
            className="text-secondary uppercase font-semibold"
          >
            {formatMessage(mediaMessages.counters, {
              media: '04',
              devices: '01',
              carriers: '03'
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <ViewFilter
            fields={[
              {
                label: 'Medio',
                name: 'media'
              },
              {
                label: 'Equipo',
                name: 'device'
              },
              {
                label: 'Compañia telefónica',
                name: 'carrier'
              }
            ]}
            action={[
              {
                label: formatMessage(mediaMessages.createCarrier),
                onClick: () =>
                  actions?.handleOpenDrawer({
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
                        onAccept={async () => {}}
                        subtitle={formatMessage(
                          mediaMessages.createCarrierSubtitle
                        )}
                      />
                    )
                  })
              },
              {
                label: formatMessage(mediaMessages.addMedia),
                onClick: () =>
                  actions?.handleOpenDrawer({
                    title: (
                      <Typography
                        className="text-secondary font-extrabold uppercase !text-lg"
                        variant="title"
                      >
                        {formatMessage(mediaMessages.addMediaOrDevice)}
                      </Typography>
                    ),

                    body: (
                      <MediaDrawer
                        onAccept={async () => {}}
                        subtitle={formatMessage(
                          mediaMessages.selectMediaOrDevice
                        )}
                      />
                    )
                  })
              }
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <Table
            columns={columns}
            data={demo}
            withCheckbox
            rowConfig={{ paddingSize: 'sm' }}
            actionsForSelectedItems={[
              {
                action: () => setOpenDeleteMedia(true),
                Icon: TrashIcon,
                name: 'deleteMedia'
              }
            ]}
            onRowClicked={handleEdit}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Media
