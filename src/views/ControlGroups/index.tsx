import { ReactElement, useEffect } from 'react'
import { CircleStackIcon } from '@heroicons/react/24/outline'

import { useFormatMessage } from 'hooks/useIntl'
import { useControlGroups } from 'context/ControlGroups'

import Divider from 'components/Divider'
import Title from 'components/Title'

import GroupsSection from './components/GroupsSection'
import AudiosSection from './components/AudiosSection'
import CallsSection from './components/CallsSection'

import { messages } from './messages'
import RangeFilterContext from 'components/RangeFilterContext'
import { useDatesFilter } from 'context/DatesFilter'

const Index = (): ReactElement => {
  const getMessage = useFormatMessage(messages)
  const { actions, controlGroup } = useControlGroups()
  const { message } = useDatesFilter()

  useEffect(() => {
    actions?.initView()
  }, [])

  const onSubmitDates = (dateFilters): void => {
    actions?.setDates(dateFilters)
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <Title variant="page">{getMessage('title')}</Title>
          <p className="text-sm text-slate-500">{message}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <RangeFilterContext onSubmit={onSubmitDates} />
        </div>
      </div>

      <div className="mt-10">
        <GroupsSection />
      </div>
      <div className="my-5">
        <Divider title={getMessage('divider')} />
      </div>
      {!controlGroup && (
        <div className="max-w-3xl flex flex-col items-center px-4 py-12 mx-auto text-center">
          <CircleStackIcon className="w-10 h-10 text-blue-500" />
          <h2 className="text-xl tracking-tight text-gray-700 sm:text-2xl">
            {getMessage('message')}
          </h2>
        </div>
      )}
      {controlGroup && (
        <>
          <AudiosSection />
          <CallsSection />
        </>
      )}
    </div>
  )
}

export default Index
