import DeleteDialog from 'components/DeleteDialog'
import { useDrawer } from 'context/Drawer'
import { ReactElement, useState } from 'react'
import { useIntl } from 'react-intl'
import { mediaMessages } from '../messages'
import Grid from 'components/Grid'
import Typography from 'components/Typography'
import ViewFilter from 'components/ViewFilter'
import { formMessages } from 'globalMessages'
import GeneralMediaList from './GeneralMediaList'
import { Carrier } from '../Media'
import CompanyDrawer from './CompanyDrawer'

const CarrierTab = (): ReactElement => {
  const [openDeleteCarrier, setOpenDeleteCarrier] = useState(false)
  const { actions: drawerActions } = useDrawer()
  const { formatMessage } = useIntl()

  const demo: Carrier[] = [
    {
      id: '01',
      date: '2023-01-21T20:19:23.032Z',
      name: 'Telcel',
      type: 'carrier'
    }
  ]

  return (
    <div className="mt-2">
      <DeleteDialog
        onAccept={(data) => {
          console.log(data)
          setOpenDeleteCarrier(false)
        }}
        open={openDeleteCarrier}
        onClose={() => setOpenDeleteCarrier(false)}
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
            {formatMessage(mediaMessages.carriers)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7} className="flex justify-end">
          <ViewFilter
            fields={[
              { label: formatMessage(formMessages.name), name: 'Nombre' }
            ]}
            action={{
              label: formatMessage(mediaMessages.createCarrier),
              onClick: () =>
                drawerActions?.handleOpenDrawer({
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
                    {formatMessage(mediaMessages.carrierData)}
                  </Typography>
                ),
                body: (
                  <CompanyDrawer
                    onAccept={async () => {}}
                    subtitle={formatMessage(mediaMessages.actualCarrierData)}
                    initialValues={{ name: row.name }}
                  />
                )
              })
            }
            handleDelete={() => setOpenDeleteCarrier(true)}
            handleMultipleDelete={async () => true}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default CarrierTab
