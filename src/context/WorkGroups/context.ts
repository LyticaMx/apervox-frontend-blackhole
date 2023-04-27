import { Context, createContext } from 'react'
import { ContextType, WorkgroupState } from 'types/workgroup'
import { Status } from 'types/status'

export const initialState: WorkgroupState = {
  selected: {
    id: '',
    name: '',
    description: '',
    registered_by: '',
    total_users: 0,
    created_at: '',
    updated_at: '',
    techniques: {
      assigned: 0,
      current: 0,
      to_conclude: 0,
      concluded: 0
    },
    status: Status.ACTIVE
  },
  workGroups: [],
  history: [],
  users: [],
  techniques: [],
  associatedUsers: [],
  associatedTechniques: [],
  totalWorkGroups: 0,
  dateFilter: {},
  searchFilter: {},
  staticFilter: {},
  workGroupsPagination: {
    page: 1,
    limit: 15,
    totalRecords: 0,
    sort: []
  },
  usersPagination: {
    page: 1,
    limit: 15,
    totalRecords: 0,
    sort: []
  },
  techniquesPagination: {
    page: 1,
    limit: 15,
    totalRecords: 0,
    sort: []
  }
}

export const WorkGroupsContext: Context<ContextType> =
  createContext(initialState)
