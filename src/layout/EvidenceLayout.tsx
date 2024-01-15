import ContextDrawer from 'components/Drawer/ContextDrawer'
import Navbar from 'components/Layout/Navbar'
import Sidebar from 'components/Layout/Sidebar'
import Loader from 'components/Loader'
import { useAuth } from 'context/Auth'
import { useRTCPlayer } from 'context/RTCPlayer'
import { useSettings } from 'context/Settings'
import { apiMessages } from 'globalMessages'
import useToast from 'hooks/useToast'
import { ReactElement, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useIntl } from 'react-intl'
import { Layout } from 'types/layout'

const EvidenceLayout = ({ children }: Layout): ReactElement => {
  const intl = useIntl()
  const { actions, auth } = useAuth()
  const { actions: playerActions } = useRTCPlayer()
  const toast = useToast()
  const { settings } = useSettings()

  const onIdle = (): void => {
    toast.danger(intl.formatMessage(apiMessages.sessionExpired))
    actions?.killSession(true)
  }

  useIdleTimer({
    timeout: 1000 * 60 * settings.inactivityTime,
    onIdle,
    startManually: auth.profile.closeByInactivity
  })

  useEffect(() => {
    playerActions?.hidePlayer()
  }, [])

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="absolute inset-0 ml-14 mt-11 flex flex-col flex-1 overflow-y-auto">
        <main className="flex-1 bg-background">
          <div className="py-6">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0 lg:pl-8">
              <div className="py-4">
                <div className="rounded-lg">{children}</div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ContextDrawer />
      <Loader />
    </>
  )
}

export default EvidenceLayout
