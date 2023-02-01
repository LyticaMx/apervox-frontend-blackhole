import { createAction } from 'types/contextReducer'
import { ControlAudio, ControlCall, ControlGroup } from 'types/control'
import { DateFilter } from 'types/filters'

export enum Types {
  SET_CONTROL_GROUPS = 'controlGroups/setControlGroups',
  SET_CONTROL_GROUP = 'controlGroups/setControlGroup',
  SET_AUDIOS = 'controlGroups/setAudios',
  SET_CALLS = 'controlGroups/setCalls',
  SET_DATES = 'controlGroups/setDates',
  SET_GROUPS_PAGINATION = 'controlGroups/setGroupsPagination',
  SET_CALLS_PAGINATION = 'controlGroups/setCallsPaginatio'
}
export const actions = {
  setControlGroups: createAction<Types, ControlGroup[]>(
    Types.SET_CONTROL_GROUPS
  ),
  setControlGroup: createAction<Types, ControlGroup | undefined>(
    Types.SET_CONTROL_GROUP
  ),
  setAudios: createAction<Types, ControlAudio[]>(Types.SET_AUDIOS),
  setCalls: createAction<Types, ControlCall[]>(Types.SET_CALLS),
  setDates: createAction<Types, DateFilter>(Types.SET_DATES),
  setGroupsPagination: createAction<Types>(Types.SET_GROUPS_PAGINATION),
  setCallsPagination: createAction<Types>(Types.SET_CALLS_PAGINATION)
}
