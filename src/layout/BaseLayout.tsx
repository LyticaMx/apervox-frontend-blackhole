import { ReactElement, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useIdleTimer } from 'react-idle-timer'
import { useIntl } from 'react-intl'

import { useAuth } from 'context/Auth'
import Loader from 'components/Loader'
import Sidebar from 'components/Layout/Sidebar'

import { Layout } from 'types/layout'
import { apiMessages } from 'globalMessages'
import Navbar from 'components/Layout/Navbar'
import ContextDrawer from 'components/Drawer/ContextDrawer'
import useToast from 'hooks/useToast'
import { isAfter } from 'date-fns'

const BaseLayout = ({ children }: Layout): ReactElement => {
  const intl = useIntl()
  const { auth, actions, refreshingToken } = useAuth()
  const { token } = auth
  const toast = useToast()

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
      if (
        isAfter(new Date(), new Date(exp * 1000 + 1000)) &&
        !refreshingToken?.current
      ) {
        const successRefresh = await actions?.refreshToken()

        if (!successRefresh) {
          actions?.killSession()
        }
      }
    }
  }

  const onIdle = (): void => {
    toast.danger(intl.formatMessage(apiMessages.sessionExpired))
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
              <div className="mx-auto px-4 sm:px-6 md:px-8 py-4">
                {children}
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
