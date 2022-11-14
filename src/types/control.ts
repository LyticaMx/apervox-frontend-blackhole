import { Speaker } from './speaker'
import { ControlMedianVector } from './vector'

export interface ControlAudio {
  id: string
  name: string
  // segments ControlSegment[]
  control_group: ControlGroup
  control_group_id: string
  // conversation Conversation?
  created_at: string
}

export interface ControlGroup {
  id: string
  speaker: Speaker
  speaker_id: string
  audios: ControlAudio[]
  median_vector?: ControlMedianVector
  created_at: string
  updated_at: string
}

export interface ControlCall {
  id: string
}

export interface ParamsCG {
  pin: string
}

export interface ControlGroupsType {
  controlGroups: ControlGroup[]
  audios: ControlAudio[]
  calls: ControlCall[]
  actions?: {
    getControlGroups: () => Promise<boolean>
    saveControlGroup: (params: ParamsCG) => Promise<boolean>
    getAudios: (id: string) => Promise<boolean>
    saveAudio: (id: string) => Promise<boolean>
    deleteAudio: (id: string) => Promise<boolean>
    getCalls: (id: string) => Promise<boolean>
  }
}
