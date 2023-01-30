import { ReactElement, useMemo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline'
import { useIntl } from 'react-intl'
import clsx from 'clsx'

import { pathRoute } from 'router/routes'
import { useCalls } from 'context/Calls'

import ComparativeCard from 'components/ComparativeCard'
import LinearChart from 'components/Charts/Linear'
import Table from 'components/Table'
import SelectField from 'components/Form/Select'
import Card from 'components/Card'
import Typography from 'components/Typography'
import Button from 'components/Button'
import Drawer from 'components/Drawer'
import WaveSurferPlayer from 'components/Wavesurfer'

import { generalMessages, actionsMessages } from 'globalMessages'
import { messages } from './messages'
import { ListOfCallFilter, PinsParams } from 'types/call'
import RangeFilterContext from 'components/RangeFilterContext'
import { useDatesFilter } from 'context/DatesFilter'
import Title from 'components/Title'
import useAudio from './hooks/useAudio'

const Calls = (): ReactElement => {
  const history = useHistory()
  const intl = useIntl()

  const {
    actions,
    counts,
    charts,
    listOfCalls,
    pinActivityList,
    callsPagination,
    pinsPagination
  } = useCalls()
  const { message } = useDatesFilter()
  const [AudioButton, stopAudio] = useAudio()
  const [openWavesurfer, setOpenWavesurfer] = useState(false)

  useEffect(() => {
    actions?.getAll()
    stopAudio()

    return () => {
      stopAudio()
    }
  }, [])

  const fetchCalls = async (filters?: ListOfCallFilter): Promise<void> => {
    stopAudio()
    await actions?.getListOfCalls(filters)
  }

  const fetchPins = async (filters?: PinsParams): Promise<void> => {
    await actions?.getListOfPins(filters)
  }

  const columns = useMemo(
    () => [
      {
        header: '  ',
        cell: (data) => {
          const row = data.row.original

          const AlertIcon = row.alert ? (
            <BellIcon className="w-5 h-5 text-red-500" />
          ) : (
            <BellSlashIcon className="w-5 h-5 text-slate-500" />
          )
          return AlertIcon
        }
      },
      {
        header: '   ',
        cell: (data) => {
          const row = data.row.original

          return <AudioButton id={row.id} />
        }
      },
      {
        header: intl.formatMessage(generalMessages.date),
        accessorKey: 'date'
      },
      {
        header: intl.formatMessage(generalMessages.hour),
        accessorKey: 'hours'
      },
      {
        header: 'PIN',
        accessorKey: 'pin'
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
        accessorKey: 'id',
        cell: ({ getValue }) => (
          <button
            className="text-blue-500 font-bold"
            onClick={() =>
              history.push(pathRoute.calls.detail, {
                id: getValue()
              })
            }
          >
            {intl.formatMessage(generalMessages.details)}
          </button>
        )
      }
    ],
    []
  )

  const callColumns = useMemo(
    () => [
      {
        header: 'PIN',
        accessorKey: 'pin'
      },
      {
        header: intl.formatMessage(messages.totalOfCalls),
        accessorKey: 'count'
      }
    ],
    []
  )

  const updateGlobalFilters = (dateFilters): void => {
    actions?.setGlobalFilters(dateFilters)
  }

  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <div>
            <Title variant="page">{intl.formatMessage(messages.title)}</Title>
            <p className="text-slate-500 text-sm">{message}</p>
          </div>

          <RangeFilterContext onSubmit={updateGlobalFilters} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 shadow ring-1 ring-black ring-opacity-5 md:rounded">
        <ComparativeCard
          title={intl.formatMessage(messages.totalOfCalls)}
          current={counts.calls.current}
          prev={counts.calls.last}
        />
        <ComparativeCard
          title={intl.formatMessage(messages.usedPins)}
          current={counts.pins.current}
          prev={counts.pins.last}
        />
        <ComparativeCard
          title={intl.formatMessage(generalMessages.alerts)}
          current={counts.alerts.current}
          prev={counts.alerts.last}
        />
      </div>
      <div className="w-full mt-6">
        <Card>
          <p className="text-slate-600 font-bold pb-3">
            {intl.formatMessage(messages.activityOfCalls)}
          </p>
          <LinearChart
            data={[...charts.calls, ...charts.alerts]}
            fields={{
              x: 'date',
              y: 'value',
              serie: 'type'
            }}
            sliderBar
            xTitle={intl.formatMessage(generalMessages.time)}
            yTitle={intl.formatMessage(generalMessages.totals)}
            i18ToltipKey="type"
            i18LegendKey="value"
            customSerieColors={{
              alerts: '#FF0000',
              calls: '#1B7CED'
            }}
          />
        </Card>
      </div>
      <div className="grid grid-cols-3 mt-6 gap-5">
        <Card className="col-span-2 h-full px-3 py-2" padding="none">
          <div className="flex">
            <div className="w-4/6">
              <p className="font-bold text-slate-600">
                {intl.formatMessage(messages.listOfCalls)}
              </p>
              <p className="text-slate-500 text-sm">
                {intl.formatMessage(generalMessages.orderBy)}
              </p>
            </div>
            <div className="w-2/6 mr-2">
              <p className="text-sm font-semibold">
                {intl.formatMessage(actionsMessages.filter)}
              </p>
              <SelectField
                value={callsPagination.calls}
                onChange={async (value) =>
                  await fetchCalls({ calls: value, page: 1 })
                }
                items={[
                  {
                    value: 'ALL',
                    text: intl.formatMessage(messages.allCalls)
                  },
                  {
                    value: 'NO_ALERT',
                    text: intl.formatMessage(messages.withoutAlert)
                  },
                  {
                    value: 'ALERT',
                    text: intl.formatMessage(messages.withAlert)
                  }
                ]}
              />
            </div>
            <div className="w-2/6">
              <p className="text-sm font-semibold">
                {intl.formatMessage(generalMessages.orderBy)}
              </p>
              <SelectField
                value={callsPagination.orderBy}
                onChange={async (value) =>
                  await fetchCalls({ order_by: value, page: 1 })
                }
                items={[
                  {
                    value: 'RECEPTION_NUMBER',
                    text: intl.formatMessage(generalMessages.receiver)
                  },
                  { value: 'PIN', text: 'PIN' },
                  {
                    value: 'CREATED_AT',
                    text: intl.formatMessage(generalMessages.hour)
                  },
                  {
                    value: 'DURATION',
                    text: intl.formatMessage(generalMessages.duration)
                  }
                ]}
              />
            </div>
          </div>
          <div className="mt-3 h-full">
            <Table
              manualPagination={{
                currentPage: callsPagination.page - 1,
                totalRecords: callsPagination.totalRecords,
                onChange: async (newPage) =>
                  await fetchCalls({ page: newPage + 1 })
              }}
              data={listOfCalls}
              columns={columns}
              pageSize={callsPagination.limit}
            />
            {callsPagination.pin_number && (
              <div className={clsx('flex justify-center')}>
                <Button
                  size="sm"
                  color="indigo"
                  onClick={async () =>
                    await fetchCalls({
                      pin_number: null
                    })
                  }
                >
                  {intl.formatMessage(messages.backToAllCalls)}
                </Button>
              </div>
            )}
          </div>
        </Card>
        <Card className="h-full px-3 py-2" padding="none">
          <div className="flex items-center">
            <div className="w-4/6">
              <p className="font-bold text-slate-600">
                {intl.formatMessage(messages.activityByPin)}
              </p>
              <p className="text-slate-500 text-sm">
                {intl.formatMessage(messages.mostActivityPins)}
              </p>
            </div>
            <div className="w-2/6">
              <p className="text-sm font-semibold">
                {intl.formatMessage(generalMessages.top)}
              </p>
              <SelectField
                value={pinsPagination.limit}
                onChange={async (value) =>
                  await fetchPins({ limit: value, page: 1 })
                }
                items={[
                  { value: 5, text: '5' },
                  { value: 10, text: '10' },
                  { value: 20, text: '20' },
                  { value: 40, text: '40' }
                ]}
              />
            </div>
          </div>
          <div className="mt-3">
            <Table
              data={pinActivityList}
              columns={callColumns}
              onRowClicked={async (rowInfo) =>
                await fetchCalls({ pin_number: rowInfo.pin, page: 1 })
              }
            />
          </div>
        </Card>
      </div>
      <Drawer
        open={openWavesurfer}
        placement="bottom"
        onClose={() => setOpenWavesurfer(false)}
      >
        <WaveSurferPlayer
          wave
          zoom
          volume
          equalizer
          audio={{
            id: 'audio-1',
            name: 'Audio 1',
            duration: 44,
            url: 'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
          }}
          defaultRegionColor={process.env.REACT_APP_WAVESURFER_REGION_COLOR}
          // regions={regions}
          // onClick={(region: Region) => setRegionSelected(region as any)}
        />
      </Drawer>
    </div>
  )
}

export default Calls
