import { Action } from 'types/contextReducer'
import { DirectoryContextState } from 'types/directory'
import { Types } from './constants'

export const reducer = (
  state: DirectoryContextState,
  action: Action<Types>
): DirectoryContextState => {
  switch (action.type) {
    case Types.SET_SPEAKER_LIST:
      return {
        ...state,
        speakerList: action.payload
      }
    case Types.SET_SPEAKER_DASHBOARD:
      return {
        ...state,
        speakerDashboard: action.payload
      }
    default:
      return state
  }
}
