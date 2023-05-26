import { Context, createContext } from 'react'
import { SettingsContextType, SettingsState } from 'types/settings'

export const initialState: SettingsState = {
  concurrentSessions: 0,
  doubleValidation: true,
  downloadPath: '',
  fullEvidenceView: false,
  inactivityTime: 5
}

export const SettingsContext: Context<SettingsContextType> = createContext({
  settings: initialState
})
