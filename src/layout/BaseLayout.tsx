import { ReactElement } from 'react'
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
import { Aside } from 'components/Layout/Aside'

const BaseLayout = ({ children }: Layout): ReactElement => {
  const intl = useIntl()
  const { actions } = useAuth()
  const toast = useToast()

  const onIdle = (): void => {
    toast.danger(intl.formatMessage(apiMessages.sessionExpired))
    actions?.killSession(true)
  }

  useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle
  })

  return (
    <>
      <div className="h-screen overflow-y-hidden relative">
        <Navbar />
        <Sidebar />
        <div className="absolute inset-0 ml-14 mt-11 flex flex-1 overflow-y-auto">
          <main className="flex-1 bg-background min-h-full h-fit container">
            <div className="py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8 py-4">
                {children}
              </div>
            </div>
          </main>
          <Aside />
        </div>
      </div>
      <ContextDrawer />
      <Loader />
    </>
  )
}

export default BaseLayout
