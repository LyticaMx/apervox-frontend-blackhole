import { useState, useMemo, ReactNode, ReactElement } from 'react'

import { LoaderContext } from './LoaderContext'

interface Props {
  children: ReactNode
}

const LoaderProvider = ({ children }: Props): ReactElement => {
  const [show, setShow] = useState<boolean>(false)

  const showLoader = (): void => {
    setShow(true)
  }
  const hideLoader = (): void => {
    setShow(false)
  }

  const contextValue = useMemo(
    () => ({
      show,
      actions: {
        showLoader,
        hideLoader
      }
    }),
    [show]
  )

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  )
}

export { LoaderProvider }
