import { CallModel } from './call'
import { DatesFilterForm } from './datesFilter'
import { TimeChartValues } from './statistics'

export interface Charts {
  calls: TimeChartValues[]
  alerts: TimeChartValues[]
}

export interface HistoryCall {
  reception_number: string
  count: number
}

export interface SpeakerDetail {
  pin: number | null
  name: string
  age: number
  gender: 'MALE' | 'FEMALE'
  location: string
  penitentiary: string
}

export interface SpeakerDetailDashboard {
  profile: SpeakerDetail
  callAlertChart: Charts
  alertPercentage: number
  historyOfCall: HistoryCall[]
  listOfCall: CallModel[]
}

export interface DirectoryContextState {
  speakerList: SpeakerDetail[]
  speakerDashboard: SpeakerDetailDashboard
}

export interface DirectoryActions {
  getSpeakerList: () => Promise<boolean>
  getSpeakerDashboard: (filters: PinFilters) => void
  createSpeaker: (speaker: any) => Promise<boolean>
  cleanDashboard: () => void
  setDates: (pinId: string, dates: DatesFilterForm) => void
}

export interface DirectoryContextType extends DirectoryContextState {
  actions?: DirectoryActions
}

/* API Filters */

export interface PinFilters extends DatesFilterForm {
  pin_id: string
}
