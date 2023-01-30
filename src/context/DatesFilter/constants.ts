import { createAction } from 'types/contextReducer'
import { DatesFilterForm } from 'types/datesFilter'
import { DateFilter } from 'types/filters'

export enum Types {
  SET_DATES = 'datesFilter/setDates',
  SET_FORM = 'datesFilter/setForm',
  SET_MESSAGE = 'datesFilter/setMessage'
}
export const actions = {
  setDates: createAction<Types, DateFilter>(Types.SET_DATES),
  setForm: createAction<Types, DatesFilterForm>(Types.SET_FORM),
  setMessage: createAction<Types, string>(Types.SET_MESSAGE)
}
