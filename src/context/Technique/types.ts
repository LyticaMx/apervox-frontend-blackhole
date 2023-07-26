import { DateFilter, SearchFilter } from 'types/filters'
import { Target } from 'types/target'
import { Technique, TechniqueTabs } from 'types/technique'

export interface TechniqueGroup {
  id: string
  name: string
}

export interface InnerTechnique
  extends Omit<
    Technique,
    | 'id'
    | 'created_at'
    | 'expires_at'
    | 'registered_by'
    | 'time_on_platform'
    | 'groups'
  > {
  id?: string
  description: string
  groups: TechniqueGroup[]
  notificationTimeUnit: 'days' | 'hours'
  notificationTime: number
  shift: string
  reportEvidenceEvery: string
  targets?: any[]
  etsiTargets?: any[]
  created_at?: string
  expires_at?: string
  registered_by?: string
  time_on_platform?: string
}

export interface State {
  technique?: InnerTechnique
  techniqueId?: string
  summary: string
  showTargetForms: boolean
  target?: Target
  dateFilter: DateFilter
  searchFilter: SearchFilter
  activeTab: TechniqueTabs
}

export interface Actions {
  get: () => Promise<boolean>
  getDescription: () => Promise<boolean>
  updateDescription: (data: string) => Promise<boolean>
  setTechnique: (params: Technique) => void
  setTarget: (params: Target | undefined) => void
  showForms: (params: Target) => void
  setActiveTab: (tab: TechniqueTabs) => void
  hasLinkedDateTargets: () => Promise<boolean>
  update: (
    technique: Omit<
      InnerTechnique,
      'description' | 'attention_turn' | 'status' | 'total_target'
    >,
    staticDateTargets?: string[]
  ) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
