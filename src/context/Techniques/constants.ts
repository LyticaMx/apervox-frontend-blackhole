import { Filters, createAction } from 'types/contextReducer'
import { Technique } from 'types/technique'
import { TechniquesPagination, TechniquesStaticFilter } from './types'

export enum Types {
  SET_TECHNIQUES = 'technique/setTechniques',
  SET_TECHNIQUES_PAGINATION = 'technique/setTechniquesPagination',
  SET_TECHNIQUES_FILTERS = 'technique/setTechniquesFilters'
}

export const actions = {
  setTechniques: createAction<
    Types,
    {
      data: Technique[]
      total?: number
    }
  >(Types.SET_TECHNIQUES),
  setTechniquesPagination: createAction<Types, TechniquesPagination>(
    Types.SET_TECHNIQUES_PAGINATION
  ),
  setTechniquesFilters: createAction<Types, Filters<TechniquesStaticFilter>>(
    Types.SET_TECHNIQUES_FILTERS
  )
}
