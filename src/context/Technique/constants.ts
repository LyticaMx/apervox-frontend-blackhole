import { createAction } from 'types/contextReducer'
import { Target } from 'types/target'
import { Technique, TechniqueTabs } from 'types/technique'

export enum Types {
  SET_TECHNIQUE = 'technique/setTechnique',
  SET_TARGET = 'technique/setTarget',
  SET_TARGETS = 'technique/setTargets',
  SET_SUMMARY = 'technique/setSummary',
  SHOW_FORMS = 'technique/showForms',
  SET_ACTIVE_TAB = 'technique/setActiveTab'
}
export const actions = {
  setTechnique: createAction<Types, Technique>(Types.SET_TECHNIQUE),
  setTarget: createAction<Types, Target>(Types.SET_TARGET),
  setTargets: createAction<Types, Target[]>(Types.SET_TARGETS),
  setSummary: createAction<Types, string>(Types.SET_SUMMARY),
  showForms: createAction<Types, boolean>(Types.SHOW_FORMS),
  setActiveTab: createAction<Types, TechniqueTabs>(Types.SET_ACTIVE_TAB)
}
