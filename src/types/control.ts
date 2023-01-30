import { GeneralParams } from './api'
import { DatesFilterForm } from './datesFilter'
import { DateFilter } from './filters'

export interface ControlGroup {
  id: string
  uid: string
  pin: number
  current: boolean
  embedding_generate: boolean
  audios: number
}

export interface ControlAudio {
  id: string
  name: string
  loading_date: string
}

export interface ControlCall {
  date: string
  duration: number
  pin: number
  receptor: number
  similarity: number
}

export interface GetGroupsParams extends GeneralParams {
  order_by?: string
}

export interface ParamsCG {
  pin: number
  current: boolean
  save_embedding: boolean
  audios: File[]
}

export interface ParamsAddAudios {
  group_id: string
  audios: File[]
}

export interface CallsFilters {
  id?: string
  other_pin?: boolean
  order_by?: string
  page?: number
  limit?: number
}

export interface State {
  controlGroup: ControlGroup | undefined
  controlGroups: ControlGroup[]
  audios: ControlAudio[]
  calls: ControlCall[]
  groupsPagination: {
    limit: number
    page: number
    totalRecords: number
    orderBy: string
  }
  callsPagination: {
    limit: number
    page: number
    totalRecords: number
    orderBy: string
    otherPin: boolean
  }
  dates: DateFilter
}
export interface Actions {
  initView: () => void
  setDates: (params: DatesFilterForm) => void
  setControlGroup: (group: ControlGroup) => void
  getControlGroups: (params?: GetGroupsParams) => Promise<boolean>
  saveControlGroup: (params: ParamsCG) => Promise<boolean>
  getAudios: (id?: string) => Promise<boolean>
  addAudios: (params: ParamsAddAudios) => Promise<boolean>
  deleteAudio: (id: string) => Promise<boolean>
  getCalls: (params?: CallsFilters) => Promise<boolean>
  createEmbedding: (id: string) => Promise<boolean>
  playAudio: (id: string, type?: string) => Promise<any>
  playCall: (id: string, type?: string) => Promise<boolean>
}
export interface ContextType extends State {
  actions?: Actions
}
