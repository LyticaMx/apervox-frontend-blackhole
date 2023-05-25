import Grid from 'components/Grid'
import Table from 'components/Table'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { useDrawer } from 'context/Drawer'
import { format } from 'date-fns'
import { generalMessages, platformMessages } from 'globalMessages'
import useTableColumns from 'hooks/useTableColumns'
import { ReactElement, useEffect } from 'react'
import { useIntl } from 'react-intl'
import GeoreferenceDrawer from './components/GeoreferenceDrawer'
import NavOptions from './components/NavOptions'
import { telecomMessages } from './messages'
import { Location } from 'types/location'
import { useLocations } from 'context/Locations'
import { formatTotal } from 'utils/formatTotal'

const Telecom = (): ReactElement => {
  const { formatMessage } = useIntl()
  const { actions } = useDrawer()
  const {
    data,
    dateFilter,
    pagination,
    searchFilter,
    total,
    actions: locationActions
  } = useLocations()

  useEffect(() => {
    locationActions?.get()
  }, [])

  const columns = useTableColumns<Location>(() => [
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
      accessorKey: 'createdAt',
      cell: ({ getValue }) => (
        <span className="text-secondary-gray">
          {format(new Date(getValue<string>()), 'dd/MM/yyyy - hh:mm')}
        </span>
      )
    }
  ])

  return (
    <div>
      <NavOptions />
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
            {formatTotal(
              total,
              formatMessage(telecomMessages.actualTelecomStations)
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} className="flex justify-end">
          <ViewFilter
            fields={[{ label: 'Latitud', name: 'lat' }]}
            initialValues={{
              dateRange: {
                start_time: dateFilter.start_time,
                end_time: dateFilter.end_time
              },
              search: searchFilter.query,
              fields: searchFilter.filters
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Table
            columns={columns}
            data={data}
            rowConfig={{ paddingSize: 'sm' }}
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
            maxHeight={500}
            manualLimit={{
              options: [15, 25, 50, 100],
              onChangeLimit: (page, limit) =>
                locationActions?.get({
                  page: page + 1,
                  limit
                })
            }}
            pageSize={pagination.limit}
            manualPagination={{
              currentPage: pagination.page,
              totalRecords: pagination.totalRecords,
              onChange: (page) => locationActions?.get({ page: page + 1 })
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Telecom
