import { DateFilter } from './filters'

export interface DatesFilterForm extends DateFilter {
  time?: number
}

export interface State {
  message: string
  dates: DateFilter
  form: DatesFilterForm
}

export interface Actions {
  setDates: (params: DateFilter) => void
  setForm: (params?: DatesFilterForm) => void
}

export interface ContextType extends State {
  actions?: Actions
}
