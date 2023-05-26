export interface SettingsState {
  fullEvidenceView: boolean
  downloadPath: string
  doubleValidation: boolean
  inactivityTime: number
  concurrentSessions: number
}

export interface SettingsActions {
  get: () => Promise<void>
  update: (
    options: Partial<SettingsState>,
    socketUpdate?: boolean
  ) => Promise<boolean>
}

export interface SettingsContextType {
  settings: SettingsState
  actions?: SettingsActions
}
