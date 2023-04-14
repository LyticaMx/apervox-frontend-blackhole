import { createAction } from 'types/contextReducer'
import { Target, Technique } from 'types/technique'

export enum Types {
  SET_TECHNIQUE = 'technique/setTechnique',
  SET_TARGET = 'technique/setTarget',
  GET_TARGETS = 'technique/getTargets'
}
export const actions = {
  setTechnique: createAction<Types, Technique>(Types.SET_TECHNIQUE),
  setTarget: createAction<Types, Target>(Types.SET_TARGET),
  getTargets: createAction<Types, Target[]>(Types.GET_TARGETS)
}
