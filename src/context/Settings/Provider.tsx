import { ReactElement, ReactNode, useMemo, useState } from 'react'
import { SettingsContext, initialState } from './context'
import { SettingsContextType, SettingsState } from 'types/settings'
import useApi from 'hooks/useApi'

interface Props {
  children: ReactNode
}

const SettingsProvider = ({ children }: Props): ReactElement => {
  const [settings, setSettings] = useState(initialState)

  const getConfigService = useApi({ endpoint: 'settings', method: 'get' })
  const updateConfigService = useApi({ endpoint: 'settings', method: 'put' })

  const get = async (): Promise<void> => {
    try {
      const response = await getConfigService()
      setSettings({
        concurrentSessions: response.data.concurrent_sessions,
        doubleValidation: response.data.double_validation,
        downloadPath: response.data.download_path,
        fullEvidenceView: response.data.full_evidence_view,
        inactivityTime: response.data.inactivity_time
      })
    } catch {}
  }

  const update = async (
    options: Partial<SettingsState>,
    socketUpdate?: boolean
  ): Promise<boolean> => {
    try {
      if (socketUpdate) {
        setSettings((old) => ({ ...old, ...options }))
        return true
      }
      await updateConfigService({
        body: {
          full_evidence_view:
            options.fullEvidenceView ?? settings.fullEvidenceView,
          download_path: options.downloadPath ?? settings.downloadPath,
          double_validation:
            options.doubleValidation ?? settings.doubleValidation,
          inactivity_time: options.inactivityTime ?? settings.inactivityTime,
          concurrent_sessions:
            options.concurrentSessions ?? settings.concurrentSessions
        }
      })
      return true
    } catch {
      return false
    }
  }

  const contextValue = useMemo<SettingsContextType>(
    () => ({
      settings,
      actions: {
        get,
        update
      }
    }),
    [settings]
  )

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsProvider }
