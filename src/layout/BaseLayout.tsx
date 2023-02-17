import { ReactElement, useEffect } from 'react'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { useIdleTimer } from 'react-idle-timer'
import { useIntl } from 'react-intl'

import { useAuth } from 'context/Auth'
import Loader from 'components/Loader'
import Sidebar from 'components/Layout/Sidebar'

import { getDateDiferenceInMinutes } from 'utils/formatTime'
import { Layout } from 'types/layout'
import { apiMessages } from 'globalMessages'
import Navbar from 'components/Layout/Navbar'
import ContextDrawer from 'components/Drawer/ContextDrawer'

const BaseLayout = ({ children }: Layout): ReactElement => {
  const intl = useIntl()
  const { auth, actions } = useAuth()
  const { token } = auth

  useEffect(() => {
    validateSession(null, true)
  }, [])

  const validateSession = async (
    _,
    showTimeSession?: boolean
  ): Promise<void> => {
    const session: any = jwtDecode(token) // decode your token here
    const exp = session.exp

    if (exp) {
      const diffTime = getDateDiferenceInMinutes(
        new Date(),
        new Date(exp * 1000)
      )

      if (diffTime <= 0) {
        await actions?.killSession()
      } else if (diffTime < 10) {
        const successRefresh = await actions?.refreshToken()

        if (!successRefresh) {
          actions?.killSession()
        }
      }
    }
  }

  const onIdle = (): void => {
    toast.error(intl.formatMessage(apiMessages.sessionExpired))
    actions?.killSession(true)
  }

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle,
    onAction: validateSession
  })

  return (
    <>
      <div className="h-screen overflow-y-hidden relative">
        <Navbar />
        <Sidebar />
        <div className="absolute inset-0 ml-14 mt-11 flex flex-col flex-1 overflow-y-auto">
          <main className="flex-1 bg-background">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="rounded-lg">{children}</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ContextDrawer />
      <Loader />
    </>
  )
}

export default BaseLayout
