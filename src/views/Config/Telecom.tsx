import { TrashIcon } from '@heroicons/react/24/outline'
import IconButton from 'components/Button/IconButton'
import DeleteDialog from 'components/DeleteDialog'
import Grid from 'components/Grid'
import Table from 'components/Table'
import Tooltip from 'components/Tooltip'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { useDrawer } from 'context/Drawer'
import { format } from 'date-fns'
import {
  actionsMessages,
  generalMessages,
  platformMessages
} from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'
import GeoreferenceDrawer from './components/GeoreferenceDrawer'
import NavOptions from './components/NavOptions'
import { telecomMessages } from './messages'

interface Georeference {
  id: string
  cellId: string
  latitude: string
  longitude: string
  date: string
}

const Telecom = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useDrawer()
  const [openDeleteGeo, setOpenDeleteGeo] = useState<boolean>(false)

  const columns = useTableColumns<Georeference>(() => [
    {
      header: '',
      accessorKey: 'cellId',
      cell: ({ row }) => (
        <div
          className="w-[500px] flex items-center gap-2"
          key={row.original.id}
        >
          <div className="rounded-full h-7 w-7 flex items-center justify-center bg-[#f59a11]">
            <span className="text-white uppercase font-bold">G</span>
          </div>
          <div>
            <Typography className="text-secondary !text-base !leading-3">
              {`${formatMessage(platformMessages.cellId)}: ${
                row.original.cellId
              }`}
            </Typography>
            <div className="flex">
              <Typography className="!text-sm !leading-4 text-secondary-gray">
                {`${formatMessage(generalMessages.latitude)}: ${
                  row.original.latitude
                }`}
              </Typography>
              <Typography className="ml-5 !text-sm !leading-4 text-secondary-gray">
                {`${formatMessage(generalMessages.longitude)}: ${
                  row.original.longitude
                }`}
              </Typography>
            </div>
          </div>
        </div>
      )
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
            onClick={() => setOpenDeleteGeo(true)}
          >
            <TrashIcon className="w-5 h-5" />
          </IconButton>
        </Tooltip>
      )
    }
  ])

  const demo = useMemo<Georeference[]>(
    () => [
      {
        id: '001',
        cellId: '135098745',
        latitude: '-56.987656',
        longitude: '90.187654',
        date: '2023-01-12T16:04:27.161Z'
      },
      {
        id: '002',
        cellId: '120654680',
        latitude: '-45.123456',
        longitude: '145.109187',
        date: '2023-01-12T15:04:27.161Z'
      },
      {
        id: '003',
        cellId: '135452976',
        latitude: '-30.122675',
        longitude: '150.112345',
        date: '2023-01-12T14:04:27.161Z'
      }
    ],
    []
  )

  return (
    <div>
      <NavOptions />
      <DeleteDialog
        onAccept={(data) => {
          console.log(data)
          setOpenDeleteGeo(false)
        }}
        open={openDeleteGeo}
        onClose={() => setOpenDeleteGeo(false)}
        title={formatMessage(telecomMessages.deleteGeo)}
        question={formatMessage(telecomMessages.deleteQuestion)}
        confirmation={formatMessage(telecomMessages.deleteConfirmation)}
      />
      <Grid>
        <Grid item xs={12} md={5}>
          <Typography
            variant="title"
            className="text-secondary font-[900] uppercase"
          >
            {formatMessage(telecomMessages.title)}
          </Typography>
          <Typography
            variant="subtitle"
            className="text-secondary uppercase font-semibold"
          >
            {formatMessage(telecomMessages.actualTelecomStations, {
              total: '03'
            })}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <ViewFilter
            fields={[{ label: 'Latitud', name: 'lat' }]}
            action={[
              {
                label: formatMessage(telecomMessages.downloadFormat)
              },
              {
                label: formatMessage(telecomMessages.addGeoreference),
                onClick: () =>
                  actions?.handleOpenDrawer({
                    title: (
                      <Typography
                        className="text-secondary font-extrabold uppercase !text-lg"
                        variant="title"
                      >
                        {formatMessage(telecomMessages.addGeoreference)}
                      </Typography>
                    ),
                    body: (
                      <GeoreferenceDrawer
                        subtitle={formatMessage(telecomMessages.addGeoSubtitle)}
                        onAccept={async () => {}}
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
                action: () => setOpenDeleteGeo(true),
                Icon: TrashIcon,
                name: 'deleteGeo'
              }
            ]}
            onRowClicked={(row) =>
              actions?.handleOpenDrawer({
                title: (
                  <Typography
                    className="text-secondary font-extrabold uppercase !text-lg"
                    variant="title"
                  >
                    {formatMessage(telecomMessages.geoData)}
                  </Typography>
                ),
                body: (
                  <GeoreferenceDrawer
                    subtitle={formatMessage(telecomMessages.actualGeoData)}
                    onAccept={async () => {}}
                    editMode
                    initialValues={{
                      cellId: row.cellId,
                      latitude: row.latitude,
                      longitude: row.longitude
                    }}
                  />
                )
              })
            }
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Telecom
