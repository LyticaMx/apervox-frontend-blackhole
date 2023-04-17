import { Context, createContext } from 'react'
import { UserContextState } from 'types/user'

export const initialState: UserContextState = {
  listOfUsers: [],
  usersPagination: {
    limit: 15,
    limitOptions: [15, 25, 50, 100],
    page: 1,
    sort: [],
    totalRecords: 0
  },
  searchFilter: {},
  staticFilter: {},
  dateFilter: {}
}

export const UserContext: Context<UserContextState> =
  createContext(initialState)
