import { createAction } from 'types/contextReducer'
import { Target, Technique } from 'types/technique'

export enum Types {
  SET_TECHNIQUE = 'technique/setTechnique',
  SET_TARGET = 'technique/setTarget',
  SET_TARGETS = 'technique/setTargets',
  SET_SUMMARY = 'technique/setSummary'
}
export const actions = {
  setTechnique: createAction<Types, Technique>(Types.SET_TECHNIQUE),
  setTarget: createAction<Types, Target>(Types.SET_TARGET),
  setTargets: createAction<Types, Target[]>(Types.SET_TARGETS),
  setSummary: createAction<Types, string>(Types.SET_SUMMARY)
}
