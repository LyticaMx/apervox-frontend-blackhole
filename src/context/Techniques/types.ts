import { Technique } from 'types/technique'

export interface State {
  techniques: Technique[]
}

export interface Actions {
  getTechniques: () => void
}

export interface ContextType extends State {
  actions?: Actions
}
