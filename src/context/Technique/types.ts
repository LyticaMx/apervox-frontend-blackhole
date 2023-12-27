import { DateFilter, SearchFilter } from 'types/filters'
import { Priority } from 'types/priority'
import { Status } from 'types/status'
import { Target } from 'types/target'
import { TechniqueTabs, Turn } from 'types/technique'

export interface TechniqueGroup {
  id: string
  name: string
}

export interface InnerTechnique {
  id?: string
  name: string
  description?: string
  groups: TechniqueGroup[]
  notificationTimeUnit?: 'days' | 'hours'
  notificationTime?: number
  notificationDays: string
  notificationHours: string
  shift?: string
  reportEvidenceEvery?: string
  targets?: any[]
  priority: Priority
  status: Status
  attentionTurn?: Turn | ''
  attentionTime?: string
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
  setTechnique: (params: InnerTechnique) => void
  setTarget: (params?: Target) => void
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
