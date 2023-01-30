import { createAction } from 'types/contextReducer'
import { SpeakerDetail, SpeakerDetailDashboard } from 'types/directory'

export enum Types {
  SET_SPEAKER_LIST = 'directory/setSpeakerList',
  SET_SPEAKER_DASHBOARD = 'directory/setSpeakerDashboard'
}

export const actions = {
  setSpeakerList: createAction<Types, SpeakerDetail[]>(Types.SET_SPEAKER_LIST),
  setSpeakerDashboard: createAction<Types, SpeakerDetailDashboard>(
    Types.SET_SPEAKER_DASHBOARD
  )
}
