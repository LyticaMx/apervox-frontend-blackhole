import { CallModel } from './call'
import { ControlGroup } from './control'
import { DatesFilterForm } from './datesFilter'
import { DateFilter, PaginationFilter } from './filters'
import { Location } from './location'
import { Penitentiary } from './penitentiaries'

export enum Status {
  NOTSTARTED,
  PROCESSING,
  COMPLETED,
  FAILED
}

export enum Gender {
  MALE,
  FEMALE
}
export interface Speaker {
  id: string
  calls: CallModel[]
  pin: number
  names: string
  fathers_name: string
  mothers_name: string
  age: number
  gender: Gender
  location: Location
  location_id: string
  penitentiary: Penitentiary
  penitentiary_id: string
  registered_at: string
  control_groups: ControlGroup[]
  deleted: boolean
  created_at: string
  updated_at: string
  deleted_at: string
}

interface SummaryData {
  current: number
  last: number
  change: number
  trend?: string
}

export interface Summary {
  totalPins: SummaryData
  pinAlerts: SummaryData
  average: SummaryData
}

export interface HistogramCall {
  pin: string
  count: number
}

export interface ListPin {
  pin: string
  count: number
}

export interface Heatmap {
  value: number
  y: string
  x: number
}

export interface CallByAlerts {
  date: string
  pin: string
  reception_number: string
  duration: number
}

export interface CallsParams extends DateFilter, Partial<PaginationFilter> {
  order_by?: string
  calls?: string
}
export interface ListPinsParams extends DateFilter, Partial<PaginationFilter> {
  calls?: string
  order_by?: string
  min_value?: number
  max_value?: number
}

export interface State {
  summary: Summary
  histogram: HistogramCall[]
  pins: ListPin[]
  heatmapSpeakers: Heatmap[]
  heatmapAlerts: Heatmap[]
  calls: CallByAlerts[]
  pinsPagination: {
    limit: number
    page: number
    totalRecords: number
    min_value: number
    max_value: number
  }
  callsPagination: {
    limit: number
    page: number
    totalRecords: number
    order_by: string
    calls: string
  }
  dates: DateFilter
}
export interface Actions {
  getSummary: (params?: DateFilter) => Promise<boolean>
  getHistogram: (params?: DateFilter) => Promise<boolean>
  getListPins: (params?: ListPinsParams) => Promise<boolean>
  getHeatmapSpeakers: (params?: DateFilter) => Promise<boolean>
  getHeatmapAlerts: (params?: DateFilter) => Promise<boolean>
  getCallsByAlerts: (params?: CallsParams) => Promise<boolean>
  getAll: (params?: DateFilter) => Promise<boolean>
  setDates: (params: DatesFilterForm) => void
}

export interface ContextType extends State {
  actions?: Actions
}
