import { ReceivedAudio, TransmitedAudio } from './audio'
import { DateFilter } from './filters'
import { Penitentiary } from './penitentiaries'
import { Segment } from './segment'
import { Speaker, Status } from './speaker'
import { ComparativeValues, PinActivity, TimeChartValues } from './statistics'

export enum CallStatus {
  ANSWERED,
  REJECTED,
  INTERRUPTED
}
export interface Call {
  id: string
  speaker: Speaker
  speaker_id: string
  transmission_number: string
  reception_number: string
  penitentiary: Penitentiary
  penitentiary_id: string
  call_status: CallStatus
  transmited_audio?: TransmitedAudio
  received_audio?: ReceivedAudio
  deleted: boolean
  duration: number
  status: Status
  created_at: string
  updated_at: string
  deleted_at: string
}

/* Provider */

export interface OverusedPhrase {
  id: string
  phrase: string
  appears: number
}
export interface Detail {
  assigned_pin: number
  receiver: string
  duration: string
  date: string
  hour: string
  voiceControlSimilarity: number
  transcription: Segment[]
  overusedPhrases: OverusedPhrase[]
}

export interface Counts {
  calls: ComparativeValues
  pins: ComparativeValues
  alerts: ComparativeValues
}

export interface Charts {
  calls: TimeChartValues[]
  alerts: TimeChartValues[]
}
export interface CallContextType {
  listOfCalls: Call[]
  pinActivityList: PinActivity[]
  counts: Counts
  charts: Charts
  detail: Detail
  actions?: {
    getDetail: (id: string) => Promise<boolean>
    getStatistics: (filters: FiltersCallView) => Promise<boolean>
    getListOfPins: (filters: FiltersCallList) => Promise<boolean>
    getListOfCalls: (filters: FiltersPinList) => Promise<boolean>
  }
}

export interface CallVM extends Call {
  hour?: string
  pin?: number
}

export interface FiltersCallView {
  global: DateFilter
  listOfCall: { by?: 'CREATED_AT' | 'PIN_ID' | 'RECEPTION_NUMBER' | 'DURATION' }
  listOfPin: { latest?: number }
}

export interface FiltersCallList extends DateFilter {
  orderBy?: string
}

export interface FiltersPinList extends DateFilter {
  latest?: number
}
