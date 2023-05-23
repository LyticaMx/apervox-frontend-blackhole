import { useContext } from 'react'
import { SettingsContextType } from 'types/settings'
import { SettingsContext } from './context'

export const useSettings = (): SettingsContextType =>
  useContext(SettingsContext)
