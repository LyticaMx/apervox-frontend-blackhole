import { ReactElement, useEffect } from 'react'

import { useSpeakers } from 'context/Speakers/useSpeakers'

import Title from 'components/Title'
import SpeakersMenu from 'components/SpeakersMenu'

import Histogram from './components/Histogram'
import ListPins from './components/ListPins'
import HeatmapSection from './components/Heatmap'
import CallsBy from './components/CallsBy'
import { messages } from './messages'
import { useFormatMessage } from 'hooks/useIntl'
import SummarySection from './components/SummarySection'
import Grid from 'components/Grid'
import RangeFilterContext from 'components/RangeFilterContext'
import { useDatesFilter } from 'context/DatesFilter'

const Speakers = (): ReactElement => {
  const { actions } = useSpeakers()
  const { message } = useDatesFilter()
  const getMessage = useFormatMessage(messages)

  useEffect(() => {
    actions?.getAll()
  }, [])

  const onSubmitDates = (dateFilters): void => {
    actions?.setDates(dateFilters)
  }

  return (
    <div>
      <div className="flex justify-between">
        <Title variant="page">{getMessage('speakers')}</Title>
        <RangeFilterContext onSubmit={onSubmitDates} />
      </div>
      <SpeakersMenu />
      <div className="w-full flex justify-between mt-2">
        <p className="text-slate-500 text-sm">{message}</p>
      </div>

      <SummarySection />
      <Grid className="mt-5" spacing={4}>
        <Grid item cols={7}>
          <Histogram />
        </Grid>
        <Grid item cols={5}>
          <ListPins />
        </Grid>
      </Grid>

      <HeatmapSection />
      <CallsBy />
    </div>
  )
}

export default Speakers
