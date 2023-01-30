import { subHours } from 'date-fns'
import { useDate } from 'hooks/useDate'
import { useGlobalMessage } from 'hooks/useIntl'
import { useEffect } from 'react'
import { Actions, DatesFilterForm, State } from 'types/datesFilter'
import { DateFilter } from 'types/filters'

import { actions } from './constants'

const useActions = (state: State, dispatch): Actions => {
  const getMessage = useGlobalMessage()
  const { format } = useDate()
  useEffect(() => {
    const startFormat = format(state.dates.start_time as Date, 'dd/MM/yyyy')
    const endFormat = state.dates.end_time
      ? format(state.dates.end_time, 'dd/MM/yyyy')
      : getMessage('now', 'timeMessages')

    dispatch(actions.setMessage(`${startFormat} - ${endFormat}`))
  }, [state.dates])

  const setDates = async (payload: DateFilter): Promise<void> => {
    try {
      const newDates = {
        ...payload,
        start_time: payload.start_time ?? state.dates.start_time
      }

      dispatch(actions.setDates(newDates))
    } catch {}
  }
  const setForm = async (payload?: DatesFilterForm): Promise<void> => {
    try {
      let startTime = payload?.start_time ?? state.dates.start_time
      if (payload?.time) {
        startTime = subHours(new Date(), payload.time)
      }

      const newDates = {
        ...payload,
        start_time: startTime
      }

      dispatch(
        actions.setForm({
          ...payload,
          start_time: payload?.time ? undefined : startTime
        })
      )
      dispatch(actions.setDates(newDates))
    } catch {}
  }

  return {
    setDates,
    setForm
  }
}

export { useActions }
