import { ReactElement, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'

import {
  ChevronLeftIcon,
  CalendarDaysIcon,
  PhoneArrowDownLeftIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  BellAlertIcon,
  BellIcon
} from '@heroicons/react/24/outline'

import { pathRoute } from 'router/routes'
import { generalMessages } from 'globalMessages'
import Tabs from 'components/Tabs'

import InterventionTypeDetail from './components/InterventionTypeDetail'
import CardInfo from './components/CardInfo'
import { detailMessages, messages } from './messages'
import { useCallDetail } from 'context/CallDetail'
import Title from 'components/Title'
import RangeFilterContext from 'components/RangeFilterContext'
import { useDatesFilter } from 'context/DatesFilter'
import clsx from 'clsx'
import Typography from 'components/Typography'

const CallDetails = (): ReactElement => {
  const intl = useIntl()
  const { push } = useHistory()
  const {
    actions,
    linkedTagList,
    segmentList,
    summary,
    voiceControlSimilarity,
    wordFrequency
  } = useCallDetail()
  const { dates } = useDatesFilter()

  const {
    state: { id }
  } = useLocation<any>()

  const [currentTab, setCurrentTab] = useState<string>('transmitted')

  useEffect(() => {
    actions?.getAllDetail({ ...dates, id })
  }, [])

  const onSubmitDates = (dateFilters): void => {
    actions?.setDates(id, dateFilters)
  }

  return (
    <div>
      <div className="flex justify-between">
        <button
          className="flex items-center text-gray-500 hover:text-gray-800 hover:font-semibold transition-all duration-300"
          onClick={() => push(pathRoute.calls.index)}
        >
          <div
            className="rounded-xl border border-gray-500 p-0.5 mr-1"
            style={{ paddingLeft: 1 }}
          >
            <ChevronLeftIcon className="w-3.5 h-3.w-3.5" />
          </div>
          <p className="text-sm">
            {intl.formatMessage(detailMessages.backToCallButton)}
          </p>
        </button>
        <RangeFilterContext onSubmit={onSubmitDates} />
      </div>
      <div className="w-full mt-5 flex justify-between">
        <Title>{intl.formatMessage(detailMessages.title)}</Title>
        <div className="flex items-center">
          <div
            className={clsx(
              'rounded-md py-1 px-2 mr-2',
              summary.alert ? 'bg-red-100' : 'bg-green-100'
            )}
          >
            <Typography style="semibold" noWrap variant="body2">
              {summary.alert
                ? intl.formatMessage(messages.withAlert)
                : intl.formatMessage(messages.withoutAlert)}
            </Typography>
          </div>
          {summary.alert ? (
            <BellAlertIcon className="w-5" />
          ) : (
            <BellIcon className="w-5" />
          )}
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-5">
        <p className="font-semibold text-lg text-gray-800">
          PIN: {summary.assigned_pin}
        </p>
        <div className="flex items-center">
          <CalendarDaysIcon className="w-5 h-5 text-gray-800 mr-2" />
          <p className="font-semibold text-lg text-gray-800">{summary.date}</p>
        </div>
      </div>
      <div className="w-full flex justify-around items-center my-5 shadow ring-1 ring-black ring-opacity-5 md:rounded">
        <div className="w-1/3">
          <CardInfo
            icon={PhoneArrowDownLeftIcon}
            title={intl.formatMessage(generalMessages.receiver)}
            value={summary.receiver}
          />
        </div>
        <div className="w-1/3">
          <CardInfo
            icon={ChatBubbleOvalLeftEllipsisIcon}
            title={intl.formatMessage(generalMessages.duration)}
            value={summary.duration}
          />
        </div>
        <div className="w-1/3">
          <CardInfo
            icon={ClockIcon}
            title={intl.formatMessage(generalMessages.hour)}
            value={summary.hour}
          />
        </div>
      </div>
      <Tabs
        tabs={[
          {
            id: 'transmitted',
            name: 'Transmitidos',
            component: (
              <InterventionTypeDetail
                detailByType={{
                  tags: linkedTagList.transmitted,
                  transcription: segmentList.transmitted,
                  voiceControlSimilarity,
                  wordFrequency: wordFrequency.transmitted
                }}
                type={1}
              />
            )
          },
          {
            id: 'received',
            name: 'Recibidos',
            component: (
              <InterventionTypeDetail
                detailByType={{
                  tags: linkedTagList.received,
                  transcription: segmentList.received,
                  voiceControlSimilarity,
                  wordFrequency: wordFrequency.received
                }}
                type={2}
              />
            )
          },
          {
            id: 'complete',
            name: 'Completo',
            component: (
              <InterventionTypeDetail
                detailByType={{
                  tags: linkedTagList.transmitted,
                  transcription: segmentList.transmitted,
                  voiceControlSimilarity,
                  wordFrequency: wordFrequency.transmitted
                }}
              />
            )
          }
        ]}
        defaultTab={currentTab}
        onChangeTab={(newCurrent) => setCurrentTab(newCurrent)}
      />
    </div>
  )
}

export default CallDetails
