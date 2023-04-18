import { createAction } from 'types/contextReducer'
import { Technique } from 'types/technique'

export enum Types {
  GET_TECHNIQUES = 'technique/getTechniques'
}
export const actions = {
  getTechniques: createAction<Types, Technique[]>(Types.GET_TECHNIQUES)
}
