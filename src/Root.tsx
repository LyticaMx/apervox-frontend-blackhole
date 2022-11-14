import { ReactElement } from 'react'
import { ToastContainer } from 'react-toastify'
import { LoaderProvider } from 'context/Loader/LoaderProvider'
import { isDev } from 'utils/env'
import { appContext, ContextLogger } from 'context/ContextLogger'
import Navigator from 'router/Navigator'
import { LanguageProvider } from 'context/Language'

const contextConfig = { objectDiffs: true, arrayDiffs: false }

const Root = (): ReactElement => {
  return (
    <>
      <LanguageProvider>
        <LoaderProvider>
          <Navigator />
          {isDev() && (
            <ContextLogger config={contextConfig} contexts={appContext} />
          )}
        </LoaderProvider>
      </LanguageProvider>
      <ToastContainer />
    </>
  )
}

export default Root
