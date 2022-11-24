import { ReactElement } from 'react'
import { ToastContainer } from 'react-toastify'
import { LoaderProvider } from 'context/Loader/LoaderProvider'
import { isDev } from 'utils/env'
import { appContext, ContextLogger } from 'context/ContextLogger'
import Navigator from 'router/Navigator'
import { LanguageProvider } from 'context/Language'
import { AuthProvider } from 'context/Auth'

// Estilos de react-toastify
import 'react-toastify/dist/ReactToastify.css'

const contextConfig = { objectDiffs: true, arrayDiffs: false }

const Root = (): ReactElement => {
  return (
    <>
      <LanguageProvider>
        <LoaderProvider>
          <AuthProvider>
            <Navigator />
            {isDev() && (
              <ContextLogger config={contextConfig} contexts={appContext} />
            )}
          </AuthProvider>
        </LoaderProvider>
      </LanguageProvider>
      <ToastContainer />
    </>
  )
}

export default Root
