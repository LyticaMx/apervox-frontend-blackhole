import { Context, createContext } from 'react'
import { State, ContextType } from 'types/bondingNetwork'
import { Action } from 'types/contextReducer'
import { Types } from './constants'

export const initialState: State = {
  filters: {
    pin: undefined,
    get_by: 'CONTROL_GROUPS',
    start_time: undefined,
    end_time: undefined
  },
  bondingNetwork: {
    nodes: [],
    links: []
  },
  embedding: undefined,
  embeddings: [],
  embeddingsPagination: {
    page: 1,
    limit: 20,
    totalRecords: 0
  },
  calls_ids: [],
  calls: [],
  callsPagination: {
    page: 1,
    limit: 10,
    totalRecords: 0,
    orderBy: 'PIN'
  }
}

export const reducer = (state: State, action: Action<Types>): State => {
  switch (action.type) {
    case Types.SET_FILTERS:
      return { ...state, filters: action.payload }
    case Types.SET_NETWORK:
      return { ...state, bondingNetwork: action.payload }
    case Types.SET_EMBEDDING:
      return { ...state, embedding: action.payload }
    case Types.SET_EMBEDDINGS:
      return { ...state, embeddings: action.payload }
    case Types.SET_EMBEDDINGS_PAGINATION:
      return {
        ...state,
        embeddingsPagination: {
          ...state.embeddingsPagination,
          ...action.payload
        }
      }
    case Types.SET_CALLS_IDS:
      return { ...state, calls_ids: action.payload }
    case Types.SET_CALLS:
      return { ...state, calls: action.payload }
    case Types.SET_CALLS_PAGINATION:
      return {
        ...state,
        callsPagination: {
          ...state.callsPagination,
          ...action.payload
        }
      }
    default:
      return state
  }
}

export const BondingNetworkContext: Context<ContextType> =
  createContext(initialState)
