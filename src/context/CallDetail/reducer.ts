import { CallDetailContextState } from 'types/call'
import { Action } from 'types/contextReducer'
import { Types } from './constants'

export const reducer = (
  state: CallDetailContextState,
  action: Action<Types>
): CallDetailContextState => {
  switch (action.type) {
    case Types.SET_SUMMARY:
      return {
        ...state,
        summary: action.payload
      }
    case Types.SET_GENERAL_TAGS:
      return {
        ...state,
        tagList: action.payload
      }
    case Types.SET_LINKED_TAGS:
      return {
        ...state,
        linkedTagList: action.payload
      }
    case Types.SET_SEGMENT_LIST:
      return {
        ...state,
        segmentList: action.payload
      }
    case Types.SET_TRANSMITTER_SIMILARITY:
      return {
        ...state,
        voiceControlSimilarity: action.payload
      }
    case Types.SET_WORD_FREQUENCY:
      return {
        ...state,
        wordFrequency: action.payload
      }
    case Types.SET_EMBEDINGS:
      return {
        ...state,
        embedings: action.payload
      }
    default:
      return state
  }
}
