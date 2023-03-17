import Grid from 'components/Grid'
import Typography from 'components/Typography'
import { format } from 'date-fns'
import { generalMessages, platformMessages } from 'globalMessages'
import { ReactElement } from 'react'
import { useIntl } from 'react-intl'
import { locationInformationMessages } from 'views/Evidence/messages'
import useGeoreference from './useGeoreference'

interface GeoReference {
  latitude: number
  longitude: number
  startAngle: number
  stopAngle: number
  radius?: number
}

interface Props {
  geoReference: GeoReference
  cellId: string
  country: string
  carrier: string
  date: string
  address: string
  settlement: string
  municipality: string
}

const LocationInformation = (props: Props): ReactElement => {
  const {
    geoReference,
    cellId,
    country,
    carrier,
    date,
    address,
    municipality,
    settlement
  } = props
  const { formatMessage } = useIntl()
  const { mapContainer } = useGeoreference(
    geoReference.latitude,
    geoReference.longitude,
    geoReference.startAngle,
    geoReference.stopAngle,
    geoReference.radius
  )

  return (
    <div>
      <Typography
        className="uppercase text-secondary"
        variant="subtitle"
        style="bold"
      >
        {formatMessage(generalMessages.location)}
      </Typography>
      <div className="mt-4 shadow-md rounded-md">
        <Grid className="min-h-[500px]">
          <Grid item sm={12} md={4} className="px-4 py-6">
            <Typography style="italic">{`${formatMessage(
              platformMessages.cellId
            )}:`}</Typography>
            <Typography className="ml-4">{cellId}</Typography>
            <Typography style="italic" className="mt-2">{`${formatMessage(
              generalMessages.latitude
            )}:`}</Typography>
            <Typography className="ml-4">{geoReference.latitude}</Typography>
            <Typography style="italic">{`${formatMessage(
              generalMessages.longitude
            )}:`}</Typography>
            <Typography className="ml-4">{geoReference.longitude}</Typography>
            <Typography style="italic" className="mt-2">{`${formatMessage(
              generalMessages.country
            )}:`}</Typography>
            <Typography className="ml-4">{country}</Typography>
            <Typography style="italic" className="mt-2">{`${formatMessage(
              locationInformationMessages.carrier
            )}:`}</Typography>
            <Typography className="ml-4">{carrier}</Typography>
            <Typography
              className="text-primary my-3"
              style="medium"
            >{`${formatMessage(generalMessages.date)}: ${format(
              new Date(date),
              'dd/MM/yyyy HH:mm'
            )}`}</Typography>
            <hr />
            <Typography className="mt-3 text-secondary-gray leading-5">
              {address}
            </Typography>
            <Typography className="text-secondary-gray leading-5">
              {settlement}
            </Typography>
            <Typography className="text-secondary-gray leading-5">
              {municipality}
            </Typography>
          </Grid>
          <Grid item sm={12} md={8}>
            <div ref={mapContainer} className="h-full" />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default LocationInformation
