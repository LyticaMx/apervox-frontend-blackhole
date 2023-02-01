import { createAction } from 'types/contextReducer'
import { DateFilter } from 'types/filters'

export enum Types {
  SET_FILTERS = 'bondingNetwork/setFilters',
  SET_EMBEDDING = 'bondingNetwork/setEmbedding',
  SET_EMBEDDINGS = 'bondingNetwork/setEmbeddings',
  SET_EMBEDDINGS_PAGINATION = 'bondingNetwork/setEmbeddingsPagination',
  SET_PINS = 'bondingNetwork/setPins',
  SET_NETWORK = 'bondingNetwork/setNetwork',
  SET_CALLS_IDS = 'bondingNetwork/setCallsIds',
  SET_CALLS = 'bondingNetwork/setCalls',
  SET_CALLS_PAGINATION = 'bondingNetwork/setCallsPagination',
  SET_DATES = 'bondingNetwork/setDates'
}
export const actions = {
  setFilters: createAction<Types>(Types.SET_FILTERS),
  setEmbedding: createAction<Types>(Types.SET_EMBEDDING),
  setEmbeddings: createAction<Types>(Types.SET_EMBEDDINGS),
  setEmbeddingsPagination: createAction<Types>(Types.SET_EMBEDDINGS_PAGINATION),
  setPins: createAction<Types>(Types.SET_PINS),
  setNetwork: createAction<Types>(Types.SET_NETWORK),
  setCallsIds: createAction<Types>(Types.SET_CALLS_IDS),
  setCalls: createAction<Types>(Types.SET_CALLS),
  setCallsPagination: createAction<Types>(Types.SET_CALLS_PAGINATION),
  setDates: createAction<Types, DateFilter>(Types.SET_DATES)
}
