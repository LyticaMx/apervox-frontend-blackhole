import { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navigator from 'router/Navigator'

import { LoaderProvider } from 'context/Loader/LoaderProvider'
import DrawerProvider from 'context/Drawer/Provider'
import { AuthProvider } from 'context/Auth'
import { LanguageProvider } from 'context/Language'
// import { ContextLogger, appContext } from 'context/ContextLogger'

// import { isDev } from 'utils/env'

import 'react-toastify/dist/ReactToastify.css'
import { SidebarProvider } from 'context/Sidebar'
import { AppContextProvider } from 'context/AppContextProvider'

// const contextConfig = { objectDiffs: true, arrayDiffs: false }

const RootComponent = (): ReactElement => (
  <>
    <BrowserRouter>
      <LanguageProvider>
        <LoaderProvider>
          <AuthProvider>
            <SidebarProvider>
              <DrawerProvider>
                <AppContextProvider>
                  <>
                    <Navigator />

                    {/* {isDev() && (
                      <ContextLogger
                        contexts={appContext}
                        config={contextConfig}
                      />
                    )} */}
                  </>
                </AppContextProvider>
              </DrawerProvider>
            </SidebarProvider>
          </AuthProvider>
        </LoaderProvider>
      </LanguageProvider>
      <ToastContainer theme="light" position="top-right" limit={5} />
    </BrowserRouter>
  </>
)

export default RootComponent
