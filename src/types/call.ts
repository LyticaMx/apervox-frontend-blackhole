import { MultipleUpdateEntity } from './api'
import { ReceivedAudio, TransmitedAudio } from './audio'
import { DatesFilterForm } from './datesFilter'
import { DateFilter, PaginationFilter } from './filters'
import { Penitentiary } from './penitentiaries'
import { Speaker, Status } from './speaker'
import { ComparativeValues, PinActivity, TimeChartValues } from './statistics'

/* Models */
export enum CallStatus {
  ANSWERED,
  REJECTED,
  INTERRUPTED
}

export enum CallType {
  'TRANSMITTED' = 1,
  'RECEIVED' = 2
}

export interface CallModel {
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

export interface CallVM extends CallModel {
  hour?: string
  pin?: number
  alert?: boolean // Se agrega como opciona debido a que falta en la tabla y tira error
}

/* Detail of call view */
export interface TagModel {
  id: string
  label: string
}

export interface LinkedTagModel {
  received: TagModel[]
  transmitted: TagModel[]
}

export interface WordFrequencySingleModel {
  word: string
  frequency: number
}

export interface WordFrequencyModel {
  received: WordFrequencySingleModel[]
  transmitted: WordFrequencySingleModel[]
}

export interface SegmentModel {
  id: string
  start_time: number
  end_time: number
  transcription: string
  transcription_id: string
}

export interface SegmentVM extends SegmentModel {
  updated?: boolean
}

export interface SegmentListModel {
  received: SegmentVM[]
  transmitted: SegmentVM[]
}

export interface SummaryCallDetailModel {
  alert: boolean
  assigned_pin: number
  receiver: string
  duration: string
  hour: string
  date: string
}

export interface CallEmbeddingModel {
  received_embedding: boolean
  transmitted_embedding: boolean
}

export interface CallDetailContextState {
  summary: SummaryCallDetailModel
  voiceControlSimilarity: number
  segmentList: SegmentListModel
  tagList: TagModel[]
  linkedTagList: LinkedTagModel
  wordFrequency: WordFrequencyModel
  embedings: CallEmbeddingModel
}

/* Dashboard of calls */
export interface SummaryCountVM {
  calls: ComparativeValues
  pins: ComparativeValues
  alerts: ComparativeValues
}

export interface HistoricalChartVM {
  calls: TimeChartValues[]
  alerts: TimeChartValues[]
}

/* Dashboard context */
export interface CallContextState {
  listOfCalls: CallVM[]
  callsPagination: CallsPagination
  pinActivityList: PinActivity[]
  pinsPagination: PinsPagination
  counts: SummaryCountVM
  charts: HistoricalChartVM
  globalFilter: DateFilter
}

export interface DashboardCallActions {
  getStatistics: (filters?: DateFilter) => Promise<boolean>
  getListOfPins: (filters?: DateFilter) => Promise<void>
  getListOfCalls: (filters?: ListOfCallFilter) => Promise<void>
  getAll: (filters?: DateFilter) => Promise<boolean>
  setGlobalFilters: (filters: DatesFilterForm) => Promise<void>
  playCall: (id: string, type?: string) => Promise<any>
}

export interface DashboardCallContextType extends CallContextState {
  actions?: DashboardCallActions
}

/* CallDetail context */
export interface CallDetailActions {
  getSummaryCall: (filters: DetailFilters) => Promise<boolean>
  getTransmitterSimilarity: (filters: DetailFilters) => Promise<boolean>
  getEmbedings: (filters: DetailFilters) => Promise<boolean>
  getLinkedTags: (filters: DetailFilters) => Promise<boolean>
  getWordFrequency: (filters: DetailFilters) => Promise<boolean>
  getSegmentList: (filters: DetailFilters) => Promise<boolean>
  getGeneralTags: () => Promise<boolean>
  getAllDetail: (filters: DetailFilters) => Promise<boolean>

  /* Actions for server */
  linkTag: (
    callId: string,
    tagId: string,
    type: CallType,
    unlink?: boolean
  ) => Promise<boolean>
  createTag: (label: string) => Promise<TagModel>
  createVoicePrintReceived: (
    id: string,
    type: 'TRANSMITTED_AUDIO' | 'RECEIVED_AUDIO'
  ) => Promise<boolean>
  createAutomaticTranscription: (
    type: 'TRANSMITTED_AUDIO' | 'RECEIVED_AUDIO',
    audioId: string
  ) => Promise<boolean>
  updateTranscriptions: (
    transcription: MultipleUpdateEntity[]
  ) => Promise<boolean>
  setDates: (audioId: string, dates: DatesFilterForm) => void
}

export interface CallDetailContextType extends CallDetailContextState {
  actions?: CallDetailActions
}

/* Filters & pagination */
export interface CallsPagination extends PaginationFilter {
  pin_number: number | null
  calls: 'ALL' | 'NO_ALERT' | 'ALERT'
  orderBy: 'RECEPTION_NUMBER' | 'PIN' | 'CREATED_AT' | 'DURATION'
  totalRecords: number
}

export interface PinsParams extends DateFilter {
  page?: number
  limit?: number
}

export interface PinsPagination extends PaginationFilter {
  totalRecords: number
}

export interface ListOfCallFilter extends DateFilter {
  calls?: 'ALL' | 'NO_ALERT' | 'ALERT'
  order_by?: 'CREATED_AT' | 'PIN' | 'RECEPTION_NUMBER' | 'DURATION'
  page?: number
  limit?: number
  pin_number?: number | null
}

export interface FiltersCallList extends DateFilter {
  orderBy?: string
}

export interface FiltersPinList extends DateFilter {
  latest?: number
}

export interface DetailFilters extends DatesFilterForm {
  id?: string
}
