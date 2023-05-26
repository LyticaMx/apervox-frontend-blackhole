import { Context, createContext } from 'react'
import { SettingsContextType, SettingsState } from 'types/settings'

export const initialState: SettingsState = {
  concurrentSessions: 0,
  doubleValidation: false,
  downloadPath: '',
  fullEvidenceView: false,
  inactivityTime: 0
}

export const SettingsContext: Context<SettingsContextType> = createContext({
  settings: initialState
})
