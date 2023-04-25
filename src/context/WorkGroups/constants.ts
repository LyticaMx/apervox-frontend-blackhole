import { createAction } from 'types/contextReducer'
import { DateFilter, SearchFilter } from 'types/filters'
import {
  Pagination,
  WorkGroup,
  GenericItem,
  WorkGroupHistory,
  WorkGroupUser,
  WorkGroupTechnique,
  WorkgroupStaticFilter
} from 'types/workgroup'

export enum Types {
  SET_USERS = 'workGroups/setUsers',
  SET_TECHNIQUES = 'workGroups/setTechniques',
  SET_HISTORY = 'workGroups/setHistory',
  SET_WORKGROUPS = 'workGroups/setWorkGroups',
  SET_WORKGROUP_USERS = 'workGroups/setWorkGroupUsers',
  SET_WORKGROUP_TECHNIQUES = 'workGroups/setWorkgroupTechniques',
  SET_SELECTED_WORKGROUP = 'workGroups/setSelectedWorkGroup',
  SET_WORKGROUP_PAGINATION = 'workGroups/setWorkGroupPagination',
  SET_WORKGROUP_USERS_PAGINATION = 'workGroups/setWorkGroupUsersPagination',
  SET_WORKGROUP_TECHNIQUES_PAGINATION = 'workGroups/setWorkGroupTechniquesPagination',
  SET_WORKGROUP_FILTERS = 'workGroups/setWorkGroupFilters',
  SET_WORKGROUP_DATE_FILTERS = 'workGroups/setWorkGroupDateFilters',
  SET_WORKGROUP_STATIC_FILTERS = 'workGroups/setWorkGroupStaticFilters'
}

export const actions = {
  setUsers: createAction<Types, GenericItem[]>(Types.SET_USERS),
  setTechniques: createAction<Types, GenericItem[]>(Types.SET_TECHNIQUES),
  setHistory: createAction<Types, WorkGroupHistory[]>(Types.SET_HISTORY),
  setWorkGroups: createAction<Types, WorkGroup[]>(Types.SET_WORKGROUPS),
  setWorkGroupUsers: createAction<Types, WorkGroupUser[]>(
    Types.SET_WORKGROUP_USERS
  ),
  setWorkGroupTechniques: createAction<Types, WorkGroupTechnique[]>(
    Types.SET_WORKGROUP_TECHNIQUES
  ),
  setSelectedWorkGroup: createAction<Types, WorkGroup>(
    Types.SET_SELECTED_WORKGROUP
  ),
  setWorkGroupPagination: createAction<Types, Pagination>(
    Types.SET_WORKGROUP_PAGINATION
  ),
  setWorkGroupFilters: createAction<Types, SearchFilter>(
    Types.SET_WORKGROUP_FILTERS
  ),
  setWorkGroupDateFilters: createAction<Types, DateFilter>(
    Types.SET_WORKGROUP_DATE_FILTERS
  ),
  setWorkGroupStaticFilters: createAction<Types, WorkgroupStaticFilter>(
    Types.SET_WORKGROUP_STATIC_FILTERS
  ),
  setWorkGroupUsersPagination: createAction<Types, Pagination>(
    Types.SET_WORKGROUP_USERS_PAGINATION
  ),
  setWorkGroupTechniquesPagination: createAction<Types, Pagination>(
    Types.SET_WORKGROUP_TECHNIQUES_PAGINATION
  )
}
