import { Context, createContext } from 'react'
import { DirectoryContextType } from 'types/directory'

export const initialState: DirectoryContextType = {
  speakerList: [],
  speakerDashboard: {
    profile: {
      pin: null,
      name: '',
      age: 0,
      gender: 'MALE',
      location: '',
      penitentiary: ''
    },
    callAlertChart: { calls: [], alerts: [] },
    alertPercentage: 0,
    historyOfCall: [],
    listOfCall: []
  }
}

export const DirectoryContext: Context<DirectoryContextType> =
  createContext(initialState)
