import { Priority } from './priority'
import { Status } from './status'

export enum EvidenceType {
  AUDIO = 0,
  VIDEO = 1,
  IMAGE = 2,
  DOCUMENT = 3
}

export enum EvidenceClasification {
  RELEVANT = 0,
  NOT_RELEVANT = 1,
  DISCARDED = 2
}

export enum EvidenceTag {
  BSC = 0,
  DISTORTION = 1
}

export enum Turn {
  MORNING = 'morning',
  EVENING = 'afternoon',
  NIGHTNING = 'night'
}

export enum PhoneCompany {
  TELCEL = 0,
  'AT&T' = 1,
  MOVISTAR = 2
}

export interface TechniqueGroup {
  id: string
  name: string
}

export interface Technique {
  id: string
  name: string
  created_at: string
  expires_at: string
  registered_by: string
  priority: Priority
  status: Status
  attention_turn: Turn | ''
  total_target: number
  groups?: []
}

export interface Target {
  id?: string
  name: string
  phone_number: string
  expires_at?: string
  created_at?: string
  phone_company: string
  overflow_id?: string
  liid?: string
  liid_v?: string
  type?: 'etsi' | 'conventional'
}

export interface Evidence {
  id: string
  number_event: string
  number_target: string
  number_origin: string
  created_at: string
  expires_at: string
  duration: string
  carrier: string
  imei: string
  imsi: string
  code_cell_start: string
  direction_cell_start: string
  region_cell_start: string
  audit_by: string
  follow_up: string
  obtained_from: string
  tag: EvidenceTag
  clasification: EvidenceClasification
  type: EvidenceType
}
