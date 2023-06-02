import { Target, Technique } from 'types/technique'

export interface TechniqueGroup {
  id: string
  name: string
}

export interface InnerTechnique
  extends Omit<
    Technique,
    'id' | 'created_at' | 'expires_at' | 'registered_by' | 'time_on_platform'
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
  target?: Target
  targets: Target[]
}

export interface Actions {
  get: (id: string) => Promise<void>
  setTechnique: (params: Technique) => void
  setTarget: (params: Target) => void
  getTargets: () => void
  create: (technique: InnerTechnique) => Promise<boolean>
  update: (technique: InnerTechnique) => Promise<boolean>
}

export interface ContextType extends State {
  actions?: Actions
}
