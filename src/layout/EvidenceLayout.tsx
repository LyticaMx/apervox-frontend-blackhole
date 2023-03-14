import ContextDrawer from 'components/Drawer/ContextDrawer'
import Navbar from 'components/Layout/Navbar'
import Sidebar from 'components/Layout/Sidebar'
import Loader from 'components/Loader'
import { useAuth } from 'context/Auth'
import { apiMessages } from 'globalMessages'
import jwtDecode from 'jwt-decode'
import { ReactElement, useEffect } from 'react'
import { useIdleTimer } from 'react-idle-timer'
import { useIntl } from 'react-intl'
import { toast } from 'react-toastify'
import { Layout } from 'types/layout'
import { getDateDiferenceInMinutes } from 'utils/formatTime'

const EvidenceLayout = ({ children }: Layout): ReactElement => {
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
              <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0 lg:pl-8">
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

export default EvidenceLayout