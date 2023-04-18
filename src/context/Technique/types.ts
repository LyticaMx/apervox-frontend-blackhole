import { Target, Technique } from 'types/technique'

export interface State {
  technique?: Technique
  target?: Target
  targets: Target[]
}

export interface Actions {
  setTechnique: (params: Technique) => void
  setTarget: (params: Target) => void
  getTargets: () => void
}

export interface ContextType extends State {
  actions?: Actions
}
