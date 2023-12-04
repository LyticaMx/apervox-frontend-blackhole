import { useState, useMemo, ReactNode, ReactElement, useCallback } from 'react'

import { LoaderContext } from './LoaderContext'

interface Props {
  children: ReactNode
}

const LoaderProvider = ({ children }: Props): ReactElement => {
  const [pendingActions, setPendingActions] = useState<number>(0)
  const [forceShow, setForceShow] = useState<boolean>(false)

  const forceShowLoader = (): void => {
    setForceShow(true)
  }
  const forceHideLoader = (): void => {
    setPendingActions(0)
    setForceShow(false)
  }

  const addPendingActions = useCallback(
    (n: number = 1): void => setPendingActions((pending) => pending + n),
    [pendingActions]
  )
  const removePendingActions = useCallback(
    (n: number = 1): void =>
      setPendingActions((pending) =>
        pending > 0 ? (pending - n > 0 ? pending - n : 0) : 0
      ),
    [pendingActions]
  )

  const show = useMemo<boolean>(
    () => pendingActions > 0 || forceShow,
    [pendingActions, forceShow]
  )

  const contextValue = useMemo(
    () => ({
      show,
      actions: {
        addPendingActions,
        removePendingActions,
        forceShowLoader,
        forceHideLoader
      }
    }),
    [addPendingActions, removePendingActions]
  )

  return (
    <LoaderContext.Provider value={contextValue}>
      {children}
    </LoaderContext.Provider>
  )
}

export { LoaderProvider }
