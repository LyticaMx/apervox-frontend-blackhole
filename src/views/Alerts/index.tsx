import Button from 'components/Button'
import LinearChart from 'components/Charts/Linear'
import Table from 'components/Table'
import Title from 'components/Title'
import Typography from 'components/Typography'
import { useAlerts } from 'context/Alerts'
import { ReactElement, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import FormDialog from './components/FormDialog'
import { useAlertTable } from './hooks/useAlertTable'
import { useCallAlertTable } from './hooks/useCallAlertTable'
import { alertMessages } from './messages'
import { generalMessages } from 'globalMessages'
import NoData from 'components/NoData'
import { BellSlashIcon } from '@heroicons/react/24/outline'
import { PaginationParams } from 'types/api'
import { CallAlertSearchParams } from 'types/alert'
import RangeFilterContext from 'components/RangeFilterContext'
import { useDatesFilter } from 'context/DatesFilter'

const Alerts = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false)
  const { formatMessage } = useIntl()
  const {
    charts,
    listOfAlerts,
    listOfCallsAlerts,
    alertsPagination,
    callsPagination,
    currentAlert,
    actions
  } = useAlerts()
  const { message } = useDatesFilter()

  const fetchAlerts = async (params?: PaginationParams): Promise<void> => {
    await actions?.getAlerts(params)
  }

  const alertTable = useAlertTable({
    getAlerts: async () => await fetchAlerts()
  })
  const callAlertTable = useCallAlertTable()

  const fetchCallAlerts = async (
    params?: CallAlertSearchParams
  ): Promise<void> => {
    await actions?.getCallAlerts(params)
  }

  const createAlert = async (
    category: string,
    condition: string,
    value: string
  ): Promise<void> => {
    const successful = await actions?.createAlert(category, condition, value)
    if (successful) fetchAlerts()
  }

  useEffect(() => {
    fetchAlerts()
  }, [])

  useEffect(() => {
    if (currentAlert.id !== '') {
      fetchCallAlerts()
      actions?.getStatistics()
    }
  }, [currentAlert.id])

  const updateGlobalFilters = (dateFilters): void => {
    actions?.setGlobalFilters(dateFilters)
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <Title variant="page">{formatMessage(alertMessages.title)}</Title>
          <p className="text-gray-500 text-sm">{message}</p>
        </div>
        <RangeFilterContext onSubmit={updateGlobalFilters} />
      </div>
      <div className="mt-6 shadow ring-1 ring-black ring-opacity-5 md:rounded p-3">
        <div className="flex items-center justify-between">
          <Typography style="bold">
            {formatMessage(generalMessages.alerts)}
          </Typography>
          <Button
            variant="contained"
            color="indigo"
            onClick={() => setOpen(true)}
          >
            {formatMessage(alertMessages.addAlert)}
          </Button>
        </div>
        <div className="w-full mt-3">
          <Table
            data={listOfAlerts}
            columns={alertTable.columns}
            manualPagination={{
              currentPage: alertsPagination.page - 1,
              totalRecords: alertsPagination.totalRecords,
              onChange: async (newPage) =>
                await fetchAlerts({ page: newPage + 1 })
            }}
            pageSize={alertsPagination.limit}
            onRowClicked={(row) => actions?.setCurrentAlert(row)}
          />
        </div>
      </div>
      <div className="mt-6 shadow ring-1 ring-black ring-opacity-5 md:rounded p-3">
        <div className="flex items-center justify-between">
          {currentAlert.id !== '' && (
            <Typography style="bold">
              {formatMessage(alertMessages.alertActivity)}
            </Typography>
          )}
        </div>
        <LinearChart
          data={currentAlert.id !== '' ? charts : []}
          fields={{
            x: 'date',
            y: 'value',
            serie: 'type'
          }}
          i18ToltipKey="type"
          i18LegendKey="value"
          customSerieColors={{
            alerts: '#FF0000'
          }}
        />
      </div>
      <div className="mt-6 shadow ring-1 ring-black ring-opacity-5 md:rounded p-3">
        {currentAlert.id !== '' ? (
          <>
            <div className="flex items-center justify-between">
              <Typography style="semibold">
                {formatMessage(alertMessages.callsAsociatedAlerts, {
                  alertName: `${String(currentAlert?.category)} ${String(
                    currentAlert?.condition
                  )}`
                })}
              </Typography>
            </div>
            <div className="w-full mt-3">
              <Table
                data={listOfCallsAlerts}
                columns={callAlertTable.columns}
                manualPagination={{
                  currentPage: callsPagination.page - 1,
                  totalRecords: callsPagination.totalRecords,
                  onChange: async (newPage) =>
                    await fetchCallAlerts({ page: newPage + 1 })
                }}
                pageSize={callsPagination.limit}
                manualSorting={{
                  sorting: callsPagination.sort,
                  onSortingChange: async (sort) =>
                    await fetchCallAlerts({ sort })
                }}
                withCheckbox
                limit={{
                  current: callsPagination.limit,
                  options: callsPagination.limitOptions ?? [10],
                  onChangeLimit: async (newPage, newLimit) => {
                    await fetchCallAlerts({
                      page: newPage + 1,
                      limit: newLimit
                    })
                  }
                }}
              />
            </div>
          </>
        ) : (
          <NoData
            icon={BellSlashIcon}
            label={formatMessage(alertMessages.firstSelectAlert)}
          />
        )}
      </div>
      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(values) => {
          setOpen(false)
          createAlert(values.category, values.condition, values.value)
        }}
      />
    </div>
  )
}

export default Alerts
