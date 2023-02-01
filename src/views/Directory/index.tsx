import { ReactElement, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { useDirectory } from 'context/Directory'
import SpeakersMenu from 'components/SpeakersMenu'
import Title from 'components/Title'
import { useWindowSize } from 'utils/useMediaQuery'

import AsideDirectory from './components/AsideList'
import Detail from './components/Detail'
import { generalMessages } from 'globalMessages'
import RangeFilterContext from 'components/RangeFilterContext'
import { useDatesFilter } from 'context/DatesFilter'

const Directory = (): ReactElement => {
  const intl = useIntl()
  const isLargeScreen = useWindowSize('lg')
  const { actions, speakerList, speakerDashboard } = useDirectory()
  const { dates } = useDatesFilter()

  const [currentPinIdSelected, setCurrentPinIdSelected] = useState('')

  const showAsideDirectory = useMemo(
    () => isLargeScreen || (!isLargeScreen && !speakerDashboard.profile.pin),
    [isLargeScreen, speakerDashboard]
  )

  useEffect(() => {
    fetchDirectory()
  }, [])

  const fetchDirectory = async (): Promise<void> => {
    await actions?.getSpeakerList()
  }

  const fetchSpeakerInfo = async (speakerSelected): Promise<void> => {
    const res = await actions?.getSpeakerDashboard({
      pin_id: speakerSelected.pin_id,
      ...dates
    })

    if (res) {
      setCurrentPinIdSelected(speakerSelected.pin_id)
    }
  }

  const onSubmitDates = (dateFilters): void => {
    actions?.setDates(currentPinIdSelected, dateFilters)
  }

  return (
    <div>
      <div className="flex justify-between">
        <Title variant="page">
          {intl.formatMessage(generalMessages.speakers)}
        </Title>
        <RangeFilterContext onSubmit={onSubmitDates} />
      </div>
      <SpeakersMenu />
      <div className="relative z-0 flex flex-1 overflow-hidden">
        {showAsideDirectory && (
          <AsideDirectory
            directory={speakerList as any}
            onClickSpeaker={fetchSpeakerInfo}
          />
        )}
        {speakerDashboard.profile.pin && (
          <Detail closeDetail={actions?.cleanDashboard} />
        )}
      </div>
    </div>
  )
}

export default Directory
