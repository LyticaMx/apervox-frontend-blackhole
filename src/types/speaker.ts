import { Call } from './call'
import { ControlGroup } from './control'
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

export enum CodeCountry {
  USA,
  MEX,
  COL,
  BRZ
}

export interface Country {
  id: string
  code_country: CodeCountry
}

export interface State {
  id: string
  name: string
  country: Country
  country_id: string
}

export interface Location {
  id: string
  name: string
  state: State
  state_id: string
}

export interface Speaker {
  id: string
  calls: Call[]
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
  count: number
  day_name: string
  hours: number
}

export interface CallByAlerts {
  date: string
  pin: string
  reception_number: string
  duration: number
}

export interface SpeakersType {
  summary: Summary
  histogramCalls: HistogramCall[]
  listPins: ListPin[]
  heatmapSpeakers: Heatmap[]
  heatmapAlerts: Heatmap[]
  callsByAlerts: CallByAlerts[]
  actions?: {
    getSummary: (params?: any) => Promise<boolean>
    getHistogram: (params?: any) => Promise<boolean>
    getListPins: (params?: any) => Promise<boolean>
    getHeatmapSpeakers: (params?: any) => Promise<boolean>
    getHeatmapAlerts: (params?: any) => Promise<boolean>
    getCallsByAlerts: (params?: any) => Promise<boolean>
    getAll: (params?: any) => Promise<boolean>
  }
}
