import { ReactElement, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

import { useDirectory } from 'context/Directory'

import LinearChart from 'components/Charts/Linear'
import Typography from 'components/Typography'
import Card from 'components/Card'
import LiquidChart from 'components/Charts/Liquid'
import BasicRadarChart from 'components/Charts/BasicRadar'
import Table from 'components/Table'

import { generalMessages } from 'globalMessages'
import { pathRoute } from 'router/routes'

import { activityPanelMessages } from '../messages'

const ActivityPanel = (): ReactElement => {
  const intl = useIntl()
  const history = useHistory()
  const { speakerDashboard } = useDirectory()

  const { alertPercentage, callAlertChart, historyOfCall, listOfCall } =
    speakerDashboard

  const columns = useMemo(
    () => [
      {
        header: intl.formatMessage(generalMessages.date),
        accessorKey: 'date'
      },
      {
        header: intl.formatMessage(generalMessages.hour),
        accessorKey: 'hours'
      },
      {
        header: intl.formatMessage(generalMessages.receiver),
        accessorKey: 'reception_number'
      },
      {
        header: (
          <Typography
            className="whitespace-nowrap"
            style="semibold"
            variant="body2"
          >
            {intl.formatMessage(generalMessages.duration)} [s]
          </Typography>
        ),
        accessorKey: 'duration'
      },
      {
        header: ' ',
        cell: (
          <button
            className="text-blue-500 font-bold"
            onClick={() => history.push(pathRoute.calls.detail)}
          >
            {intl.formatMessage(generalMessages.details)}
          </button>
        )
      }
    ],
    []
  )

  return (
    <div className="mt-6 max-w-5xl">
      <Card className="w-full">
        <div className="grid grid-cols-3">
          <div className="col-span-2 h-max">
            <Typography>
              {intl.formatMessage(activityPanelMessages.callsMade)}
            </Typography>
            <LinearChart
              height={300}
              data={[...callAlertChart.alerts, ...callAlertChart.calls]}
              fields={{ x: 'date', y: 'value', serie: 'type' }}
              xTitle={intl.formatMessage(generalMessages.time)}
              yTitle={intl.formatMessage(generalMessages.totals)}
              i18ToltipKey="type"
              i18LegendKey="value"
              customSerieColors={{
                alerts: '#FF0000',
                calls: '#1B7CED'
              }}
            />
          </div>
          <div className="h-max">
            <Typography noWrap>
              {intl.formatMessage(activityPanelMessages.callsWithAlert)}
            </Typography>
            <LiquidChart height={300} percentage={String(alertPercentage)} />
          </div>
        </div>
      </Card>
      <Card className="mt-5">
        <Typography>
          {intl.formatMessage(activityPanelMessages.frequentNumbers)}
        </Typography>
        <BasicRadarChart
          data={historyOfCall.slice(0, 9)}
          fields={{
            x: 'reception_number',
            y: 'count'
          }}
        />
      </Card>
      <Card className="mt-5">
        <Typography>
          {intl.formatMessage(activityPanelMessages.callDetails)}
        </Typography>
        <Table data={listOfCall} columns={columns} />
      </Card>
    </div>
  )
}

export default ActivityPanel
